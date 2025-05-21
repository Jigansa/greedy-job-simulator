import { NextResponse } from "next/server"

type Job = {
  id: string
  arrivalTime: number
  executionTime: number
  deadline: number
  weight: number
}

type JobSchedule = {
  jobId: string
  startTime: number
  endTime: number
}

type AlgorithmResult = {
  name: string
  totalExecutionTime: number
  averageTurnaroundTime: number
  cpuUtilization: number
  fairnessIndex: number
  overallScore: number
  jobSchedule: JobSchedule[]
}

export async function POST(request: Request) {
  try {
    const { jobs } = await request.json()

    if (!jobs || !Array.isArray(jobs) || jobs.length === 0) {
      return NextResponse.json({ error: "Invalid or empty jobs array" }, { status: 400 })
    }

    // Process jobs with all three algorithms
    const sjfResult = shortestJobFirst(jobs)
    const edfResult = earliestDeadlineFirst(jobs)
    const weightedResult = weightedJobScheduling(jobs)

    return NextResponse.json({
      results: [sjfResult, edfResult, weightedResult],
    })
  } catch (error) {
    console.error("Error processing jobs:", error)
    return NextResponse.json({ error: "Failed to process jobs" }, { status: 500 })
  }
}

function shortestJobFirst(jobs: Job[]): AlgorithmResult {
  // Sort jobs by execution time (shortest first)
  const sortedJobs = [...jobs].sort((a, b) => a.executionTime - b.executionTime)

  let currentTime = 0
  let totalTurnaroundTime = 0
  const jobSchedule: JobSchedule[] = []

  for (const job of sortedJobs) {
    // Job can't start before its arrival time
    const startTime = Math.max(currentTime, job.arrivalTime)
    const endTime = startTime + job.executionTime

    jobSchedule.push({
      jobId: job.id,
      startTime,
      endTime,
    })

    // Calculate turnaround time (completion time - arrival time)
    const turnaroundTime = endTime - job.arrivalTime
    totalTurnaroundTime += turnaroundTime

    // Update current time
    currentTime = endTime
  }

  // Calculate metrics
  const totalExecutionTime = currentTime
  const averageTurnaroundTime = totalTurnaroundTime / jobs.length

  // Calculate CPU utilization (total job execution time / total time)
  const totalJobTime = jobs.reduce((sum, job) => sum + job.executionTime, 0)
  const cpuUtilization = totalJobTime / totalExecutionTime

  // Calculate fairness index
  const fairnessIndex = calculateFairnessIndex(jobs, jobSchedule)

  // Calculate overall score
  const overallScore = calculateOverallScore(totalExecutionTime, averageTurnaroundTime, cpuUtilization, fairnessIndex)

  return {
    name: "Shortest Job First (SJF)",
    totalExecutionTime,
    averageTurnaroundTime,
    cpuUtilization,
    fairnessIndex,
    overallScore,
    jobSchedule,
  }
}

function earliestDeadlineFirst(jobs: Job[]): AlgorithmResult {
  // Sort jobs by deadline (earliest first)
  const sortedJobs = [...jobs].sort((a, b) => a.deadline - b.deadline)

  let currentTime = 0
  let totalTurnaroundTime = 0
  const jobSchedule: JobSchedule[] = []

  for (const job of sortedJobs) {
    // Job can't start before its arrival time
    const startTime = Math.max(currentTime, job.arrivalTime)
    const endTime = startTime + job.executionTime

    jobSchedule.push({
      jobId: job.id,
      startTime,
      endTime,
    })

    // Calculate turnaround time (completion time - arrival time)
    const turnaroundTime = endTime - job.arrivalTime
    totalTurnaroundTime += turnaroundTime

    // Update current time
    currentTime = endTime
  }

  // Calculate metrics
  const totalExecutionTime = currentTime
  const averageTurnaroundTime = totalTurnaroundTime / jobs.length

  // Calculate CPU utilization (total job execution time / total time)
  const totalJobTime = jobs.reduce((sum, job) => sum + job.executionTime, 0)
  const cpuUtilization = totalJobTime / totalExecutionTime

  // Calculate fairness index
  const fairnessIndex = calculateFairnessIndex(jobs, jobSchedule)

  // Calculate overall score
  const overallScore = calculateOverallScore(totalExecutionTime, averageTurnaroundTime, cpuUtilization, fairnessIndex)

  return {
    name: "Earliest Deadline First (EDF)",
    totalExecutionTime,
    averageTurnaroundTime,
    cpuUtilization,
    fairnessIndex,
    overallScore,
    jobSchedule,
  }
}

