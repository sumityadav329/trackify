'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

interface TrackerDisplayProps {
  tracker: {
    title: string;
    steps: string[];
  };
}

const TrackerDisplay: React.FC<TrackerDisplayProps> = ({ tracker }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    Array(tracker.steps.length).fill(false)
  );

  const nextStep = () => {
    if (currentStep < tracker.steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepComplete = (index: number, checked: boolean) => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[index] = checked;
    setCompletedSteps(newCompletedSteps);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tracker.title}</CardTitle>
        <CardDescription>Track your progress</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal pl-5 mb-4">
          {tracker.steps.map((step, index) => (
            <li key={index} className={index + 1 === currentStep ? 'font-semibold text-primary' : ''}>
              {step}
              <div className="flex mt-2">
                <label className="inline-flex items-center mr-2">
                  <Checkbox
                    checked={completedSteps[index]}
                    onCheckedChange={(checked) => handleStepComplete(index, checked)}
                  />
                  <span className="ml-2">Complete</span>
                </label>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={prevStep} disabled={currentStep === 1}>
          <ArrowLeftCircle className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button onClick={nextStep} disabled={currentStep === tracker.steps.length}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrackerDisplay;
