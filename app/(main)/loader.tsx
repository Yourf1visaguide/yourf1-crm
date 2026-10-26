import { FullScreenLoader, LineLoader } from "@/components/resuable-components/loader"
import React from 'react'

function LoaderMain() {
  return (
    <FullScreenLoader loader={<LineLoader />} text="Loading" />
  )
}

export default LoaderMain