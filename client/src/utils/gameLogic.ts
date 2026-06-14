export function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

export function isAnswerCorrect(input: string, expected: string): boolean {
  return normalizeText(input) === normalizeText(expected);
}

export function getProgressPercent(currentStep: number, totalSteps: number): number {
  if (totalSteps <= 0) {
    return 0;
  }

  return Math.round(((currentStep + 1) / totalSteps) * 100);
}
