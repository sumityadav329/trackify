'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { generateMotivationalMessage } from '@/ai/flows/generate-motivational-message';
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    generateMessage();
  }, [currentStep, tracker]);

  const generateMessage = async () => {
    setIsLoading(true);
    try {
      const message = await generateMotivationalMessage({
        trackerTitle: tracker.title,
        currentStep: currentStep,
        totalSteps: tracker.steps.length,
      });
      setMotivationalMessage(message.message);
    } catch (error) {
      toast({
        title: "Error generating message",
        description: "Failed to generate motivational message.",
        variant: "destructive",
      });
      console.error("GenAI Error:", error);
      setMotivationalMessage("Error generating message. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating message...
          </div>
        ) : (
          <p className="mb-4">{motivationalMessage}</p>
        )}
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

