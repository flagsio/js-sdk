export function calculateProbability(percentage: number): boolean {
    return Math.round(Math.random() * 100) <= percentage;
}
