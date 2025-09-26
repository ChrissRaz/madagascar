'use server';

/**
 * @fileOverview Summarizes arguments for and against a petition using AI.
 *
 * - summarizePetitionArguments - A function that summarizes petition arguments.
 * - SummarizePetitionArgumentsInput - The input type for the summarizePetitionArguments function.
 * - SummarizePetitionArgumentsOutput - The return type for the summarizePetitionArguments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePetitionArgumentsInputSchema = z.object({
  argumentsFor: z
    .string()
    .describe('Arguments in favor of the petition.'),
  argumentsAgainst: z
    .string()
    .describe('Arguments against the petition.'),
});
export type SummarizePetitionArgumentsInput =
  z.infer<typeof SummarizePetitionArgumentsInputSchema>;

const SummarizePetitionArgumentsOutputSchema = z.object({
  summaryFor: z
    .string()
    .describe('A short summary of the arguments in favor.'),
  summaryAgainst: z
    .string()
    .describe('A short summary of the arguments against.'),
});
export type SummarizePetitionArgumentsOutput =
  z.infer<typeof SummarizePetitionArgumentsOutputSchema>;

export async function summarizePetitionArguments(
  input: SummarizePetitionArgumentsInput
): Promise<SummarizePetitionArgumentsOutput> {
  return summarizePetitionArgumentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePetitionArgumentsPrompt',
  input: {schema: SummarizePetitionArgumentsInputSchema},
  output: {schema: SummarizePetitionArgumentsOutputSchema},
  prompt: `Summarize the arguments for and against the following petition.\n\nArguments For: {{{argumentsFor}}}\n\nArguments Against: {{{argumentsAgainst}}}\n\nProvide a short summary for each side.\n\nSummary For:\nSummary: {{output.summaryFor}}\n\nSummary Against:\nSummary: {{output.summaryAgainst}}`,
});

const summarizePetitionArgumentsFlow = ai.defineFlow(
  {
    name: 'summarizePetitionArgumentsFlow',
    inputSchema: SummarizePetitionArgumentsInputSchema,
    outputSchema: SummarizePetitionArgumentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
