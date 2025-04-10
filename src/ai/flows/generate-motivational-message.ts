'use server';
/**
 * @fileOverview A motivational message generator based on tracker progress.
 *
 * - generateMotivationalMessage - A function that generates motivational messages.
 * - MotivationalMessageInput - The input type for the generateMotivationalMessage function.
 * - MotivationalMessageOutput - The return type for the generateMotivationalMessage function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const MotivationalMessageInputSchema = z.object({
  trackerTitle: z.string().describe('The title of the tracker.'),
  currentStep: z.number().describe('The current step number (1-indexed).'),
  totalSteps: z.number().describe('The total number of steps in the tracker.'),
});
export type MotivationalMessageInput = z.infer<typeof MotivationalMessageInputSchema>;

const MotivationalMessageOutputSchema = z.object({
  message: z.string().describe('The motivational message.'),
  progress: z.string().describe('A short summary of the progress.'),
});
export type MotivationalMessageOutput = z.infer<typeof MotivationalMessageOutputSchema>;

export async function generateMotivationalMessage(
  input: MotivationalMessageInput
): Promise<MotivationalMessageOutput> {
  return generateMotivationalMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'motivationalMessagePrompt',
  input: {
    schema: z.object({
      trackerTitle: z.string().describe('The title of the tracker.'),
      currentStep: z.number().describe('The current step number (1-indexed).'),
      totalSteps: z.number().describe('The total number of steps in the tracker.'),
    }),
  },
  output: {
    schema: z.object({
      message: z.string().describe('The motivational message.'),
      progress: z.string().describe('A short summary of the progress.'),
    }),
  },
  prompt: `You are a motivational coach. Generate a motivational message to encourage the user based on their current progress in the tracker.

Tracker Title: {{{trackerTitle}}}
Current Step: {{{currentStep}}}
Total Steps: {{{totalSteps}}}

Message:`,
});

const generateMotivationalMessageFlow = ai.defineFlow<
  typeof MotivationalMessageInputSchema,
  typeof MotivationalMessageOutputSchema
>(
  {
    name: 'generateMotivationalMessageFlow',
    inputSchema: MotivationalMessageInputSchema,
    outputSchema: MotivationalMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output!,
      progress: `Generated a motivational message for the user who is on step ${input.currentStep} of ${input.totalSteps} in the ${input.trackerTitle} tracker.`,      
    };
  }
);
