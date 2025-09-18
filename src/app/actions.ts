"use server";

import {
  getProvablyFairExplanation,
  type ProvablyFairExplanationInput,
} from "@/ai/flows/provably-fair-explanation";

export async function explainProvablyFair(
  input: ProvablyFairExplanationInput
) {
  try {
    const result = await getProvablyFairExplanation(input);
    return result;
  } catch (error) {
    console.error("Error generating provably fair explanation:", error);
    return {
      explanation:
        "An error occurred while generating the explanation. Please try again.",
    };
  }
}
