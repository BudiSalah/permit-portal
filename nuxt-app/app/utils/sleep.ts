/**
 * Sleep for a random duration between min and max seconds
 * @param minSeconds - Minimum delay in seconds
 * @param maxSeconds - Maximum delay in seconds
 * @returns Promise that resolves after the random delay
 */
export const sleep = (
  minSeconds: number,
  maxSeconds: number
): Promise<void> => {
  const delay = Math.random() * (maxSeconds - minSeconds) + minSeconds;
  return new Promise((resolve) => setTimeout(resolve, delay * 1000));
};
