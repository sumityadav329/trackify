'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackerDefinitionProps {
  setTracker: (tracker: { title: string; steps: string[] }) => void;
}

const TrackerDefinition: React.FC<TrackerDefinitionProps> = ({ setTracker }) => {
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  const [newStep, setNewStep] = useState('');

  const addStep = () => {
    if (newStep.trim() !== '') {
      setSteps([...steps, newStep.trim()]);
      setNewStep('');
    }
  };

  const deleteStep = (indexToDelete: number) => {
    setSteps(steps.filter((_, index) => index !== indexToDelete));
  };

  const handleSubmit = () => {
    setTracker({ title, steps });
  };

  return (
    <div className="mb-8 rounded-lg p-6 bg-secondary shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Define Your Tracker</h2>
      <Input
        type="text"
        placeholder="Tracker Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 px-4 py-3 rounded-md border-gray-300 focus:border-primary focus:ring-primary"
      />
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="Add Step"
          value={newStep}
          onChange={(e) => setNewStep(e.target.value)}
          className="mr-2 px-4 py-3 rounded-md border-gray-300 focus:border-primary focus:ring-primary"
        />
        <Button type="button" onClick={addStep} className="px-4 py-3">
          <Plus className="mr-2 h-5 w-5" />
          Add
        </Button>
      </div>
      <div>
        {steps.map((step, index) => (
          <div key={index} className="flex items-center mb-2 rounded-md p-3 bg-gray-100">
            <span className="mr-4 text-gray-700">{index + 1}. {step}</span>
            <Button type="button" variant="destructive" size="icon" onClick={() => deleteStep(index)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={title.trim() === '' || steps.length === 0} className="mt-6 px-6 py-4 text-lg">
        Create Tracker
      </Button>
    </div>
  );
};

export default TrackerDefinition;
