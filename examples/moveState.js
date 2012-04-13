var MoveState = Base.extend({

  canvas: null,
  lastX: 0,
  lastY: 0,
  selectedShapes: [],
  moved: false,
  dx: null,
  dy: null,

  "constructor": function (canvas) {
    this.canvas = canvas
  },


  "start": function (shape) {
    ////console.log("MoveState - start");
    this.moved = false;
    

    var shape = this.canvas.getShapeGroup();
    var dimension = shape.getDimensions();
    var coords = shape.getCoords();
    dx = (coords.x + dimension.width) - pjs.mouseX;
    dy = (coords.y + dimension.height) - pjs.mouseY;

    this.lastX = coords.x;
    this.lastY = coords.y;

    ////console.log("dx, dy (" + dx + "," + dy + ")\n");
  },

  "during": function () {
    //console.log("MoveState - during");
    var i
      , dimension
      , shape
      , shapes = this.canvas.getSelectedShapes()
      , end = shapes.length;


    this.moved = true;

    shapeGroup = this.canvas.getShapeGroup();

    tempW = pjs.mouseX + dx;
    tempY = pjs.mouseY + dy;

    x = Math.abs(shapeGroup.getWidth() - tempW);
    y = Math.abs(shapeGroup.getHeight() - tempY);

    dx = (x + shapeGroup.getWidth()) - pjs.mouseX;
    dy = (y + shapeGroup.getHeight()) - pjs.mouseY;

    shapeGroup.setCoords({
      "x": x,
      "y": y,
    });

    ////console.log("shapeGroup.getX(): ", shapeGroup.getX());
    ////console.log("shapeGroup.getY(): ", shapeGroup.getY());
    ////console.log("this.lastX: ", this.lastX);
    ////console.log("this.lastY: ", this.lastY);

    var diff = {
      "x": shapeGroup.getX() - this.lastX,
      "y": shapeGroup.getY() - this.lastY
    };
    //console.log("diff x,y ("+diff.x+","+diff.y+")");

    for (i = 0; i < end; i++) {
      shape = shapes[i];
      shapeCoords = shape.getCoords();
      var newCoords = {
        "x": shapeCoords.x + diff.x,
        "y": shapeCoords.y + diff.y
      };
      shape.setCoords({
        "x": newCoords.x,
        "y": newCoords.y,
      });
    }
    // Not using. Maybe delete?
    this.lastX = shapeGroup.getX();
    this.lastY = shapeGroup.getY();
  },

  "end": function () {
    ////console.log("MoveState - end");
    ////console.log("moved: ", this.moved);
    // var shape;
    // if (!this.moved) {
    //   ////console.log("!this.moved");
    //   shape = this.canvas.getShapeBehindGroup();
    //   ////console.log("shape: ", shape);
    //   if (shape) {
    //     this.canvas.deselectShapes();
    //     shape.setSelected(true);
    //     this.canvas.addSelectedShape(shape);
    //     this.canvas.updateShapeGroup();
    //   }
    //   else {
    //     this.canvas.deselectShapes();
    //     this.canvas.updateShapeGroup();
    //   }
    // }
  },

});