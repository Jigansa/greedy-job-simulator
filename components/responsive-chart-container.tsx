"use client"

import type React from "react"

import { useIsMobile, useIsTablet } from "./responsive-utils"
import { ResponsiveContainer } from "@/components/ui/chart"

interface ResponsiveChartContainerProps {
  children: React.ReactNode
  mobileHeight?: number
  tabletHeight?: number
  desktopHeight?: number
}

export function ResponsiveChartContainer({
  children,
  mobileHeight = 300,
  tabletHeight = 350,
  desktopHeight = 400,
}: ResponsiveChartContainerProps) {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  const height = isMobile ? mobileHeight : isTablet ? tabletHeight : desktopHeight

  return (
    <div style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}
