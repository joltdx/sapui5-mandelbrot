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
            mandelbrot:
            {
              sizeX: 39,
              sizeY: 29,
              offsetX: 31,
              offsetY: 14,
              zoom: 15
            }
          },
          {
            name: "For a big screen",
            mandelbrot:
            {
              sizeX: 127,
              sizeY: 56,
              offsetX: 190,
              offsetY: 40,
              zoom: 120
            }
          }
        ],
        mandelbrotCustom: [
          {
            name: "Whole set",
            mandelbrot: {
              sizeX: 360,
              sizeY: 310,
              centerX: -0.7,
              centerY: 0,
              zoom: 105
            }
          },
          {
            name: "Another preset",
            mandelbrot: {
              sizeX: 360,
              sizeY: 310,
              centerX: -1.1,
              centerY: -0.3,
              zoom: 900
            }
          },
          {
            name: "Seahorse valley",
            mandelbrot: {
              sizeX: 360,
              sizeY: 310,
              centerX: -0.8156,
              centerY: 0.2025,
              zoom: 20000
            }
          },
          {
            name: "And another one",
            mandelbrot: {
              sizeX: 400,
              sizeY: 330,
              centerX: 0.27,
              centerY: 0,
              zoom: 10000
            }
          }
        ]
      };
      this.setModel(new JSONModel(oData), "defaultSettings");
      this.setModel(new JSONModel(), "presets");
      this.setModel(new JSONModel(), "settingsDialogChosenPresets");
      this._presetDialog = new PresetDialog(this.getRootControl());
      console.log("component init done");
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