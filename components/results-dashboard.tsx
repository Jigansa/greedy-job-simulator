"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { InfoIcon } from "lucide-react"
import { MetricsComparison } from "@/components/metrics-comparison"
import { GanttChart } from "@/components/gantt-chart"
import { AlgorithmPerformance } from "@/components/algorithm-performance"
import { FinalVerdict } from "@/components/final-verdict"

type Job = {
  id: string
  arrivalTime: number
  executionTime: number
  deadline: number
  weight: number
}

type AlgorithmResult = {
  name: string
  totalExecutionTime: number
  averageTurnaroundTime: number
  cpuUtilization: number
  fairnessIndex: number
  overallScore: number
  jobSchedule: {
    jobId: string
    startTime: number
    endTime: number
  }[]
}

export function ResultsDashboard() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [results, setResults] = useState<AlgorithmResult[]>([])
  const [hasData, setHasData] = useState(false)

  useEffect(() => {
    // In a real implementation, this would fetch results from your API
    // For now, we'll use mock data stored in localStorage
    const storedJobs = localStorage.getItem("jobsData")

    if (storedJobs) {
      try {
        const parsedJobs = JSON.parse(storedJobs) as Job[]
        setJobs(parsedJobs)

        // Generate mock results for demonstration
        const mockResults = generateMockResults(parsedJobs)
        setResults(mockResults)
        setHasData(true)
      } catch (error) {
        console.error("Error parsing stored jobs:", error)
        setHasData(false)
      }
    } else {
      setHasData(false)
    }
  }, [])

  // This function simulates the results we would get from the Python backend
  const generateMockResults = (jobs: Job[]): AlgorithmResult[] => {
    // Helper to calculate a random value within a range
    const randomValue = (min: number, max: number) => Math.random() * (max - min) + min

    // Sort jobs for SJF (by execution time)
    const sjfJobs = [...jobs].sort((a, b) => a.executionTime - b.executionTime)

    // Sort jobs for EDF (by deadline)
    const edfJobs = [...jobs].sort((a, b) => a.deadline - b.deadline)

    // Sort jobs for Weighted (by weight/profit, simplified)
    const weightedJobs = [...jobs].sort((a, b) => b.weight - a.weight)

    // Create mock schedules
    const createSchedule = (sortedJobs: Job[]) => {
      const schedule = []
      let currentTime = 0

      for (const job of sortedJobs) {
        const startTime = Math.max(currentTime, job.arrivalTime)
        const endTime = startTime + job.executionTime

        schedule.push({
          jobId: job.id,
          startTime,
          endTime,
        })

        currentTime = endTime
      }

      return schedule
    }

    // Create mock results with slightly different metrics to show comparison
    return [
      {
        name: "Shortest Job First (SJF)",
        totalExecutionTime: randomValue(15, 25),
        averageTurnaroundTime: randomValue(5, 10),
        cpuUtilization: randomValue(0.7, 0.9),
        fairnessIndex: randomValue(0.6, 0.8),
        overallScore: randomValue(70, 85),
        jobSchedule: createSchedule(sjfJobs),
      },
      {
        name: "Earliest Deadline First (EDF)",
        totalExecutionTime: randomValue(18, 28),
        averageTurnaroundTime: randomValue(6, 12),
        cpuUtilization: randomValue(0.65, 0.85),
        fairnessIndex: randomValue(0.7, 0.9),
        overallScore: randomValue(65, 80),
        jobSchedule: createSchedule(edfJobs),
      },
      {
        name: "Weighted Job Scheduling",
        totalExecutionTime: randomValue(20, 30),
        averageTurnaroundTime: randomValue(7, 14),
        cpuUtilization: randomValue(0.6, 0.8),
        fairnessIndex: randomValue(0.5, 0.7),
        overallScore: randomValue(60, 75),
        jobSchedule: createSchedule(weightedJobs),
      },
    ]
  }

  if (!hasData) {
    return (
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>No simulation data available</AlertTitle>
        <AlertDescription>Please upload job data and run a simulation first to see results.</AlertDescription>
      </Alert>
    )
  }

  // Find the best algorithm based on overall score
  const bestAlgorithm = results.reduce((prev, current) => (prev.overallScore > current.overallScore ? prev : current))

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Simulation Results</CardTitle>
            <Badge variant="outline" className="ml-2">
              {jobs.length} Jobs Processed
            </Badge>
          </div>
          <CardDescription>Comparative analysis of three greedy scheduling algorithms</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="metrics">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="metrics">Metrics Comparison</TabsTrigger>
              <TabsTrigger value="gantt">Gantt Charts</TabsTrigger>
              <TabsTrigger value="performance">Performance Radar</TabsTrigger>
              <TabsTrigger value="verdict">Final Verdict</TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="mt-4">
              <MetricsComparison results={results} />
            </TabsContent>

            <TabsContent value="gantt" className="mt-4">
              <GanttChart results={results} />
            </TabsContent>

            <TabsContent value="performance" className="mt-4">
              <AlgorithmPerformance results={results} />
            </TabsContent>

            <TabsContent value="verdict" className="mt-4">
              <FinalVerdict bestAlgorithm={bestAlgorithm} results={results} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
