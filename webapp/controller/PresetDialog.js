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
      if (this.pDialog) {
        this.pDialog.destroy();
      }
      delete this._oView;
    },

    open: function (callingView) {
      const oView = this._oView;
      if (!this.pDialog) {
        const oFragmentController = {
          onCloseDialog: function (oEvent) {
            oView.byId("presetDialog").close();
          },
          onItemPress: function (oEvent) {
            const mandelbrot = JSON.parse(JSON.stringify(oEvent.getSource().getBindingContext("presets").getObject().mandelbrot));
            const chosenModel = oView.getModel("settingsDialogChosenPresets");
            chosenModel.setData(mandelbrot);
            this.onCloseDialog(oEvent);
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
        const afterClose = oDialog.mEventRegistry.afterClose;
        if (afterClose) {
          afterClose.forEach(function (element) {
            oDialog.detachAfterClose(element.fFunction);
          });
        }
        oDialog.attachAfterClose(function () { callingView.getController().setChosenPresets(); } );
        oDialog.open();
      });
    }
  });
});