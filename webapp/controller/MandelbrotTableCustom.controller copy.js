myFormatter = {
  cellFormatter: function(value) {
    if (value < 25) {
      const cssClassName = "col" + value;
      this.addStyleClass(cssClassName);
    } else {
      this.addStyleClass("col0");
    }
    return value;
  }
};

sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel",
  "../modules/mandelbrotUtil"
], function (Controller, MessageToast, JSONModel,mandelbrotUtil) {
  "use strict"
  return Controller.extend("joltdx.shenanigans.mandelbrot.controller.MandelbrotTableCustom", {
    onInit: function () {

    },

    onBeforeRendering: function () {
      this.onSettingsReset();
    },

    onSettingsReset: function () {
      const defaultSettings = this.getView().getModel("defaultSettings").getData().mandelbrotCustom;
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
      MessageToast.show("Let's go custom!  \\m/");
      const settings = this.getView().getModel().getData();
      const table = this.getView().byId("mandelbrotTable");
      const columnListItems = new sap.m.ColumnListItem();
      table.destroyColumns();
      const dataMandel = [];
      for (let y=0; y<settings.mandelbrot.sizeY; y++) {
        dataMandel.push({});
      }
      table.setGrowingThreshold(parseInt(settings.mandelbrot.sizeY));
      for(let x=0; x<settings.mandelbrot.sizeX; x++) {
        const colId = "colCustom" + x;
        table.addColumn(new sap.m.Column(colId).setWidth("1px"));
        const mandelX = x - parseInt(settings.mandelbrot.offsetX);
        const mapX = mandelX / settings.mandelbrot.zoom;
        columnListItems.addCell(new sap.m.Text({text: "{path: '" + colId + "', formatter: 'myFormatter.cellFormatter'}"}));
        for(let y=0; y<settings.mandelbrot.sizeY; y++) {
          const mandelY = y - parseInt(settings.mandelbrot.offsetY);
          const mapY = mandelY / settings.mandelbrot.zoom;
          dataMandel[y][colId] = mandelbrotUtil.mandelbrotX(mapX,mapY);
        }
      }
      table.addColumn(new sap.m.Column("spacerColumnCustom"));
      const dataModel = new sap.ui.model.json.JSONModel(dataMandel);
      table.setModel(dataModel)
      table.bindItems("/",columnListItems);
    }
  });
});