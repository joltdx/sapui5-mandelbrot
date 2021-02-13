sap.ui.define([
  "sap/ui/base/ManagedObject",
  "sap/ui/core/Fragment"
], function (ManagedObject, Fragment) {
  "use strict";

  return ManagedObject.extend("joltdx.shenanigans.mandelbrot.controller.PresetDialog", {
    constructor: function (oView) {
      this._oView = oView;
    },

    exit: function () {
      delete this._oView;
    },

    open: function () {
      const oView = this._oView;
      if (!this.pDialog) {
        const oFragmentController = {
          onCloseDialog: function () {
            oView.byId("presetDialog").close();
          }
        };
        this.pDialog = Fragment.load({
          id: oView.getId(),
          name: "joltdx.shenanigans.mandelbrot.view.PresetDialog",
          controller: oFragmentController
        }).then(function (oDialog) {
          oView.addDependent(oDialog);
          return oDialog;
        });
      }
      this.pDialog.then(function(oDialog) {
        oDialog.open();
      });
    }
  });
});