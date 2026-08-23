const difficultyConfig = {
  easy: {
    skull: [1, 2],
    multipliers: [1.15, 1.25, 1.35, 1.5],
    rowCount: 4,
  },
  medium: {
    skull: [2, 3],
    multipliers: [1.3, 1.45, 1.6, 1.85, 2, 2.5],
    rowCount: 6,
  },
  hard: {
    skull: [3, 4],
    multipliers: [2, 2.35, 2.70, 3.05, 3.40, 3.75, 4.05, 5],
    rowCount: 8,
  },
  extreme: {
    skull: [5, 5],
    multipliers: [3, 3.75, 4.5, 5.25, 6, 6.75, 7.5, 8.25, 9, 10],
    rowCount: 10,
  },
};

export default difficultyConfig;