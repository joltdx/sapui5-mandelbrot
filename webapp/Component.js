sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel",
  "./controller/PresetDialog"
], function (UIComponent, JSONModel, PresetDialog) {
  'use strict';
  return UIComponent.extend("joltdx.shenanigans.mandelbrot.Component", {
    metadata: {
      manifest: "json"
    },
    init: function () {
      UIComponent.prototype.init.apply(this, arguments);
      const oData = {
        mandelbrotStandard: [
          {
            name: "Whole set",
            sizeX: 39,
            sizeY: 29,
            offsetX: 31,
            offsetY: 14,
            zoom: 15
          }
        ],
        mandelbrotCustom: [
          {
            name: "Whole set",
            sizeX: 360,
            sizeY: 310,
            centerX: -0.7,
            centerY: 0,
            zoom: 105
          },
          {
            name: "Seahorse valley",
            sizeX: 360,
            sizeY: 310,
            centerX: -0.8156,
            centerY: 0.2025,
            zoom: 20000
          }
        ]
      };
      const oModel = new JSONModel(oData);
      this.setModel(oModel, "defaultSettings");
      this.setModel(new JSONModel(), "presets");
      this._presetDialog = new PresetDialog(this.getRootControl());
    },

    exit: function () {
      this._presetDialog.destroy();
      delete this._presetDialog;
    },

    openPresetDialog: function (callingView, presets) {
      this._presetDialog.open(callingView, presets);
    }
  });
});