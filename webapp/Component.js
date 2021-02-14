sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel"
], function(UIComponent, JSONModel) {
  'use strict';
  return UIComponent.extend("joltdx.shenanigans.mandelbrot.Component", {
    metadata: {
      manifest: "json"
    },
    init: function () {
      UIComponent.prototype.init.apply(this,arguments);
      const oData = {
        mandelbrotStandard: {
          sizeX: 39,
          sizeY: 29,
          offsetX: 31,
          offsetY: 14,
          zoom: 15
        },
        mandelbrotCustom: {
          wholeSet: {
            sizeX: 360,
            sizeY: 310,
            centerX: -0.7,
            centerY: 0,
            zoom: 105
          },
          seaHorseSpiral: {
            sizeX: 360,
            sizeY: 310,
            centerX: -0.8156,
            centerY: 0.2025,
            zoom: 20000
          }
        }
      };
      const oModel = new JSONModel(oData);
      this.setModel(oModel, "defaultSettings");
    },
  });
});