"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Table, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { JobTable } from "@/components/job-table"
import { useToast } from "@/hooks/use-toast"

type Job = {
  id: string
  arrivalTime: number
  executionTime: number
  deadline: number
  weight: number
}

export function UploadJobsForm() {
  const [uploadMethod, setUploadMethod] = useState<"csv" | "json" | "manual">("csv")
  const [jsonInput, setJsonInput] = useState("")
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCsvFile(file)

      // Parse CSV file
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string
          const lines = text.split("\n")
          const headers = lines[0].split(",")

          const parsedJobs: Job[] = []

          for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue

            const values = lines[i].split(",")
            const job: Job = {
              id: values[0] || `Job-${i}`,
              arrivalTime: Number.parseFloat(values[1]) || 0,
              executionTime: Number.parseFloat(values[2]) || 1,
              deadline: Number.parseFloat(values[3]) || 10,
              weight: Number.parseFloat(values[4]) || 1,
            }
            parsedJobs.push(job)
          }

          setJobs(parsedJobs)
          toast({
            title: "CSV Parsed Successfully",
            description: `Loaded ${parsedJobs.length} jobs from CSV file.`,
          })
        } catch (error) {
          toast({
            title: "Error Parsing CSV",
            description: "Please check your CSV format and try again.",
            variant: "destructive",
          })
        }
      }
      reader.readAsText(file)
    }
  }

  const handleJsonInput = () => {
    try {
      const parsedJobs = JSON.parse(jsonInput)
      if (Array.isArray(parsedJobs)) {
        setJobs(parsedJobs)
        toast({
          title: "JSON Parsed Successfully",
          description: `Loaded ${parsedJobs.length} jobs from JSON input.`,
        })
      } else {
        toast({
          title: "Invalid JSON Format",
          description: "JSON must be an array of job objects.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error Parsing JSON",
        description: "Please check your JSON format and try again.",
        variant: "destructive",
      })
    }
  }

  const handleGenerateRandomJobs = () => {
    const randomJobs: Job[] = []
    const count = Math.floor(Math.random() * 10) + 5 // 5-15 random jobs

    for (let i = 0; i < count; i++) {
      const arrivalTime = Math.floor(Math.random() * 10)
      const executionTime = Math.floor(Math.random() * 10) + 1 // 1-10
      const deadline = arrivalTime + executionTime + Math.floor(Math.random() * 20) // reasonable deadline

      randomJobs.push({
        id: `Job-${i + 1}`,
        arrivalTime,
        executionTime,
        deadline,
        weight: Math.floor(Math.random() * 10) + 1, // 1-10
      })
    }

    setJobs(randomJobs)
    toast({
      title: "Random Jobs Generated",
      description: `Created ${count} random jobs for simulation.`,
    })
  }

  const handleRunSimulation = async () => {
    if (jobs.length === 0) {
      toast({
        title: "No Jobs to Process",
        description: "Please upload or generate jobs first.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real implementation, this would call your Python API
      // For now, we'll simulate the API call with a timeout

      // Store jobs in localStorage for the results page to use
      localStorage.setItem("jobsData", JSON.stringify(jobs))

      // Simulate API processing time
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Simulation Complete",
        description: "Job scheduling analysis has been completed successfully.",
      })

      // Navigate to results tab
      router.push("/?tab=results")

      // In a real implementation, you would store the results from the API
      // and then navigate to the results page
    } catch (error) {
      toast({
        title: "Simulation Failed",
        description: "There was an error processing the jobs. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <Card className="border-none shadow-md bg-white dark:bg-gray-800">
        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-t-lg p-4 md:p-6">
          <CardTitle className="text-xl md:text-2xl text-blue-700 dark:text-blue-300">Upload Jobs</CardTitle>
          <CardDescription className="text-sm md:text-base text-gray-600 dark:text-gray-300">
            Upload your job data using one of the methods below. Each job should include ID, arrival time, execution
            time, deadline, and weight.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={uploadMethod} onValueChange={(v) => setUploadMethod(v as any)}>
            <TabsList className="grid w-full grid-cols-3 bg-blue-50 dark:bg-gray-700 p-1 text-xs md:text-sm">
              <TabsTrigger value="csv" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                CSV Upload
              </TabsTrigger>
              <TabsTrigger value="json" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                JSON Input
              </TabsTrigger>
              <TabsTrigger value="manual" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                Generate Random
              </TabsTrigger>
            </TabsList>

            <TabsContent value="csv" className="mt-6">
              <div className="grid gap-4">
                <Label htmlFor="csv-upload" className="text-blue-700 dark:text-blue-300">
                  Upload CSV File
                </Label>
                <div className="border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-lg p-4 md:p-6 text-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <Input id="csv-upload" type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" />
                  <label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-8 w-8 md:h-10 md:w-10 text-blue-500 mb-2" />
                    <span className="text-xs md:text-sm font-medium text-blue-600 dark:text-blue-400">
                      Click to upload CSV
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">or drag and drop</span>
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  CSV should have headers: id,arrivalTime,executionTime,deadline,weight
                </p>
              </div>
            </TabsContent>

            <TabsContent value="json" className="mt-6">
              <div className="grid gap-4">
                <Label htmlFor="json-input" className="text-blue-700 dark:text-blue-300">
                  JSON Input
                </Label>
                <Textarea
                  id="json-input"
                  placeholder='[{"id":"Job-1","arrivalTime":0,"executionTime":5,"deadline":10,"weight":3},...]'
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  rows={6}
                  className="font-mono text-sm border-blue-200 dark:border-blue-900 focus-visible:ring-blue-500"
                />
                <Button
                  onClick={handleJsonInput}
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 hover:border-blue-300 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                >
                  <Table className="mr-2 h-4 w-4" />
                  Parse JSON
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="mt-6">
              <div className="grid gap-4">
                <p className="text-sm text-muted-foreground">
                  Generate a set of random jobs for testing the scheduling algorithms.
                </p>
                <Button
                  onClick={handleGenerateRandomJobs}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white w-full py-6"
                >
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Generate Random Jobs
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between bg-gray-50 dark:bg-gray-800/50 p-4 md:p-6 border-t border-gray-100 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={() => setJobs([])}
            className="w-full sm:w-auto border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            Clear Jobs
          </Button>
          <Button
            onClick={handleRunSimulation}
            disabled={isLoading}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Run Simulation
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {jobs.length > 0 && (
        <Card className="mt-6 border-none shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-500/10 to-teal-500/10 dark:from-green-900/20 dark:to-teal-900/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-green-700 dark:text-green-300">Job Preview</CardTitle>
              <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                {jobs.length} jobs loaded
              </div>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              These jobs will be processed by all three scheduling algorithms
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <JobTable jobs={jobs} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
