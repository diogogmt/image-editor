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
    console.log("MoveState - start");
    this.moved = false;
    

    var shape = this.canvas.getShapeGroup();
    var dimension = shape.getDimensions();
    var coords = shape.getCoords();
    dx = (coords.x + dimension.width) - pjs.mouseX;
    dy = (coords.y + dimension.height) - pjs.mouseY;

    this.lastX = coords.x;
    this.lastY = coords.y;

    console.log("dx, dy (" + dx + "," + dy + ")\n");
  },

  "during": function () {
    //console.log("MoveState - during");
    var i
      , dimension
      , shape
      , shapes = this.canvas.getSelectedShapes()
      , end = shapes.length;


    this.moved = true;

    for (i = 0; i < end; i++) {
      shape = shapes[i];
      dimension = shape.getDimensions();
      coords = shape.getCoords();
      shapeGroup = this.canvas.getShapeGroup();

      console.log("\n**coords x,y (" + coords.x + "," +
        coords.y + ")");
      console.log("dim w,h (" + dimension.width + "," +
        dimension.height + ")");
      console.log("pjs x,y (" + pjs.mouseX + "," +
        pjs.mouseY + ")");
      console.log("pjs w,h (" + pjs.width + "," +
        pjs.height + ")");

      tempW = pjs.mouseX + dx;
      tempY = pjs.mouseY + dy;

      x = Math.abs(dimension.width - tempW);
      y = Math.abs(dimension.height - tempY);

      dx = (x + dimension.width) - pjs.mouseX;
      dy = (y + dimension.height) - pjs.mouseY;
      console.log("tempW, tempH (" + tempW + "," +
        tempY + ")");
      console.log("dx, dy (" + dx + "," + dy + ")\n");
      console.log("x, y (" + x + "," + y + ")");

      sx = coords.x;
      sy = coords.y;

      sx += Math.abs(shapeGroup.getX() - this.lastX);
      sy += Math.abs(shapeGroup.getY() - this.lastY);
      console.log("sx, sy (" + sx + "," + sy + ")");

      shape.setCoords({
        "x": x,
        "y": y,
      });
      shapeGroup.setCoords({
        "x": x,
        "y": y,
      });
    }

    // Not using. Maybe delete?
    this.lastX = shapeGroup.getX();
    this.lastY = shapeGroup.getY();
  },

  "end": function () {
    console.log("MoveState - end");
    console.log("moved: ", this.moved);
    // var shape;
    // if (!this.moved) {
    //   console.log("!this.moved");
    //   shape = this.canvas.getShapeBehindGroup();
    //   console.log("shape: ", shape);
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