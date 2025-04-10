
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
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Define Your Tracker</h2>
      <Input
        type="text"
        placeholder="Tracker Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2"
      />
      <div className="flex mb-2">
        <Input
          type="text"
          placeholder="Add Step"
          value={newStep}
          onChange={(e) => setNewStep(e.target.value)}
          className="mr-2"
        />
        <Button type="button" onClick={addStep}>
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>
      <div>
        {steps.map((step, index) => (
          <div key={index} className="flex items-center mb-1">
            <span className="mr-2">{index + 1}. {step}</span>
            <Button type="button" variant="destructive" size="icon" onClick={() => deleteStep(index)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={title.trim() === '' || steps.length === 0}>
        Create Tracker
      </Button>
    </div>
  );
};

export default TrackerDefinition;

