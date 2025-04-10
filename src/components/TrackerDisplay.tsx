'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftCircle } from 'lucide-react';
import { ArrowRightCircle } from 'lucide-react';


interface TrackerDisplayProps {
  tracker: {
    title: string;
    steps: string[];
  };
}

type StepStatus = {
  working: boolean;
  notStarted: boolean;
  havingIssues: boolean;
  fixed: boolean;
  ready: boolean;
};

const TrackerDisplay: React.FC<TrackerDisplayProps> = ({ tracker }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const initialStepStatus: StepStatus[] = tracker.steps.map(() => ({
    working: false,
    notStarted: true,
    havingIssues: false,
    fixed: false,
    ready: false,
  }));
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(initialStepStatus);


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

  const handleStatusChange = (index: number, status: keyof StepStatus, checked: boolean) => {
    const newStepStatuses = [...stepStatuses];
    // Create a copy of the current status for the step
    const newStatus = { ...newStepStatuses[index] };

    // Reset all statuses to false
    Object.keys(newStatus).forEach((key) => {
      newStatus[key as keyof StepStatus] = false;
    });

    // Set the selected status to true
    newStatus[status] = checked;

    // Update the stepStatuses array with the new status
    newStepStatuses[index] = newStatus;
    setStepStatuses(newStepStatuses);
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
              <div className="flex mt-2 space-x-2">
                <label className="inline-flex items-center">
                  <Checkbox
                    checked={stepStatuses[index].working}
                    onCheckedChange={(checked) => handleStatusChange(index, 'working', checked)}
                  />
                  <span className="ml-2">Working</span>
                </label>
                <label className="inline-flex items-center">
                  <Checkbox
                    checked={stepStatuses[index].notStarted}
                    onCheckedChange={(checked) => handleStatusChange(index, 'notStarted', checked)}
                  />
                  <span className="ml-2">Not Started</span>
                </label>
                <label className="inline-flex items-center">
                  <Checkbox
                    checked={stepStatuses[index].havingIssues}
                    onCheckedChange={(checked) => handleStatusChange(index, 'havingIssues', checked)}
                  />
                  <span className="ml-2">Having Issues</span>
                </label>
                <label className="inline-flex items-center">
                  <Checkbox
                    checked={stepStatuses[index].fixed}
                    onCheckedChange={(checked) => handleStatusChange(index, 'fixed', checked)}
                  />
                  <span className="ml-2">Fixed</span>
                </label>
                <label className="inline-flex items-center">
                  <Checkbox
                    checked={stepStatuses[index].ready}
                    onCheckedChange={(checked) => handleStatusChange(index, 'ready', checked)}
                  />
                  <span className="ml-2">Ready</span>
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

    