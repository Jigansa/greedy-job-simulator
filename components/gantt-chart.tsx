"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
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

interface GanttChartProps {
  results: AlgorithmResult[]
}

export function GanttChart({ results }: GanttChartProps) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0)

  const algorithmNames = results.map((r) => r.name.split(" ")[0])

  // Transform job schedule data for Gantt chart
  const transformScheduleData = (schedule: AlgorithmResult["jobSchedule"]) => {
    return schedule
      .map((job) => ({
        jobId: job.jobId,
        start: job.startTime,
        duration: job.endTime - job.startTime,
        end: job.endTime,
      }))
      .sort((a, b) => a.start - b.start)
  }

  const ganttData = transformScheduleData(results[selectedAlgorithm]?.jobSchedule || [])

  // Generate colors for jobs
  // const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#d0ed57", "#ffc658"]

  // Custom tooltip for Gantt chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md p-2 shadow-sm">
          <p className="font-medium">{`${data.jobId}`}</p>
          <p className="text-sm">{`Start: ${data.start}`}</p>
          <p className="text-sm">{`End: ${data.end}`}</p>
          <p className="text-sm">{`Duration: ${data.duration}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-green-500/10 to-teal-500/10 dark:from-green-900/20 dark:to-teal-900/20 p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl text-green-700 dark:text-green-300">
          Gantt Chart Visualization
        </CardTitle>
        <CardDescription className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
          Visual representation of job execution over time
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6 px-2 md:px-6">
        <Tabs
          defaultValue={algorithmNames[0]}
          onValueChange={(value) => setSelectedAlgorithm(algorithmNames.indexOf(value))}
        >
          <TabsList className="grid w-full grid-cols-3 bg-green-50 dark:bg-green-900/20 p-1 mb-4 md:mb-6 text-xs md:text-sm">
            {algorithmNames.map((name) => (
              <TabsTrigger
                key={name}
                value={name}
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-400"
              >
                {name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={algorithmNames[selectedAlgorithm]}>
            <div className="h-[300px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ganttData}
                  layout="vertical"
                  barCategoryGap={4}
                  margin={{ top: 20, right: 20, left: 70, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    type="number"
                    label={{ value: "Time", position: "insideBottomRight", offset: -5, fill: "#666" }}
                    tick={{ fill: "#666" }}
                  />
                  <YAxis type="category" dataKey="jobId" width={80} tick={{ fill: "#666" }} />
                  <Tooltip
                    content={<CustomTooltip />}
                    wrapperStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      padding: "8px",
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "10px" }} />
                  <Bar dataKey="duration" name="Job Duration" stackId="a" fill="#10b981" radius={[4, 4, 4, 4]}>
                    {ganttData.map((entry, index) => {
                      // Generate vibrant colors for the Gantt chart
                      const COLORS = [
                        "#6366f1",
                        "#8b5cf6",
                        "#ec4899",
                        "#10b981",
                        "#06b6d4",
                        "#f59e0b",
                        "#ef4444",
                        "#3b82f6",
                        "#14b8a6",
                        "#f43f5e",
                      ]
                      return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 text-xs md:text-sm">
              <p className="text-gray-600 dark:text-gray-300">
                This Gantt chart shows the execution schedule for the {results[selectedAlgorithm]?.name} algorithm. Each
                bar represents a job, with the width indicating its execution time.
              </p>
              <p className="mt-2 font-medium text-green-700 dark:text-green-400">
                Total execution time: {results[selectedAlgorithm]?.totalExecutionTime.toFixed(2)} units
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
