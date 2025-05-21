"use client"

import { useEffect, useState } from "react"

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

export function useIsMobile() {
  const { width } = useWindowSize()
  return width < 768
}

export function useIsTablet() {
  const { width } = useWindowSize()
  return width >= 768 && width < 1024
}

export function useIsDesktop() {
  const { width } = useWindowSize()
  return width >= 1024
}
