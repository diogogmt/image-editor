var ResizeState = Base.extend({

  "canvas": null,
  "selectedShape": null,

  "constructor": function (canvas) {
    this.canvas = canvas
  },

  // Resize
  "start": function () {
    console.log("ResizeState start")
    var i;
    var end = canvas.shapes.length;
    for (i = 0; i < end; i++) {
      if (canvas.shapes[i].isSelected()) {
        this.selectedShape = canvas.shapes[i];
        break;
      }
    }

    console.log("this.selectedShape.setMaxCoords\n\n");
    this.selectedShape.setMaxCoords();
    this.selectedShape.setMinCoords();
  },

  "during": function () {
    this.selectedShape.resize();

  },

  "end": function () {
    canvas.setCurrentState(DEFAULT);
  },

});
