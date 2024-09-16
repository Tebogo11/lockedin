export function calculateProgressToNextLevel(points: number) {
  // Calculate the current level
  let currentLevel = Math.floor(points / 1000);

  // Calculate the points required for the next level
  let nextLevelPoints = (currentLevel + 1) * 1000;

  // Calculate how many points user has towards the next level
  let pointsTowardsNextLevel = points % 1000;

  // Calculate the points remaining to the next level
  let pointsRemaining = nextLevelPoints - points;

  return {
    currentLevel: currentLevel,
    nextLevelPoints: nextLevelPoints,
    pointsTowardsNextLevel: pointsTowardsNextLevel,
    pointsRemaining: pointsRemaining,
  };
}

export const calcLevelBar = (
  index: number,
  currentPointsToNextLevel: number
) => {
  if (index === 0) {
    return currentPointsToNextLevel > 200;
  }
  if (index === 1) {
    return currentPointsToNextLevel > 400;
  }
  if (index === 2) {
    return currentPointsToNextLevel > 600;
  }
  if (index === 3) {
    return currentPointsToNextLevel > 800;
  }
  if (index === 4) {
    return currentPointsToNextLevel > 1000;
  }
  return false;
};
