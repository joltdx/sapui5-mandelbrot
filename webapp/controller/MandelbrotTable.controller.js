sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel",
  "../modules/mandelbrotUtil"
], function (Controller, MessageToast, JSONModel,mandelbrotUtil) {
  "use strict"
  return Controller.extend("joltdx.shenanigans.mandelbrot.controller.MandelbrotTable", {
    onInit: function () {

    },

    onBeforeRendering: function () {
      this.onSettingsReset();
    },

    onSettingsReset: function () {
      const defaultSettings = this.getView().getModel("defaultSettings").getData().mandelbrotStandard;
      const oData = {
        mandelbrot: {
          sizeX: defaultSettings.sizeX,
          sizeY: defaultSettings.sizeY,
          offsetX: defaultSettings.offsetX,
          offsetY: defaultSettings.offsetY,
          zoom: defaultSettings.zoom
        }
      };
      const oModel = new JSONModel(oData);
      this.getView().setModel(oModel);
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
    }
  });
});