const DEFAULT = 1
  , MOVE = 2
  , CREATE = 3
  , RESIZE = 4;


var Color = Base.extend({
  r: 0,
  g: 0,
  b: 0,

  constructor: function (opt) {
    this.r = (opt && opt.r) || 255;
    this.g = (opt && opt.g) || 255;
    this.b = (opt && opt.b) || 255;
  },

  toString: function () {
    console.log(this.r + "," + this.g + "," + this.b);
  },
});


var Canvas = Base.extend({
  "shapes": new Array(),
  "lineWeight": 0,
  "lineStyle": 0,
  "color": null,
  "shapeType": "",
  "currentState": 0,
  "buffer": null,
  "states": new Array(),

  "constructor": function () {
    this.states[DEFAULT] = new DefaultState(this);
    this.states[MOVE] = new MoveState(this);
    this.states[CREATE] = new CreateState(this);
    this.states[RESIZE] = new ResizeState(this);

  },

  "setCurrentState": function (state) {
    this.currentState = state;
  },

  // Create
  "create": function (shapeType) {
    canvas.setCurrentState(CREATE);
    this.shapeType = shapeType;
  },

  "deselectShapes": function () {
    var i;
    var end = this.shapes.length;
    for (i = 0; i < end; i++) {
      this.shapes[i].setSelected(false);
    }
  },

  "isResize": function () {
    console.log("isResize");

    var i;
    var end = this.shapes.length;
    var shape = null;
    var resizeFlag = false;

    for (i = 0; i < end; i++) {
      shape = this.shapes[i];
      // Only selected shapes should be resizable
      resizeFlag = shape.shouldResize({
        "x": pjs.mouseX,
        "y": pjs.mouseY,
      });

      if (resizeFlag) break;

    }
    if (resizeFlag && end > 1) {
      this.shapes = null;
      this.shapes.push(shape);
    }

    console.log("resizeFlag: ", resizeFlag);
    return resizeFlag;

  },

  "isMove": function () {
    // console.log("isMove");
    var i;
    var end =  this.shapes.length;
    var moveFlag = false;
    for (i = 0; i < end; i++) {
      shape = this.shapes[i];
      if(shape.isMouseOver()) {
        moveFlag = true;
        if (!shape.isSelected) {
          this.deselectShapes();
          this.shape.setSelected(true);
        } else {
          break;
        }
      }
    }

    // console.log("moveFlag: ", moveFlag);
    // console.log("this.shapes.length: ", this.shapes.length);
    return moveFlag;

  },

  "isCreate": function () {
    if (this.currentState === CREATE) {
      return true;
    }
    return false;

  },

  "determineState": function () {
    console.log("determineState");
    console.log("this.currentState: ", this.currentState);
    if (this.isCreate()) {
      return CREATE;
    } else if (this.isResize()) {
      return RESIZE;
    } else if (this.isMove()) {
      return MOVE;
    }
    return DEFAULT;
  },

  "draw": function () {
    // console.log("canvas draw");
    var i
      , end = this.shapes.length;

    for (i = 0; i < end; i++) {
      this.shapes[i].draw();
    }
  },

  mousePressed: function () {
    this.setCurrentState(this.determineState());
              console.log("this.shapes.length: ", this.shapes.length);

    this.states[this.currentState].start();

  },

  mouseDragged: function () {
    this.states[this.currentState].during();
  },

  mouseReleased: function () {
    this.states[this.currentState].end();
  },

});


var DefaultState = Base.extend({

  "constructor": function () {
  },

  "start": function () {
    return false;
  },

  "during": function () {
    return false;
  },

  "end": function () {
    return false;
  },
});


var CreateState = Base.extend({

  "canvas": null,
  "overlayShape": null,
  "startCoords": {
    "x": 0,
    "y": 0,
  },

  "constructor": function (canvas) {
    this.canvas = canvas
  },

  "start": function () {
    this.overlayShape = new Shape({
      "type": canvas.shapeType,
      "x": pjs.mouseX,
      "y": pjs.mouseY,
      "width": 0,
      "height": 0,
      "color": canvas.color,
      "lineWeight": canvas.lineWeight,
      "lineStyle": canvas.lineStyle
    });
    this.overlayShape.setMaxCoords({
      "x": pjs.mouseX,
      "y": pjs.mouseY,
    });
  },

  "during": function () {
    this.overlayShape.resize();
  },

  "end": function () {
    canvas.setCurrentState(DEFAULT);
    Controller.createShape(this.overlayShape);
  },

});


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



var MoveState = Base.extend({

  canvas: null,
  lastX: 0,
  lastY: 0,
  "selectedShapes": new Array(),

  "constructor": function (canvas) {
    this.canvas = canvas
  },

  "canMove": function () {
    var that = this;
    return {
      left: function () {
        // console.log("canMove.left");
        // console.log("that.movingShapes: ", that.movingShapes);

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
    this.state = MOVE;

    this.lastX = pjs.mouseX;
    this.lastY = pjs.mouseY;

    var i;
    var end = canvas.shapes.length;
    for (i = 0; i < end; i++) {
      if (canvas.shapes[i].isSelected()) {
        this.selectedShapes.push(canvas.shapes[i]);
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
      else if ((coords.x < min.x)) {
        this.movingShapes.min.x = shape;
      }

      if (!i) {
        this.movingShapes.min.y = shape;
      }
      else if ((coords.y < min.y)) {
        this.movingShapes.min.y = shape;
      }

      // Find max X/Y shape
      if (!i) {
        this.movingShapes.max.x = shape;
      }
      else if (coords.x + dimension.width > max.x) {
        this.movingShapes.max.x = shape;
      }

      if (!i) {
        this.movingShapes.max.y = shape;
      }
      else if (coords.x + dimension.height > max.y) {
        this.movingShapes.max.y = shape;
      }
    }
  },

  "during": function () {
    // console.log("duruing move");
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

    for (i = 0; i < end; i++) {
      shape = this.selectedShapes[i];
      dimension = shape.getDimensions();
      coords = shape.getCoords();
      if (movingTo.left && this.canMove().left()
        || movingTo.right && this.canMove().right()) {
        coords.x =  pjs.mouseX - (dimension.width / 2)
      }

      if (movingTo.up && this.canMove().up()
        || movingTo.down && this.canMove().down()) {
        coords.y  =  pjs.mouseY - (dimension.height / 2);
      }

      // console.log("coords: ", coords);
      shape.setCoords({
        "x": coords.x,
        "y": coords.y,
      });
    }
  },

  "end": function () {
    this.state = DEFAULT;
  },

});