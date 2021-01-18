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
        sizeX: 51,
        sizeY: 37,
        offsetX: -41,
        offsetY: -18
      };
      const oModel = new JSONModel(oData);
      this.setModel(oModel, "generalSettings");
    },
  });
});