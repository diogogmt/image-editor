var ResizeState = Base.extend({

  "canvas": null,
  "selectedShape": null,
  "beforeResize": null,
  "overlayShape": null,

  "constructor": function (canvas) {
    this.canvas = canvas
  },

  // Resize
  "start": function () {
    //console.log("ResizeState start")

    var shapeGroup = this.canvas.getShapeGroup();
    this.overlayShape = Utils.ShapeFactory.createShape(RECT, {
      "x": shapeGroup.getX(),
      "y": shapeGroup.getY(),
      "width": shapeGroup.getWidth(),
      "height": shapeGroup.getHeight(),
      "color": new Utils.Color(0,0,0),
      "lineWeight": 1,
      "lineStyle": null,
      "lineColor": new Utils.Color(0,0,0),
      "selected": false,
      "group": false,
      "overlay": true,
    });
    var corner = this.overlayShape.shouldResize();
    console.log("corner: ", corner);
    this.overlayShape.setResizePoint(corner);
    this.canvas.setOverlayShape(this.overlayShape);
    // console.log("overlayShape: ", this.overlayShape);
    //console.log("beforeResize: ", this.beforeResize);
    this.overlayShape.setMaxCoords();
    this.overlayShape.setMinCoords();
  },

  "during": function () {
    this.overlayShape.resize();
  },

  "end": function () {
    console.log("ResizeState - end");

    var oldShape = this.canvas.getSelectedShapes()[0];
    console.log("oldShape: ", oldShape);
    var afterResize = {
      "newCoords": this.overlayShape.getCoords(),
      "newDimensions": this.overlayShape.getDimensions()
    };

    this.canvas.setOverlayShape(null);
    this.canvas.resizeShape(oldShape, afterResize)
    console.log("this.overlayShape: ", this.overlayShape);
    // this.canvas.setCurrentState(DEFAULT);
  },

});
