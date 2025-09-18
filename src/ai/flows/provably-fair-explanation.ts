'use server';

/**
 * @fileOverview Explains how the provably fair system works.
 *
 * - getProvablyFairExplanation - A function that explains the provably fair system.
 * - ProvablyFairExplanationInput - The input type for the getProvablyFairExplanation function.
 * - ProvablyFairExplanationOutput - The return type for the getProvablyFairExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ProvablyFairExplanationInputSchema = z.object({
  gameId: z.string().describe('The ID of the game to explain the fairness of.'),
  serverSeed: z.string().describe('The server seed used for this game.'),
  clientSeed: z.string().describe('The client seed used for this game.'),
  nonce: z.number().describe('The nonce used for this game.'),
});
export type ProvablyFairExplanationInput = z.infer<typeof ProvablyFairExplanationInputSchema>;

const ProvablyFairExplanationOutputSchema = z.object({
  explanation: z.string().describe('The explanation of how the provably fair system works for this game.'),
});
export type ProvablyFairExplanationOutput = z.infer<typeof ProvablyFairExplanationOutputSchema>;

export async function getProvablyFairExplanation(input: ProvablyFairExplanationInput): Promise<ProvablyFairExplanationOutput> {
  return provablyFairExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provablyFairExplanationPrompt',
  input: {schema: ProvablyFairExplanationInputSchema},
  output: {schema: ProvablyFairExplanationOutputSchema},
  prompt: `Explain how the provably fair system works for this game.

  The game ID is: {{{gameId}}}
  The server seed is: {{{serverSeed}}}
  The client seed is: {{{clientSeed}}}
  The nonce is: {{{nonce}}}

  Explain in a way that is easy to understand for a non-technical user.  Be specific and give concrete examples using the data above.`,
});

const provablyFairExplanationFlow = ai.defineFlow(
  {
    name: 'provablyFairExplanationFlow',
    inputSchema: ProvablyFairExplanationInputSchema,
    outputSchema: ProvablyFairExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
