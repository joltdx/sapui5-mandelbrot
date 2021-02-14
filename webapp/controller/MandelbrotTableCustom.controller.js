sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "../modules/mandelbrotUtil"
], function (Controller, JSONModel, mandelbrotUtil) {
  "use strict"
  return Controller.extend("joltdx.shenanigans.mandelbrot.controller.MandelbrotTableCustom", {
    onInit: function () {

    },

    onBeforeRendering: function () {
      this.onSettingsReset();
    },

    onSettingsReset: function (set) {
      const defaultSettings = this.getView().getModel("defaultSettings").getData().mandelbrotCustom;
      let settings = {};
      if (set === undefined || set === 1) {
        settings = defaultSettings.wholeSet;
      } else {
        settings = defaultSettings.seaHorseSpiral;
      }
      const oData = {
        mandelbrot: {
          sizeX: settings.sizeX,
          sizeY: settings.sizeY,
          centerX: settings.centerX,
          centerY: settings.centerY,
          zoom: settings.zoom
        }
      };
      const oModel = new JSONModel(oData);
      this.getView().setModel(oModel);
    },

    _mandelbrotColorFormatter: function (value) {
      if (value < 25) {
        const cssClassName = "col" + value;
        this.addStyleClass(cssClassName);
      } else {
        this.addStyleClass("col0");
      }
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
      table.destroyColumns();
      table.getModel().destroy();

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
      const dataModel = new sap.ui.model.json.JSONModel(dataMandel);
      table.setModel(dataModel)
      console.log(new Date().toISOString() + ": Binding the items...");
      table.bindItems("/", columnListItems);
      console.log(new Date().toISOString() + ": All done. Now stand by for browser handling of this shenanigans...");
    }
  });
});