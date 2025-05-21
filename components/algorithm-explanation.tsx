"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckSquare, Weight, CheckCircle, AlertTriangle } from "lucide-react"

export function AlgorithmExplanation() {
  return (
    <div className="grid gap-6">
      <Card className="border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl text-blue-700 dark:text-blue-300">
            Greedy Scheduling Algorithms
          </CardTitle>
          <CardDescription className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
            Learn about the three classic greedy scheduling algorithms implemented in this simulator
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 md:pt-6 px-2 md:px-6">
          <Tabs defaultValue="sjf">
            <TabsList className="grid w-full grid-cols-3 bg-blue-50 dark:bg-blue-900/20 p-1 mb-4 md:mb-6 text-xs md:text-sm">
              <TabsTrigger
                value="sjf"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-400"
              >
                Shortest Job First
              </TabsTrigger>
              <TabsTrigger
                value="edf"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-400"
              >
                Earliest Deadline
              </TabsTrigger>
              <TabsTrigger
                value="weighted"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-400"
              >
                Weighted Job
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sjf">
              <div className="grid gap-4 md:gap-6">
                <div className="flex flex-col sm:flex-row items-start bg-blue-50 dark:bg-blue-900/20 p-3 md:p-4 rounded-lg">
                  <div className="bg-blue-100 dark:bg-blue-800 p-2 md:p-3 rounded-full mr-0 mb-2 sm:mb-0 sm:mr-4">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-blue-700 dark:text-blue-300">
                      Shortest Job First (SJF)
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1">
                      A greedy scheduling algorithm that prioritizes jobs with the shortest execution time.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:gap-6 mt-2">
                  <div className="bg-white dark:bg-gray-800 p-3 md:p-5 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                    <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-300 text-sm md:text-base">
                      How It Works
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                      SJF selects the job with the shortest execution time from the available jobs and executes it
                      first. This process continues until all jobs are executed. The algorithm aims to minimize the
                      average waiting time for a given set of jobs.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 md:p-5 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                    <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-300 text-sm md:text-base">
                      Pseudocode
                    </h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-md text-xs md:text-sm overflow-auto">
                      {`function SJF(jobs):
    sort jobs by execution_time in ascending order
    current_time = 0
    result = []
    
    for each job in jobs:
        start_time = max(current_time, job.arrival_time)
        end_time = start_time + job.execution_time
        
        result.append({
            "job_id": job.id,
            "start_time": start_time,
            "end_time": end_time
        })
        
        current_time = end_time
    
    return result`}
                    </pre>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 md:p-5 rounded-lg border border-green-100 dark:border-green-900/30 shadow-sm">
                      <h4 className="font-medium mb-2 text-green-700 dark:text-green-300 text-sm md:text-base">
                        Advantages
                      </h4>
                      <ul className="space-y-1 md:space-y-2">
                        {[
                          "Minimizes average waiting time when job lengths are known",
                          "Simple to implement and understand",
                          "Provides good throughput for batch systems",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-green-100 dark:bg-green-800 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                              <CheckCircle className="h-2 w-2 md:h-3 md:w-3 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 md:p-5 rounded-lg border border-amber-100 dark:border-amber-900/30 shadow-sm">
                      <h4 className="font-medium mb-2 text-amber-700 dark:text-amber-300 text-sm md:text-base">
                        Limitations
                      </h4>
                      <ul className="space-y-1 md:space-y-2">
                        {[
                          "Can lead to starvation of longer jobs if shorter jobs keep arriving",
                          "Requires accurate knowledge of job execution times",
                          "Not optimal for interactive or real-time systems",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-amber-100 dark:bg-amber-800 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                              <AlertTriangle className="h-2 w-2 md:h-3 md:w-3 text-amber-600 dark:text-amber-400" />
                            </div>
                            <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 md:p-5 rounded-lg border border-blue-100 dark:border-blue-900/30 shadow-sm">
                    <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-300 text-sm md:text-base">
                      Real-world Applications
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                      SJF is commonly used in batch processing systems, print queue management, and CPU scheduling in
                      non-interactive systems where job execution times are known or can be estimated accurately.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="edf" className="mt-6">
              <div className="grid gap-4">
                <div className="flex items-start">
                  <CheckSquare className="h-6 w-6 mr-3 mt-1 text-green-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Earliest Deadline First (EDF)</h3>
                    <p className="text-muted-foreground">
                      A dynamic priority scheduling algorithm that prioritizes jobs with the earliest deadlines.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 mt-2">
                  <div>
                    <h4 className="font-medium mb-2">How It Works</h4>
                    <p className="text-sm">
                      EDF assigns priorities to jobs based on their deadlines. The job with the earliest deadline gets
                      the highest priority and is executed first. As time progresses, priorities are recalculated based
                      on the remaining jobs and their deadlines.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Pseudocode</h4>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-auto">
                      {`function EDF(jobs):
    sort jobs by deadline in ascending order
    current_time = 0
    result = []
    
    for each job in jobs:
        start_time = max(current_time, job.arrival_time)
        end_time = start_time + job.execution_time
        
        result.append({
            "job_id": job.id,
            "start_time": start_time,
            "end_time": end_time
        })
        
        current_time = end_time
    
    return result`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Advantages</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Optimal for meeting deadlines when all jobs can be scheduled</li>
                      <li>Well-suited for real-time systems</li>
                      <li>Dynamically adjusts priorities based on urgency</li>
                      <li>Maximizes the number of jobs that meet their deadlines</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Limitations</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Can lead to poor performance under heavy load</li>
                      <li>May cause domino effect of missed deadlines during overload</li>
                      <li>Requires accurate knowledge of deadlines</li>
                      <li>Does not consider job execution times in priority calculation</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Real-world Applications</h4>
                    <p className="text-sm">
                      EDF is widely used in real-time operating systems, multimedia applications, industrial control
                      systems, and network packet scheduling where meeting deadlines is critical.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="weighted" className="mt-6">
              <div className="grid gap-4">
                <div className="flex items-start">
                  <Weight className="h-6 w-6 mr-3 mt-1 text-amber-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Weighted Job Scheduling</h3>
                    <p className="text-muted-foreground">
                      A greedy algorithm that schedules jobs to maximize the total weight or profit.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 mt-2">
                  <div>
                    <h4 className="font-medium mb-2">How It Works</h4>
                    <p className="text-sm">
                      Weighted Job Scheduling assigns a weight or profit to each job and aims to maximize the total
                      weight of the executed jobs. It considers non-overlapping job execution and selects jobs that
                      provide the maximum total weight.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Pseudocode</h4>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-auto">
                      {`function WeightedJobScheduling(jobs):
    sort jobs by weight/profit in descending order
    current_time = 0
    result = []
    
    for each job in jobs:
        start_time = max(current_time, job.arrival_time)
        end_time = start_time + job.execution_time
        
        result.append({
            "job_id": job.id,
            "start_time": start_time,
            "end_time": end_time
        })
        
        current_time = end_time
    
    return result
    
# Note: This is a simplified version. A more complex implementation
# would use dynamic programming to find the optimal solution.`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Advantages</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Maximizes total value or profit from job execution</li>
                      <li>Well-suited for systems where jobs have different priorities or values</li>
                      <li>Can handle jobs with different importance levels</li>
                      <li>Optimizes resource allocation based on job value</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Limitations</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>More complex to implement than other algorithms</li>
                      <li>May lead to starvation of low-weight jobs</li>
                      <li>Requires accurate weight/profit assignments</li>
                      <li>Optimal solution may require dynamic programming approach</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Real-world Applications</h4>
                    <p className="text-sm">
                      Weighted Job Scheduling is used in resource allocation in cloud computing, financial transaction
                      processing, ad serving systems, and project scheduling with different priorities.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md mt-6">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardTitle className="text-xl text-purple-700 dark:text-purple-300">Performance Metrics Explained</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Understanding the metrics used to evaluate scheduling algorithms
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="font-medium mb-1 text-blue-700 dark:text-blue-300">Total Execution Time</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                The total time taken to complete all jobs from start to finish. Lower values indicate faster overall
                completion.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="font-medium mb-1 text-purple-700 dark:text-purple-300">Average Turnaround Time</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                The average time taken for a job to complete from its arrival time. Calculated as (Completion Time -
                Arrival Time) averaged across all jobs. Lower values indicate better responsiveness.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="font-medium mb-1 text-green-700 dark:text-green-300">CPU Utilization</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                The percentage of time the CPU is actively processing jobs versus being idle. Higher values indicate
                better resource utilization.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="font-medium mb-1 text-amber-700 dark:text-amber-300">Fairness Index</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                A measure of how equitably CPU time is distributed among jobs. Higher values indicate more fair
                distribution of processing time relative to job needs.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="font-medium mb-1 text-pink-700 dark:text-pink-300">Overall Performance Score</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                A weighted composite score combining all metrics to provide a single value for algorithm comparison.
                Higher values indicate better overall performance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
