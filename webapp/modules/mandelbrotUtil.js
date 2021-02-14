sap.ui.define([], function () {
  "use strict";

  return {
    mandelbrotX(x, y, iter) {
      // z(n+1) = z(n)(squared) + c
      const maxIterations = iter?iter:241;
      let n = 0;
      let a = x;
      let b = y;
      while (n < maxIterations) {
        let aSquared = a * a;
        let bSquared = b * b;
        b = 2 * a * b + y;
        a = aSquared - bSquared + x;
        n++;
        if (aSquared + bSquared > 4) {
            break;
        }
      }
      return n === maxIterations ? 0 : Math.ceil(24 * n / maxIterations);
    }
  }
})