'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftCircle, ArrowRightCircle, Download } from 'lucide-react';


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
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>([]);

  useEffect(() => {
    // Initialize stepStatuses based on the tracker's steps
    const initialStepStatus: StepStatus[] = tracker.steps.map(() => ({
      working: false,
      notStarted: true,
      havingIssues: false,
      fixed: false,
      ready: false,
    }));
    setStepStatuses(initialStepStatus);
  }, [tracker.steps]);


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
    const newStatus = { ...(newStepStatuses[index] || {
      working: false,
      notStarted: true,
      havingIssues: false,
      fixed: false,
      ready: false,
    }) };

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

  const generateReport = () => {
    // CSV Header
    let csv = "Step,Working,Not Started,Having Issues,Fixed,Ready\n";

    tracker.steps.forEach((step, index) => {
      const status = stepStatuses[index];
      if (status) {
        csv += `"${step}",${status.working ? 'Yes' : 'No'},${status.notStarted ? 'Yes' : 'No'},${status.havingIssues ? 'Yes' : 'No'},${status.fixed ? 'Yes' : 'No'},${status.ready ? 'Yes' : 'No'}\n`;
      } else {
        csv += `"${step}",Not available,Not available,Not available,Not available,Not available\n`;
      }
    });
    return csv;
  };

  const downloadReport = () => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tracker.title.replace(/\s+/g, '_').toLowerCase()}_report.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  return (
    <Card className="rounded-xl shadow-lg border-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-secondary rounded-t-xl">
        <CardTitle className="text-2xl font-semibold">{tracker.title}</CardTitle>
        <Button variant="outline" size="sm" onClick={downloadReport}>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </CardHeader>
      <CardDescription className="text-gray-500 mt-2 px-6">Track your progress with ease</CardDescription>
      <CardContent>
        <ol className="list-decimal pl-5 mb-4">
          {tracker.steps.map((step, index) => (
            <li key={index} className={index + 1 === currentStep ? 'font-semibold text-primary' : ''}>
              {step}
              <div className="flex mt-2 space-x-2">
                <label className="inline-flex items-center">
                  <Checkbox
                    checked={stepStatuses[index]?.working || false}
                    onCheckedChange={(checked) => handleStatusChange(index, 'working', checked)}
                  />
                  <span className="ml-2">Working</span>
                </label>
                <label className="inline-flex items-center">
                  <Checkbox
                    checked={stepStatuses[index]?.notStarted || false}
                    onCheckedChange={(checked) => handleStatusChange(index, 'notStarted', checked)}
                  />
                  <span className="ml-2">Not Started</span>
                </label>
                <label className="inline-flex items-center">
                  <Checkbox
                    checked={stepStatuses[index]?.havingIssues || false}
                    onCheckedChange={(checked) => handleStatusChange(index, 'havingIssues', checked)}
                  />
                  <span className="ml-2">Having Issues</span>
                </label>
                <label className="inline-flex items-center">
                  <Checkbox
                    checked={stepStatuses[index]?.fixed || false}
                    onCheckedChange={(checked) => handleStatusChange(index, 'fixed', checked)}
                  />
                  <span className="ml-2">Fixed</span>
                </label>
                <label className="inline-flex items-center">
                  <Checkbox
                    checked={stepStatuses[index]?.ready || false}
                    onCheckedChange={(checked) => handleStatusChange(index, 'ready', checked)}
                  />
                  <span className="ml-2">Ready</span>
                </label>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
      <CardFooter className="flex justify-between bg-secondary rounded-b-xl p-4">
        <Button onClick={prevStep} disabled={currentStep === 1} className="px-4 py-2">
          <ArrowLeftCircle className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button onClick={nextStep} disabled={currentStep === tracker.steps.length} className="px-4 py-2">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrackerDisplay;
