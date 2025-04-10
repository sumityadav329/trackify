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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trackify</h1>
      <TrackerDefinition setTracker={setTracker} />
      {tracker.steps.length > 0 && <TrackerDisplay tracker={tracker} />}
    </div>
  );
}
