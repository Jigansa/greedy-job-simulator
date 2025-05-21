"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Job = {
  id: string
  arrivalTime: number
  executionTime: number
  deadline: number
  weight: number
}

interface JobTableProps {
  jobs: Job[]
}

export function JobTable({ jobs }: JobTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-gray-700/50">
          <TableRow>
            <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">Job ID</TableHead>
            <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">Arrival Time</TableHead>
            <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">Execution Time</TableHead>
            <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">Deadline</TableHead>
            <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">Weight/Profit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, index) => (
            <TableRow
              key={job.id}
              className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700/30"}
            >
              <TableCell className="font-medium text-purple-600 dark:text-purple-400">{job.id}</TableCell>
              <TableCell>{job.arrivalTime}</TableCell>
              <TableCell className="text-blue-600 dark:text-blue-400">{job.executionTime}</TableCell>
              <TableCell className="text-red-600 dark:text-red-400">{job.deadline}</TableCell>
              <TableCell className="text-green-600 dark:text-green-400">{job.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
