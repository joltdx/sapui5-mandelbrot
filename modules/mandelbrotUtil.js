sap.ui.define([], function () {
  "use strict";

  return {
    mandelbrotX(x, y, iter) {
      // zn+1 = zn squared + c
      const maxIterations = iter?iter:80;
      let n = 0;
      let z = 0;
      let a = x;
      let b = y;
      while (n < maxIterations) {
        let aSquared = a * a;
        let bSquared = b * b;
        b = 2 * a * b + y;
        a = aSquared - bSquared + x;
        if (Math.abs(a + b) > 16) {
            break;
        }
        n++
      }
      return n === maxIterations;
    }
  }
})