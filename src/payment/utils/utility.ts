export function generateTrialTimestamp(days: number): number {
    const currentDate = Date.now();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const futureTimestamp = currentDate + days * millisecondsPerDay;
    return futureTimestamp;
}