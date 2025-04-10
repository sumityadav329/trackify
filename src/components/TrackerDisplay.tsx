'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { CheckCircle, ArrowLeftCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface TrackerDisplayProps {
  tracker: {
    title: string;
    steps: string[];
  };
}

const TrackerDisplay: React.FC<TrackerDisplayProps> = ({ tracker }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [motivationalMessage, setMotivationalMessage] = useState('');

  useEffect(() => {
    generateMessage();
  }, [currentStep, tracker]);

  const generateMessage = () => {
    const messages = [
      "Keep going, you're doing great!",
      "Every step counts, no matter how small.",
      "You're making progress, don't give up now!",
      "Believe in yourself, you can achieve anything!",
      "Stay focused and keep pushing forward."
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMotivationalMessage(messages[randomIndex]);
  };

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
              {index + 1 < currentStep && <CheckCircle className="inline-block ml-2 text-green-500" />}
            </li>
          ))}
        </ol>
          <p className="mb-4">{motivationalMessage}</p>
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
