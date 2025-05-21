"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
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

interface AlgorithmPerformanceProps {
  results: AlgorithmResult[]
}

export function AlgorithmPerformance({ results }: AlgorithmPerformanceProps) {
  // Normalize metrics for radar chart (0-100 scale)
  const normalizeMetric = (value: number, metric: string, isHigherBetter = false) => {
    // Get min and max values for this metric across all algorithms
    const values = results.map((r) => {
      switch (metric) {
        case "totalExecutionTime":
          return r.totalExecutionTime
        case "averageTurnaroundTime":
          return r.averageTurnaroundTime
        case "cpuUtilization":
          return r.cpuUtilization
        case "fairnessIndex":
          return r.fairnessIndex
        case "overallScore":
          return r.overallScore
        default:
          return 0
      }
    })

    const min = Math.min(...values)
    const max = Math.max(...values)

    // For metrics where lower is better (like execution time), invert the normalization
    if (!isHigherBetter) {
      return max === min ? 100 : 100 - ((value - min) / (max - min)) * 100
    }

    // For metrics where higher is better (like CPU utilization)
    return max === min ? 100 : ((value - min) / (max - min)) * 100
  }

  // Transform data for radar chart
  const radarData = [
    {
      metric: "Execution Time",
      SJF: normalizeMetric(results[0]?.totalExecutionTime || 0, "totalExecutionTime"),
      EDF: normalizeMetric(results[1]?.totalExecutionTime || 0, "totalExecutionTime"),
      Weighted: normalizeMetric(results[2]?.totalExecutionTime || 0, "totalExecutionTime"),
    },
    {
      metric: "Turnaround Time",
      SJF: normalizeMetric(results[0]?.averageTurnaroundTime || 0, "averageTurnaroundTime"),
      EDF: normalizeMetric(results[1]?.averageTurnaroundTime || 0, "averageTurnaroundTime"),
      Weighted: normalizeMetric(results[2]?.averageTurnaroundTime || 0, "averageTurnaroundTime"),
    },
    {
      metric: "CPU Utilization",
      SJF: normalizeMetric(results[0]?.cpuUtilization || 0, "cpuUtilization", true),
      EDF: normalizeMetric(results[1]?.cpuUtilization || 0, "cpuUtilization", true),
      Weighted: normalizeMetric(results[2]?.cpuUtilization || 0, "cpuUtilization", true),
    },
    {
      metric: "Fairness Index",
      SJF: normalizeMetric(results[0]?.fairnessIndex || 0, "fairnessIndex", true),
      EDF: normalizeMetric(results[1]?.fairnessIndex || 0, "fairnessIndex", true),
      Weighted: normalizeMetric(results[2]?.fairnessIndex || 0, "fairnessIndex", true),
    },
    {
      metric: "Overall Score",
      SJF: normalizeMetric(results[0]?.overallScore || 0, "overallScore", true),
      EDF: normalizeMetric(results[1]?.overallScore || 0, "overallScore", true),
      Weighted: normalizeMetric(results[2]?.overallScore || 0, "overallScore", true),
    },
  ]

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:from-indigo-900/20 dark:to-blue-900/20 p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl text-indigo-700 dark:text-indigo-300">
          Algorithm Performance Radar
        </CardTitle>
        <CardDescription className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
          Comparing normalized performance across all metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6 px-2 md:px-6">
        <div className="h-[350px] md:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={window.innerWidth < 768 ? 100 : 150} data={radarData}>
              <PolarGrid stroke="#e0e0e0" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: "#666", fontSize: window.innerWidth < 768 ? 10 : 12 }} />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: "#666", fontSize: window.innerWidth < 768 ? 10 : 12 }}
              />
              <Radar
                name="Shortest Job First"
                dataKey="SJF"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Radar
                name="Earliest Deadline First"
                dataKey="EDF"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Radar
                name="Weighted Job Scheduling"
                dataKey="Weighted"
                stroke="#ec4899"
                fill="#ec4899"
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Legend wrapperStyle={{ paddingTop: "20px", fontSize: window.innerWidth < 768 ? 10 : 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
            This radar chart shows the normalized performance of each algorithm across all metrics. Higher values
            (further from center) indicate better performance.
          </p>
          <ul className="list-disc list-inside mt-2 grid grid-cols-1 gap-1 text-xs md:text-sm">
            <li className="text-blue-600 dark:text-blue-400">
              <span className="text-gray-600 dark:text-gray-300">Execution Time:</span> Lower is better (normalized to
              higher score)
            </li>
            <li className="text-purple-600 dark:text-purple-400">
              <span className="text-gray-600 dark:text-gray-300">Turnaround Time:</span> Lower is better (normalized to
              higher score)
            </li>
            <li className="text-green-600 dark:text-green-400">
              <span className="text-gray-600 dark:text-gray-300">CPU Utilization:</span> Higher is better
            </li>
            <li className="text-amber-600 dark:text-amber-400">
              <span className="text-gray-600 dark:text-gray-300">Fairness Index:</span> Higher is better
            </li>
            <li className="text-pink-600 dark:text-pink-400">
              <span className="text-gray-600 dark:text-gray-300">Overall Score:</span> Higher is better
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
