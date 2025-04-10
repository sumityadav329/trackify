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
    let report = `# ${tracker.title} Report\n\n`;
    tracker.steps.forEach((step, index) => {
      const status = stepStatuses[index];
      report += `## Step ${index + 1}: ${step}\n`;
      if (status) {
        report += `- Working: ${status.working ? 'Yes' : 'No'}\n`;
        report += `- Not Started: ${status.notStarted ? 'Yes' : 'No'}\n`;
        report += `- Having Issues: ${status.havingIssues ? 'Yes' : 'No'}\n`;
        report += `- Fixed: ${status.fixed ? 'Yes' : 'No'}\n`;
        report += `- Ready: ${status.ready ? 'Yes' : 'No'}\n\n`;
      } else {
        report += 'Status: Not available\n\n';
      }
    });
    return report;
  };

  const downloadReport = () => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tracker.title.replace(/\s+/g, '_').toLowerCase()}_report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{tracker.title}</CardTitle>
        <Button variant="outline" size="sm" onClick={downloadReport}>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </CardHeader>
      <CardDescription>Track your progress</CardDescription>
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
