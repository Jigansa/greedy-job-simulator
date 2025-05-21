"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "@/components/ui/chart"

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

interface MetricsComparisonProps {
  results: AlgorithmResult[]
}

export function MetricsComparison({ results }: MetricsComparisonProps) {
  // Transform data for bar chart
  const barData = [
    {
      name: "Total Execution Time",
      SJF: results[0]?.totalExecutionTime || 0,
      EDF: results[1]?.totalExecutionTime || 0,
      Weighted: results[2]?.totalExecutionTime || 0,
    },
    {
      name: "Avg. Turnaround Time",
      SJF: results[0]?.averageTurnaroundTime || 0,
      EDF: results[1]?.averageTurnaroundTime || 0,
      Weighted: results[2]?.averageTurnaroundTime || 0,
    },
    {
      name: "CPU Utilization",
      SJF: results[0]?.cpuUtilization * 100 || 0,
      EDF: results[1]?.cpuUtilization * 100 || 0,
      Weighted: results[2]?.cpuUtilization * 100 || 0,
    },
    {
      name: "Fairness Index",
      SJF: results[0]?.fairnessIndex * 100 || 0,
      EDF: results[1]?.fairnessIndex * 100 || 0,
      Weighted: results[2]?.fairnessIndex * 100 || 0,
    },
    {
      name: "Overall Score",
      SJF: results[0]?.overallScore || 0,
      EDF: results[1]?.overallScore || 0,
      Weighted: results[2]?.overallScore || 0,
    },
  ]

  // Transform data for line chart (execution trends)
  const lineData = results
    .flatMap((result) =>
      result.jobSchedule.map((job) => ({
        algorithm: result.name,
        time: job.endTime,
        jobsCompleted: result.jobSchedule.filter((j) => j.endTime <= job.endTime).length,
      })),
    )
    .sort((a, b) => a.time - b.time)

  // Deduplicate line data points
  const uniqueLineData: { algorithm: string; time: number; jobsCompleted: number }[] = []
  const seen = new Set()

  lineData.forEach((item) => {
    const key = `${item.algorithm}-${item.time}-${item.jobsCompleted}`
    if (!seen.has(key)) {
      seen.add(key)
      uniqueLineData.push(item)
    }
  })

  return (
    <div className="grid gap-6">
      <Card className="border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl text-blue-700 dark:text-blue-300">
            Performance Metrics Comparison
          </CardTitle>
          <CardDescription className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
            Comparing key metrics across all three scheduling algorithms
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 md:pt-6 px-2 md:px-6">
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" tick={{ fill: "#666" }} />
                <YAxis tick={{ fill: "#666" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: "10px" }} />
                <Bar dataKey="SJF" fill="#6366f1" name="Shortest Job First" radius={[4, 4, 0, 0]} />
                <Bar dataKey="EDF" fill="#8b5cf6" name="Earliest Deadline First" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Weighted" fill="#ec4899" name="Weighted Job Scheduling" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md mt-6">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-900/20 dark:to-pink-900/20 p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl text-purple-700 dark:text-purple-300">
            Job Completion Trends
          </CardTitle>
          <CardDescription className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
            Showing how jobs are completed over time for each algorithm
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 md:pt-6 px-2 md:px-6">
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="time"
                  type="number"
                  label={{ value: "Time", position: "insideBottomRight", offset: -5, fill: "#666" }}
                  tick={{ fill: "#666" }}
                />
                <YAxis
                  label={{ value: "Jobs Completed", angle: -90, position: "insideLeft", fill: "#666" }}
                  tick={{ fill: "#666" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: "10px" }} />
                <Line
                  data={uniqueLineData.filter((d) => d.algorithm === "Shortest Job First (SJF)")}
                  type="monotone"
                  dataKey="jobsCompleted"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: "#6366f1", r: 6 }}
                  activeDot={{ r: 8, strokeWidth: 2 }}
                  name="SJF"
                  connectNulls
                />
                <Line
                  data={uniqueLineData.filter((d) => d.algorithm === "Earliest Deadline First (EDF)")}
                  type="monotone"
                  dataKey="jobsCompleted"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", r: 6 }}
                  activeDot={{ r: 8, strokeWidth: 2 }}
                  name="EDF"
                  connectNulls
                />
                <Line
                  data={uniqueLineData.filter((d) => d.algorithm === "Weighted Job Scheduling")}
                  type="monotone"
                  dataKey="jobsCompleted"
                  stroke="#ec4899"
                  strokeWidth={3}
                  dot={{ fill: "#ec4899", r: 6 }}
                  activeDot={{ r: 8, strokeWidth: 2 }}
                  name="Weighted"
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
