"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, Info } from "lucide-react"

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

interface FinalVerdictProps {
  bestAlgorithm: AlgorithmResult
  results: AlgorithmResult[]
}

export function FinalVerdict({ bestAlgorithm, results }: FinalVerdictProps) {
  // Generate verdict text based on the best algorithm
  const getVerdictText = () => {
    const algorithmName = bestAlgorithm.name.split(" ")[0]

    switch (algorithmName) {
      case "Shortest":
        return {
          title: "Shortest Job First (SJF) is Recommended",
          description:
            "SJF performed best for this job set, indicating that prioritizing shorter jobs leads to better overall efficiency.",
          strengths: [
            "Minimizes average waiting time when job lengths are known in advance",
            "Excellent for batch processing environments with predictable job durations",
            "Provides good CPU utilization by quickly processing short jobs",
          ],
          weaknesses: [
            "May lead to starvation of longer jobs if short jobs keep arriving",
            "Requires accurate estimation of job execution times",
            "Not ideal for interactive or real-time systems",
          ],
          realWorldUses: [
            "Batch processing systems",
            "Print queue management",
            "CPU scheduling in non-interactive systems",
          ],
        }
      case "Earliest":
        return {
          title: "Earliest Deadline First (EDF) is Recommended",
          description:
            "EDF performed best for this job set, indicating that prioritizing jobs with approaching deadlines leads to better overall efficiency.",
          strengths: [
            "Optimal for meeting deadlines when all jobs can be scheduled",
            "Good for real-time systems with strict timing requirements",
            "Balances urgency with system utilization",
          ],
          weaknesses: [
            "Can lead to poor performance under heavy load",
            "May cause domino effect of missed deadlines during overload",
            "Requires accurate knowledge of deadlines",
          ],
          realWorldUses: [
            "Real-time operating systems",
            "Multimedia applications",
            "Industrial control systems",
            "Network packet scheduling",
          ],
        }
      case "Weighted":
        return {
          title: "Weighted Job Scheduling is Recommended",
          description:
            "Weighted Job Scheduling performed best for this job set, indicating that prioritizing jobs with higher weights/profits leads to better overall efficiency.",
          strengths: [
            "Maximizes total value/profit from job execution",
            "Good for systems where jobs have different priorities or values",
            "Balances execution time with job importance",
          ],
          weaknesses: [
            "More complex to implement than other algorithms",
            "May lead to starvation of low-weight jobs",
            "Requires accurate weight/profit assignments",
          ],
          realWorldUses: [
            "Resource allocation in cloud computing",
            "Financial transaction processing",
            "Ad serving systems",
            "Project scheduling with different priorities",
          ],
        }
      default:
        return {
          title: "Analysis Inconclusive",
          description: "The analysis did not yield a clear winner among the algorithms.",
          strengths: [],
          weaknesses: [],
          realWorldUses: [],
        }
    }
  }

  const verdict = getVerdictText()

  return (
    <div className="grid gap-6">
      <Card className="border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-900/20 dark:to-orange-900/20 rounded-t-lg p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 md:p-3 rounded-full mr-0 mb-3 sm:mb-0 sm:mr-4">
              <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-xl md:text-2xl text-amber-700 dark:text-amber-300">{verdict.title}</CardTitle>
              <CardDescription className="text-sm md:text-base mt-1 md:mt-2 text-gray-600 dark:text-gray-300">
                {verdict.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
          <div className="grid gap-4 md:gap-6">
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center text-blue-700 dark:text-blue-300">
                <Info className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-500" />
                Key Metrics for {bestAlgorithm.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40 p-3 md:p-4 rounded-lg shadow-sm">
                  <div className="text-xs md:text-sm text-blue-600 dark:text-blue-300 font-medium">
                    Total Execution Time
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-blue-700 dark:text-blue-200 mt-1">
                    {bestAlgorithm.totalExecutionTime.toFixed(2)}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/40 p-3 md:p-4 rounded-lg shadow-sm">
                  <div className="text-xs md:text-sm text-purple-600 dark:text-purple-300 font-medium">
                    Avg. Turnaround Time
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-purple-700 dark:text-purple-200 mt-1">
                    {bestAlgorithm.averageTurnaroundTime.toFixed(2)}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/40 p-3 md:p-4 rounded-lg shadow-sm">
                  <div className="text-xs md:text-sm text-green-600 dark:text-green-300 font-medium">
                    CPU Utilization
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-green-700 dark:text-green-200 mt-1">
                    {(bestAlgorithm.cpuUtilization * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/40 p-3 md:p-4 rounded-lg shadow-sm">
                  <div className="text-xs md:text-sm text-amber-600 dark:text-amber-300 font-medium">
                    Fairness Index
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-amber-700 dark:text-amber-200 mt-1">
                    {(bestAlgorithm.fairnessIndex * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-900/40 p-3 md:p-4 rounded-lg shadow-sm col-span-1 sm:col-span-2 md:col-span-1">
                  <div className="text-xs md:text-sm text-pink-600 dark:text-pink-300 font-medium">Overall Score</div>
                  <div className="text-lg md:text-2xl font-bold text-pink-700 dark:text-pink-200 mt-1">
                    {bestAlgorithm.overallScore.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 md:p-5 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 flex items-center text-green-700 dark:text-green-300">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-500" />
                  Strengths
                </h3>
                <ul className="space-y-1 md:space-y-2">
                  {verdict.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                        <CheckCircle className="h-2 w-2 md:h-3 md:w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 md:p-5 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 flex items-center text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 mr-2 text-amber-500" />
                  Limitations
                </h3>
                <ul className="space-y-1 md:space-y-2">
                  {verdict.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                        <AlertTriangle className="h-2 w-2 md:h-3 md:w-3 text-amber-600 dark:text-amber-400" />
                      </div>
                      <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-blue-700 dark:text-blue-300">
                Real-World Applications
              </h3>
              <div className="flex flex-wrap gap-2">
                {verdict.realWorldUses.map((use, index) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none px-2 py-0.5 md:px-3 md:py-1 text-xs"
                  >
                    {use}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 md:p-6 rounded-lg mt-2 border border-blue-100 dark:border-blue-900/30 shadow-sm">
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
                Final Recommendation
              </h3>
              <div className="flex flex-col sm:flex-row items-center mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl md:text-2xl font-bold mb-3 sm:mb-0 sm:mr-4">
                  {bestAlgorithm.overallScore.toFixed(0)}
                </div>
                <div>
                  <p className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200 text-center sm:text-left">
                    <span className="text-blue-600 dark:text-blue-400">{bestAlgorithm.name}</span> is the most efficient
                    algorithm
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
                    With an overall performance score of <strong>{bestAlgorithm.overallScore.toFixed(1)}</strong>
                  </p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                This algorithm outperformed others particularly in
                {bestAlgorithm.cpuUtilization > 0.8 ? " CPU utilization" : ""}
                {bestAlgorithm.fairnessIndex > 0.8 ? " and fairness" : ""}. For job sets with similar characteristics,
                consider implementing this algorithm in your production environment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
