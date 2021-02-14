sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict"
  return Controller.extend("joltdx.shenanigans.mandelbrot.controller.App", {
    onInit: function() {
      this._appViewId = this.getView().getId();
    },
    getAppViewId() {
      return this._appViewId;
    },
    onStartPageInfoButtonPress: function () {
      const standardData = sap.ui.getCore().byId(this.getAppViewId()).byId("view.MandelbrotStandard").getModel().getData();
      console.log(standardData);
     }
  });
});