export enum TestInstanceLearnerStatus {
  JOINED = 'joined',
  STARTED = 'started',
  FINISHED = 'finished',
}

export type TestInstanceLearnerResultSummary = {
  pointsToAchieve: number;
  pointsAchieved: number;
  percentage: number;
};
