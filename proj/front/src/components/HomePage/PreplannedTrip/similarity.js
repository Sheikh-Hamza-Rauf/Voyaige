export function cosineSimilarity(vecA, vecB) {
  const categories = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  
  let dotProduct = 0;
  let magA = 0;
  let magB = 0;

  categories.forEach(category => {
      const valA = vecA[category] || 0;
      const valB = vecB[category] || 0;

      dotProduct += valA * valB;
      magA += valA ** 2;
      magB += valB ** 2;
  });

  if (magA === 0 || magB === 0) return 0; // Avoid division by zero
  return dotProduct / (Math.sqrt(magA) * Math.sqrt(magB));
}
