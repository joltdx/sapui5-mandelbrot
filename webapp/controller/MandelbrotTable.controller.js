sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "../modules/mandelbrotUtil"
], function (Controller, JSONModel,mandelbrotUtil) {
  "use strict"
  return Controller.extend("joltdx.shenanigans.mandelbrot.controller.MandelbrotTable", {
    onInit: function () {
      const presets = this.getOwnerComponent().getModel("defaultSettings").getData().mandelbrotStandard;
      this.getView().setModel(new JSONModel());
      this.setSettingsData(presets[0]);
    },

    onBeforeRendering: function () {
      this._presetSettings = this.getView().getModel("defaultSettings").getData().mandelbrotStandard;
      this.getView().getModel("presets").setData(this._presetSettings);
      //if (this.getView().getModel().getData() === {}) {
      //  this.onSettingsReset();
      //}
    },

    onSettingsResetoooold: function () {
      const defaultSettings = this.getView().getModel("presets").getData()[0];
      const decoupled = JSON.parse(JSON.stringify(defaultSettings.mandelbrot));
      const data = { mandelbrot: decoupled };
      this.getView().getModel().setData(data);
    },
    
    onSettingsReset: function () {
      const presets = this.getView().getModel("presets").getData();
      this.setSettingsData(presets[0]);
    },

    setSettingsData: function (settings) {
      const decoupled = JSON.parse(JSON.stringify(settings.mandelbrot));
      this.getView().getModel().setData({ mandelbrot: decoupled });
    },

    onSettingsLetsGo: function () {
      const settings = this.getView().getModel().getData();
      const table = this.getView().byId("mandelbrotTable");
      const columnListItems = new sap.m.ColumnListItem();
      table.destroyColumns();
      const dataMandel = [];
      for (let y=0; y<settings.mandelbrot.sizeY; y++) {
        dataMandel.push({});
      }
      for(let x=0; x<settings.mandelbrot.sizeX; x++) {
        const colId = "col" + x;
        table.addColumn(new sap.m.Column(colId).setWidth("30px"));
        const mandelX = x - parseInt(settings.mandelbrot.offsetX);
        const mapX = mandelX / settings.mandelbrot.zoom;
        columnListItems.addCell(new sap.m.Text({text: " {" + colId + "}"}));
        columnListItems.addCell();
        for(let y=0; y<settings.mandelbrot.sizeY; y++) {
          const mandelY = y - parseInt(settings.mandelbrot.offsetY);
          const mapY = mandelY / settings.mandelbrot.zoom;
          dataMandel[y][colId] = mandelbrotUtil.mandelbrotX(mapX,mapY) === 0 ? "X" : "";
        }
      }
      table.addColumn(new sap.m.Column("spacerColumn"));
      const dataModel = new sap.ui.model.json.JSONModel(dataMandel);
      table.setModel(dataModel)
      table.bindItems("/",columnListItems);
    },

    onOpenPresetDialog: function () {
      this.getOwnerComponent().openPresetDialog(this.getView());
    },

    setChosenPresets: function () {
      const chosenPresets = JSON.parse(JSON.stringify(this.getView().getModel("settingsDialogChosenPresets").getData()));
      this.getView().getModel().setData({mandelbrot: chosenPresets});
      this.getView().getModel().refresh();
    }
  });
});