import difficultyConfig from "../data/difficultyConfig";

// function to get random skull count
export function getRandomSkullCount([min, max]) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to shuffle position and assign skull/ gold
export function generateRowCards(cardCount, skullRange) {
  const skullCount = getRandomSkullCount(skullRange);
  const indices = Array.from({ length: cardCount }, (_, i) => {
    return i;
  });

  for (let i = indices.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [indices[i], indices[j]] =[indices[j], indices[i]];
  }
  const skullPosition = indices.slice(0, skullCount);
  const skullSet = new Set(skullPosition);

  return Array.from({length: cardCount}, (_,i) => 
    skullSet.has(i) ? "skull" :  "gold"
  )
}

// function to access multiplier according to difficutly levels
export function getRowMultiplier(difficulty, rowIndex){
   return difficultyConfig[difficulty].multipliers[rowIndex];
}
generateRowCards(6, [4, 5]);

getRowMultiplier('hard', 1);
    