function weightedJobScheduling(jobs: Job[]): AlgorithmResult {
  // Sort jobs by weight (highest first)
  const sortedJobs = [...jobs].sort((a, b) => b.weight - a.weight)

  let currentTime = 0
  let totalTurnaroundTime = 0
  const jobSchedule: JobSchedule[] = []

  for (const job of sortedJobs) {
    // Job can't start before its arrival time
    const startTime = Math.max(currentTime, job.arrivalTime)
    const endTime = startTime + job.executionTime

    jobSchedule.push({
      jobId: job.id,
      startTime,
      endTime,
    })

    // Calculate turnaround time (completion time - arrival time)
    const turnaroundTime = endTime - job.arrivalTime
    totalTurnaroundTime += turnaroundTime

    // Update current time
    currentTime = endTime
  }

  // Calculate metrics
  const totalExecutionTime = currentTime
  const averageTurnaroundTime = totalTurnaroundTime / jobs.length

  // Calculate CPU utilization (total job execution time / total time)
  const totalJobTime = jobs.reduce((sum, job) => sum + job.executionTime, 0)
  const cpuUtilization = totalJobTime / totalExecutionTime

  // Calculate fairness index
  const fairnessIndex = calculateFairnessIndex(jobs, jobSchedule)

  // Calculate overall score
  const overallScore = calculateOverallScore(totalExecutionTime, averageTurnaroundTime, cpuUtilization, fairnessIndex)

  return {
    name: "Weighted Job Scheduling",
    totalExecutionTime,
    averageTurnaroundTime,
    cpuUtilization,
    fairnessIndex,
    overallScore,
    jobSchedule,
  }
}

function calculateFairnessIndex(jobs: Job[], schedule: JobSchedule[]): number {
  if (jobs.length === 0) return 0

  // Map job IDs to their execution times
  const jobExecTimes = new Map<string, number>()
  for (const job of jobs) {
    jobExecTimes.set(job.id, job.executionTime)
  }

  // Calculate the ratio of allocated time to requested time for each job
  const ratios: number[] = []
  for (const jobSchedule of schedule) {
    const jobId = jobSchedule.jobId
    const allocatedTime = jobSchedule.endTime - jobSchedule.startTime
    const requestedTime = jobExecTimes.get(jobId) || 0

    if (requestedTime > 0) {
      ratios.push(allocatedTime / requestedTime)
    }
  }

  if (ratios.length === 0) return 0

  // Jain's fairness index: (sum(x))^2 / (n * sum(x^2))
  const sumRatios = ratios.reduce((sum, ratio) => sum + ratio, 0)
  const sumSquaredRatios = ratios.reduce((sum, ratio) => sum + ratio * ratio, 0)
  const n = ratios.length

  if (sumSquaredRatios === 0) return 0

  const fairness = (sumRatios * sumRatios) / (n * sumSquaredRatios)
  return fairness
}

function calculateOverallScore(
  totalExecutionTime: number,
  avgTurnaroundTime: number,
  cpuUtilization: number,
  fairnessIndex: number,
): number {
  // Normalize metrics to a 0-100 scale
  // For execution time and turnaround time, lower is better
  const execTimeScore = 100 / (1 + totalExecutionTime / 10)
  const turnaroundScore = 100 / (1 + avgTurnaroundTime / 5)

  // For CPU utilization and fairness, higher is better
  const cpuScore = cpuUtilization * 100
  const fairnessScore = fairnessIndex * 100

  // Weighted combination
  const weights = {
    execTime: 0.25,
    turnaround: 0.25,
    cpu: 0.25,
    fairness: 0.25,
  }

  const overallScore =
    weights.execTime * execTimeScore +
    weights.turnaround * turnaroundScore +
    weights.cpu * cpuScore +
    weights.fairness * fairnessScore

  return overallScore
}
