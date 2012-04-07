var ResizeState = Base.extend({

  "canvas": null,
  "selectedShape": null,
  "beforeResize": null,

  "constructor": function (canvas) {
    this.canvas = canvas
  },

  // Resize
  "start": function () {
    //console.log("ResizeState start")
    var i
      , shapes = this.canvas.getShapes()
      , end = shapes.length
      , shape;
    for (i = 0; i < end; i++) {
      if (shapes[i].isSelected()) {
        this.selectedShape = shapes[i];
        break;
      }
    }
    shape = this.selectedShape;
    ss = shape;
    this.beforeResize = {
      "oldCoords": shape.getCoords(),
      "oldDimensions": shape.getDimensions(),
    };
    //console.log("shape: ", shape);
    //console.log("beforeResize: ", this.beforeResize);
    shape.setMaxCoords();
    shape.setMinCoords();
  },

  "during": function () {
    this.selectedShape.resize();

  },

  "end": function () {
    //console.log("ResizeState - end");
    //console.log("this.selectedShape: ", this.selectedShape);
    //console.log("beforeResize: ", this.beforeResize);
    this.canvas.resizeShape(this.selectedShape, beforeResize)
    this.canvas.setCurrentState(DEFAULT);
  },

});
