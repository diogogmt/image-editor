var CreateState = Base.extend({

  "canvas": null,
  "overlayShape": null,
  "startCoords": {
    "x": 0,
    "y": 0,
  },

  "constructor": function (canvas) {
    //console.log("Create State - constructor");
    this.canvas = canvas;
  },

  "start": function () {
    //console.log("CreateState - start");
    //console.log("shapeType: ", this.canvas.getShapeType());
    var that = this;
    //console.log("that.canvas.getLineColor(): ", that.canvas.getLineColor());
    var shape = Utils.ShapeFactory.createShape(this.canvas.getShapeType(), {
      "x": pjs.mouseX,
      "y": pjs.mouseY,
      "width": 0,
      "height": 0,
      "color": that.canvas.getColor(),
      "lineWeight": that.canvas.getLineWeight(),
      "lineStyle": that.canvas.getLineStyle(),
      "lineColor": that.canvas.getLineColor(),
      "selected": false,
    });
    shape.setResizePoint(LEFT_UP);
    this.canvas.setOverlayShape(shape);

    //console.log("overlayShape: ", this.canvas.getOverlayShape());
    //console.log("shape.getLineColor(): ", shape.getLineColor());

    this.canvas.getOverlayShape().setMaxCoords({
      "x": pjs.mouseX,
      "y": pjs.mouseY,
    });
  },

  "during": function () {
    this.canvas.getOverlayShape().resize();
  },

  "end": function () {
    this.canvas.setCurrentState(DEFAULT);
    this.canvas.saveOverlayShape();
  },

});