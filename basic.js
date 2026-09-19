function luDecomposition(A) {
  const n = A.length;

  const U = A.map(row => row.slice());

  const L = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    L[i][i] = 1;
  }

  const P = Array.from({ length: n }, (_, i) =>
    new Array(n).fill(0).map((_, j) => (i === j ? 1 : 0))
  );

  for (let k = 0; k < n; k++) {
    let pivot = k;
    let maxAbs = Math.abs(U[k][k]);

    for (let i = k + 1; i < n; i++) {
      const current = Math.abs(U[i][k]);
      if (current > maxAbs) {
        maxAbs = current;
        pivot = i;
      }
    }

    if (pivot !== k) {
      const tempU = U[k];
      U[k] = U[pivot];
      U[pivot] = tempU;

      const tempP = P[k];
      P[k] = P[pivot];
      P[pivot] = tempP;

      for (let j = 0; j < k; j++) {
        const temp = L[k][j];
        L[k][j] = L[pivot][j];
        L[pivot][j] = temp;
      }
    }

    if (maxAbs === 0) {
      continue;
    }

    for (let i = k + 1; i < n; i++) {
      const factor = U[i][k] / U[k][k];
      L[i][k] = factor;
      U[i][k] = 0;

      for (let j = k + 1; j < n; j++) {
        U[i][j] -= factor * U[k][j];
      }
    }
  }

  return [L, U, P];
}
