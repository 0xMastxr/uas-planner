'use client'

import { Header } from '../components/header'
import { FlightPlansUploader } from '../components/FlightPlansUploader'

export default function TrajectoryGenerator() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <FlightPlansUploader />
    </div>
  )
}

