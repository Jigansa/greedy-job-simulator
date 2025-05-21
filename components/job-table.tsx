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
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-700/50">
              <TableRow>
                <TableHead className="text-blue-700 dark:text-blue-300 font-semibold text-xs md:text-sm whitespace-nowrap">
                  Job ID
                </TableHead>
                <TableHead className="text-blue-700 dark:text-blue-300 font-semibold text-xs md:text-sm whitespace-nowrap">
                  Arrival Time
                </TableHead>
                <TableHead className="text-blue-700 dark:text-blue-300 font-semibold text-xs md:text-sm whitespace-nowrap">
                  Execution Time
                </TableHead>
                <TableHead className="text-blue-700 dark:text-blue-300 font-semibold text-xs md:text-sm whitespace-nowrap">
                  Deadline
                </TableHead>
                <TableHead className="text-blue-700 dark:text-blue-300 font-semibold text-xs md:text-sm whitespace-nowrap">
                  Weight/Profit
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job, index) => (
                <TableRow
                  key={job.id}
                  className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700/30"}
                >
                  <TableCell className="font-medium text-purple-600 dark:text-purple-400 text-xs md:text-sm whitespace-nowrap">
                    {job.id}
                  </TableCell>
                  <TableCell className="text-xs md:text-sm whitespace-nowrap">{job.arrivalTime}</TableCell>
                  <TableCell className="text-blue-600 dark:text-blue-400 text-xs md:text-sm whitespace-nowrap">
                    {job.executionTime}
                  </TableCell>
                  <TableCell className="text-red-600 dark:text-red-400 text-xs md:text-sm whitespace-nowrap">
                    {job.deadline}
                  </TableCell>
                  <TableCell className="text-green-600 dark:text-green-400 text-xs md:text-sm whitespace-nowrap">
                    {job.weight}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
