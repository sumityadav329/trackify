'use client'

import TrackerDefinition from '@/components/TrackerDefinition';
import TrackerDisplay from '@/components/TrackerDisplay';
import { useState } from 'react';

export default function Home() {
  const [tracker, setTracker] = useState({
    title: '',
    steps: []
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">Trackify</h1>
        <h2 className="text-md  mb-8 text-gray-600 text-center">by Sumit using AI</h2>
        <TrackerDefinition setTracker={setTracker} />
        {tracker.steps.length > 0 && <TrackerDisplay tracker={tracker} />}
      </div>
    </div>
  );
}

