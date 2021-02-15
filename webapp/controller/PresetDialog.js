sap.ui.define([
  "sap/ui/base/ManagedObject",
  "sap/ui/core/Fragment",
  "sap/ui/model/json/JSONModel"
], function (ManagedObject, Fragment, JSONModel) {
  "use strict";

  return ManagedObject.extend("joltdx.shenanigans.mandelbrot.controller.PresetDialog", {
    constructor: function (oView) {
      this._oView = oView;
    },

    exit: function () {
      delete this._oView;
    },

    open: function (callingView) {
      const oView = this._oView;
      this._presets = callingView.getModel().getData();
      if (!this.pDialog) {
        const oFragmentController = {
          onInit: function(callingView) {
            this._presets = callingView.getController()._presetSettings;
            this.pDialog.setModel(this._presets);
          },
          onBeforeOpen: function() {
            const presets = callingView.getModel("presets");
            const presetsModel = new JSONModel(presets);
            oView.byId("presetList").setModel(presetsModel);
          },
          onCancelDialog: function () {
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
        console.log(callingView.getModel().getData());
      });
    }
  });
});