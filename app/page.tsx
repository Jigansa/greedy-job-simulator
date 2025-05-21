import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadJobsForm } from "@/components/upload-jobs-form"
import { ResultsDashboard } from "@/components/results-dashboard"
import { AlgorithmExplanation } from "@/components/algorithm-explanation"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Greedy Job Scheduling Simulator
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Upload your job data to analyze and compare three classic greedy scheduling algorithms: Earliest Deadline
            First (EDF), Shortest Job First (SJF), and Weighted Job Scheduling.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="w-full p-0 bg-gray-100 dark:bg-gray-700 rounded-none">
              <TabsTrigger
                value="upload"
                className="flex-1 py-4 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-none"
              >
                Upload Jobs
              </TabsTrigger>
              <TabsTrigger
                value="results"
                className="flex-1 py-4 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-none"
              >
                Results Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="algorithms"
                className="flex-1 py-4 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-none"
              >
                Algorithm Details
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="p-6">
              <UploadJobsForm />
            </TabsContent>
            <TabsContent value="results" className="p-6">
              <ResultsDashboard />
            </TabsContent>
            <TabsContent value="algorithms" className="p-6">
              <AlgorithmExplanation />
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Greedy Job Scheduling Simulator & Visual Analyzer © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
}
