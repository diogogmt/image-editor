var MoveState = Base.extend({

  canvas: null,
  lastX: 0,
  lastY: 0,
  selectedShapes: [],

  "constructor": function (canvas) {
    this.canvas = canvas
  },

  "canMove": function () {
    var that = this;
    return {
      left: function () {
        // //console.log("canMove.left");
        // //console.log("that.movingShapes: ", that.movingShapes);

        return (that.movingShapes.min.x.getX() > 0)
          ? true
          : false;
      },
      up: function () {
        return (that.movingShapes.min.y.getY() > 0)
          ? true
          : false;
      },
      right: function () {
        return (that.movingShapes.max.x.getX() < pjs.width)
          ? true
          : false;
      },
      down: function () {
        return (that.movingShapes.max.y.getY() < pjs.height)
          ? true
          : false;
      },
    }
  },

  "movingShapes": {
    min: {
      x: null,
      y: null,
    },

    max: {
      x: null,
      y: null,
    }
  },

  // Move
  // Use shape array instead of shapes
  // start should get all the shapes that are selected
  // during should loop through the shapes array created in start
  "start": function (shape) {
    console.log("MoveState - start");
    this.state = MOVE;

    this.lastX = pjs.mouseX;
    this.lastY = pjs.mouseY;

    var i
      , shapes = this.canvas.getShapes()
      , end = shapes.length;
    for (i = 0; i < end; i++) {
      if (shapes[i].isSelected()) {
        this.selectedShapes.push(shapes[i]);
      }
    }

    end = this.selectedShapes.length;
    // Find the max and min XY for the shapes
    for (i = 0; i < end; i++) {
      shape = this.selectedShapes[i];
      dimension = shape.getDimensions();
      coords = shape.getCoords();

      // Find min X/Y shape
      if (!i) {
        this.movingShapes.min.x = shape;
      }
      else if ((coords.x < this.movingShapes.min.x)) {
        this.movingShapes.min.x = shape;
      }

      if (!i) {
        this.movingShapes.min.y = shape;
      }
      else if ((coords.y < this.movingShapes.min.y)) {
        this.movingShapes.min.y = shape;
      }

      // Find max X/Y shape
      if (!i) {
        this.movingShapes.max.x = shape;
      }
      else if (coords.x + dimension.width > this.movingShapes.max.x) {
        this.movingShapes.max.x = shape;
      }

      if (!i) {
        this.movingShapes.max.y = shape;
      }
      else if (coords.x + dimension.height > this.movingShapes.max.y) {
        this.movingShapes.max.y = shape;
      }
    }
  },

  "during": function () {
    //console.log("duruing move");
    var i ;
    var dimension;
    var shape;
    var end = this.selectedShapes.length;
    var coords = {
      "x": 0,
      "y": 0
    };
    var movingTo = {
      "left": false,
      "up": false,
      "right": false,
      "down": false,
    };


    // Find which direction the shape is moving to
    if (pjs.mouseX > this.lastX) {
      movingTo.right = true;
    }
    else if (pjs.mouseX < this.lastX) {
      movingTo.left = true;
    }

    if (pjs.mouseY > this.lastY) {
      movingTo.down = true;
    }
    else if (pjs.mouseY < this.lastY) {
      movingTo.up = true;
    }
    this.lastX = pjs.mouseX;
    this.lastY = pjs.mouseY;

    //console.log("tis.selectedShapes", this.selectedShapes);
    for (i = 0; i < end; i++) {
      //console.log("i: ", i);
      shape = this.selectedShapes[i];
      dimension = shape.getDimensions();
      coords = shape.getCoords();
      //console.log("shape: ", shape);

      if (movingTo.left && this.canMove().left()
        || movingTo.right && this.canMove().right()) {
        coords.x =  pjs.mouseX - (dimension.width / 2)
      }

      if (movingTo.up && this.canMove().up()
        || movingTo.down && this.canMove().down()) {
        coords.y  =  pjs.mouseY - (dimension.height / 2);
      }


      //console.log("coords: ", coords);
      shape.setCoords({
        "x": coords.x,
        "y": coords.y,
      });
    }
  },

  "end": function () {
    this.selectedShapes = [];
    this.state = DEFAULT;
  },

});