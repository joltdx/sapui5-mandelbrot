sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "../modules/mandelbrotUtil"
], function (Controller, JSONModel, mandelbrotUtil) {
  "use strict"
  return Controller.extend("joltdx.shenanigans.mandelbrot.controller.MandelbrotTableCustom", {
    onInit: function () {
      const presets = this.getOwnerComponent().getModel("defaultSettings").getData().mandelbrotCustom;
      this.getView().setModel(new JSONModel());
      this.setSettingsData(presets[0]);
    },

    onBeforeRendering: function () {
      console.log("custom, onbeforerendering");
      const presetSettings = this.getView().getModel("defaultSettings").getData().mandelbrotCustom;
      this.getView().getModel("presets").setData(presetSettings);
    },

    onSettingsReset: function () {
      const presets = this.getView().getModel("presets").getData();
      this.setSettingsData(presets[0]);
    },

    setSettingsData: function (settings) {
      const decoupled = JSON.parse(JSON.stringify(settings.mandelbrot));
      this.getView().getModel().setData({ mandelbrot: decoupled });
    },

    _mandelbrotColorFormatter: function (value) {
      const cssClassName = value < 25 ? "col" + value : "col0";
      this.addStyleClass(cssClassName);
      return value;
    },

    _getMandelParameters: function () {
      const parameters = {};
      const settings = this.getView().getModel().getData();
      parameters.sizeX = parseInt(settings.mandelbrot.sizeX);
      parameters.sizeY = parseInt(settings.mandelbrot.sizeY);
      parameters.zoom = parseInt(settings.mandelbrot.zoom) * parameters.sizeX;
      parameters.iterations = Math.ceil(Math.log(parseInt(settings.mandelbrot.zoom) / parameters.sizeX * 100) / Math.log(1.07));
      parameters.centerX = parseFloat(settings.mandelbrot.centerX);
      parameters.centerY = parseFloat(settings.mandelbrot.centerY);
      parameters.mandelXStep = parameters.sizeX / parameters.zoom;
      parameters.mandelYStep = parameters.sizeY / parameters.zoom;
      parameters.mandelX0 = parameters.centerX - ( parameters.sizeX / 2) * parameters.mandelXStep;
      parameters.mandelY0 = parameters.centerY + ( parameters.sizeY / 2) * parameters.mandelYStep;
      return parameters;
    },

    onSettingsLetsGo: function () {
      console.log(new Date().toISOString() + ": Let's go! Preparing...");
      const parameters = this._getMandelParameters();

      const table = this.getView().byId("mandelbrotTable");
      table.destroyItems();
      table.destroyColumns();

      const dataMandel = [];
      for (let y = 0; y < parameters.sizeY; y++) {
        dataMandel.push({});
      }
      table.setGrowingThreshold(parameters.sizeY);
      const columnListItems = new sap.m.ColumnListItem();

      console.log(new Date().toISOString() + ": Calculating the mandelbrot set...");
      let mapX = parameters.mandelX0 - parameters.mandelXStep;
      for (let x = 0; x < parameters.sizeX; x++) {
        mapX += parameters.mandelXStep;
        const colId = "colCustom" + x;
        table.addColumn(new sap.m.Column(colId).setWidth("1px"));
        columnListItems.addCell(new sap.m.Text().bindText({ path: colId, formatter: this._mandelbrotColorFormatter }));
        let mapY = parameters.mandelY0 + parameters.mandelYStep;
        for (let y = 0; y < parameters.sizeY; y++) {
          mapY -= parameters.mandelYStep;
          dataMandel[y][colId] = mandelbrotUtil.mandelbrotX(mapX, mapY, parameters.iterations);
        }
      }
      table.addColumn(new sap.m.Column("spacerColumnCustom"));
      console.log(new Date().toISOString() + ": Setting the JSONModel...");
      const dataModel = new JSONModel(dataMandel);
      table.setModel(dataModel)
      console.log(new Date().toISOString() + ": Binding the items...");
      table.bindItems("/", columnListItems);
      console.log(new Date().toISOString() + ": All done. Now stand by for the browser to handle this shenanigans...");
    },

    onOpenPresetDialog: function () {
      this.getOwnerComponent().openPresetDialog(this.getView());
    },

    setChosenPresets: function () {
      const chosenPresets = JSON.parse(JSON.stringify(this.getView().getModel("settingsDialogChosenPresets").getData()));
      this.getView().getModel().setData({mandelbrot: chosenPresets}); 
    }
  });
});