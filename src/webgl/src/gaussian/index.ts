function gaussianMatrix(radius: number, sigma = radius / 3) {
  const a = 1 / (Math.sqrt(2 * Math.PI) * sigma);

  const b = -1 / (2 * sigma ** 2);

  let sum = 0;

  const matrix = [];

  for (let x = -radius; x <= radius; x++) {
    const g = a * Math.exp(b * x ** 2);

    matrix.push(g);

    sum += g;
  }

  for (let i = 0, len = matrix.length; i < len; i++) {
    matrix[i] /= sum;
  }

  return { matrix, sum };
}
