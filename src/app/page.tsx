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
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Trackify</h1>
        <TrackerDefinition setTracker={setTracker} />
        {tracker.steps.length > 0 && <TrackerDisplay tracker={tracker} />}
      </div>
    </div>
  );
}
