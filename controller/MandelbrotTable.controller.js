sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel",
  "../modules/mandelbrotUtil"
], function (Controller, MessageToast, JSONModel,mandelbrotUtil) {
  "use strict"
  return Controller.extend("joltdx.shenanigans.mandelbrot.controller.MandelbrotTable", {
    onInit: function () {
      const oData = {
        settings: {
          zoomX: 20,
          zoomY: 20
        }
      };
      const oModel = new JSONModel(oData);
      this.getView().setModel(oModel);
    },
    onSettingsLetsGo: function () {
      MessageToast.show("Let's go!  \\m/");
      const generalSettings = this.getView().getModel("generalSettings").getData();
      const settings = this.getView().getModel().getData();
      const table = this.getView().byId("mandelbrotTable");
      const columnListItems = new sap.m.ColumnListItem().addStyleClass("lowRowHeight");
      table.destroyColumns();
      const dataMandel = [];
      for (let y=0; y<generalSettings.sizeY; y++) {
        dataMandel.push({});
      }
      for(let x=0; x<generalSettings.sizeX; x++) {
        const colId = "col" + x;
        table.addColumn(new sap.m.Column(colId).setWidth("20px").setHeader(new sap.m.Label({text: "a"})));
        const mandelX = x + parseInt(generalSettings.offsetX);
        const mapX = mandelX / settings.settings.zoomX;
        columnListItems.addCell(new sap.m.Text({text: " {" + colId + "}"}));
        for(let y=0; y<generalSettings.sizeY; y++) {
          const mandelY = y + parseInt(generalSettings.offsetY);
          const mapY = mandelY / settings.settings.zoomY;
          dataMandel[y][colId] = mandelbrotUtil.mandelbrotX(mapX,mapY)?"X":"";
        }
      }
      table.addColumn(new sap.m.Column("spacerColumn"));
      const dataModel = new sap.ui.model.json.JSONModel(dataMandel);
      table.setModel(dataModel)
      table.bindItems("/",columnListItems);
    }
  });
});