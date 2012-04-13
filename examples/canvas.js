(function (Utils)  {

  Utils.Canvas = {};
  var _canvas;
  // Canvas
  function Canvas () {
    //////////console.log("canvas - constructor");

    var _shapes = []
      , _lineWeight = 1
      , _lineStyle
      , _lineColor = new Utils.Color(0,0,0)
      , _color
      , _shapeType
      , _currentState
      , _buffer
      , _states = []
      , _overlayShape = null
      , _shapeGroup = null
      , _selectedShapes = []
      , _shapeBehindGroup;

    _states[DEFAULT] = new DefaultState(this);
    _states[MOVE] = new MoveState(this);
    _states[CREATE] = new CreateState(this);
    _states[RESIZE] = new ResizeState(this);

    _currentState = DEFAULT;
    _color = new Utils.Color({
      "r": 255,
      "g": 255,
      "b": 255,
    })


    this.getShapeFromPointer = function() {
      //////console.log("Canvas - getShapeFromPointer");

      var i
        , end = _shapes.length
        , shape
        , msg = {
            "obj": null,
            "move": false,
            "resize": false,
            "group": false
        };

      for (i = 0; i < end; i++) {
        shape = _shapes[i];
        if (shape.shouldResize()) {
          msg.obj = shape;
          msg.resize = true;
          break;
        }
        else if (shape.isMouseOver()) {
          msg.obj = shape;
          msg.move = true;
          break;
        }
      }

      return msg;
    }

    this.addSelectedShape = function (shape) {
      ////console.log("Canvas - addSelectedShape");
      //////console.log("shape: ", shape);
      _selectedShapes.push(shape);
    };

    this.removeSelectedShape = function (shape) {
      console.log("Canvas - removeSelectedShape");
      _selectedShapes.forEach(function (element, index, array) {
        // //////////console.log("shape === element ? ", shape === element);
        if (shape === element) {
          console.log("removing shape");
          var s = _selectedShapes.splice(index, 1);
          console.log("s: ", s);

        }
      });
    };

    this.deselectShapes = function () {
      console.log("Canvas - deselectShapes");
      var i
        , end = _selectedShapes.length;

      for (i = 0; i < end; i++) {
        _selectedShapes[i].setSelected(false);
      }
      _selectedShapes = [];
    };

    this.addShape = function (shape) {
      //console.log("Canvas - addShape");
      _shapes.push(shape);
      if (shape.isSelected()) {
        _selectedShapes.push(shape);
      }
    };

    this.removeShape = function (shape) {
      console.log("Canvas - removeShape");
      _shapes.forEach(function (element, index, array) {
        console.log("shape === element ? ", shape === element);
        if (shape === element) {
          console.log("removing shape");

          _shapes.splice(index, 1);
        }
      });
    };

    this.updateShapeGroup = function () {
      console.log("Canvas - updateShapeGroup");
      console.log("_shapeGroup: ", _shapeGroup);
      console.log("_selectedShapes: ", _selectedShapes);

      var i
        , end = _selectedShapes.length
        , shape
        , group = null
        , bounds = {
            "x": null,
            "y": null,
            "width": null,
            "height": null,
          };

      if (!end) {
        console.log("** RETURNING");
        _shapeGroup = null;
        return;
      }

      for (i = 0; i < end; i++) {
        shape = _selectedShapes[i];
        dimension = shape.getDimensions();
        coords = shape.getCoords();
        // ////console.log("\ncoords x,y ("+coords.x+","+coords.y+")");
        // ////console.log("dim width,height ("+dimension.width+","+dimension.height+")");
        oldX = bounds.x;
        oldY = bounds.y;
        // Find min X/Y shape
        if (!i) {
          bounds.x = shape.getX();
        }
        else if ((coords.x < bounds.x)) {
          // ////console.log("coords.x < bounds.x")
          bounds.x = shape.getX();
        }

        if (!i) {
          bounds.y = shape.getY();
        }
        else if ((coords.y < bounds.y)) {
          // ////console.log("coords.y < bounds.y")
          bounds.y = shape.getY();
        }

        // Find max X/Y shape
        if (!i) {
          bounds.width = shape.getWidth();
        }
        else if (coords.x + dimension.width > bounds.width + oldX) {
          // ////console.log("coords.x + dimension.width > bounds.width + oldX")
          bounds.width = shape.getWidth() + shape.getX() - bounds.x;
        }
        else {
          bounds.width += oldX - bounds.x;
        }

        if (!i) {
          bounds.height = shape.getHeight();
        }
        else if (coords.y + dimension.height > bounds.height + oldY) {
          // ////console.log("coords.y + dimension.height > bounds.height = oldY")
          bounds.height = shape.getHeight() + shape.getY() - bounds.y;
        }
        else {
          bounds.height += oldY - bounds.y;
        }
      }

      // ////console.log("bounds x,y ("+bounds.x+","+bounds.y+")");
      // ////console.log("bounds width,height ("+bounds.width+","+bounds.height+")");
      _shapeGroup = Utils.ShapeFactory.createShape(RECT, {
          "x": bounds.x,
          "y": bounds.y,
          "width": bounds.width,
          "height": bounds.height,
          "color": null,
          "lineWeight": null,
          "lineStyle": null,
          "lineColor": null,
          "selected": true,
          "group": true,
        });
    }

    this.saveOverlayShape = function () {
      _overlayShape.setSelected(true);
      Utils.Controller.getInstance().perform("createShape",
        _overlayShape);

      _overlayShape = null;
    };

    this.resizeShape = function (shape, options) {
      //console.log("Canvas - resizeShape")
      // //console.log("shape: ", shape);
      Utils.Controller.getInstance().perform("resizeShape",
        [shape, options]);
    };


    this.isResize = function () {
      //////////console.log("isResize");

      var i;
      var end = _shapes.length;
      var shape = null;
      var resizeFlag = false;

      for (i = 0; i < end; i++) {
        shape = _shapes[i];
        // Only selected shapes should be resizable
        resizeFlag = shape.shouldResize({
          "x": pjs.mouseX,
          "y": pjs.mouseY,
        });

        if (resizeFlag) break;

      }
      if (resizeFlag && end > 1) {
        _shapes = null;
        _shapes.push(shape);
      }

      //////////console.log("resizeFlag: ", resizeFlag);
      return resizeFlag;

    };

    this.isMove = function () {
      //////console.log("isMove");
      var i;
      var end =  _shapes.length;
      var moveFlag = false;

      if (_shapeGroup) {
        if (_shapeGroup.isMouseOver()) {
          return true;
        }
      }

      for (i = 0; i < end; i++) {
        shape = _shapes[i];
        if(shape.isMouseOver()) {
          moveFlag = true;
          if (!shape.isSelected()) {
            if (pjs.keyCode !== 17) {
              this.deselectShapes();
            }
            shape.setSelected(true);
            this.addToShapeGroup(shape);
          }
        }
      }

      //////////console.log("moveFlag: ", moveFlag);
      //////////console.log("this.shapes.length: ", _shapes.length);
      return moveFlag;

    };

    this.isCreate = function () {
      if (_currentState === CREATE) {
        return true;
      }
      return false;

    };

    this.determineMove = function (shape) {
      ////console.log("Canvas - determineMove");
      if (CTRL_KEY === pjs.keyCode && !shape.isSelected()) {
        ////console.log("CTRL_KEY === pjs.keyCode && !shape.isSelected()");
        shape.setSelected(true);
        this.addSelectedShape(shape);
        this.updateShapeGroup();
      }
      else if (CTRL_KEY === pjs.keyCode && shape.isSelected()) {
        ////console.log("CTRL_KEY === pjs.keyCode && shape.isSelected()")
        shape.setSelected(false);
        this.removeSelectedShape(shape);
        this.updateShapeGroup();
      }
      else if (CTRL_KEY !== pjs.keyCode) {
        // //console.log("CTRL_KEY !== pjs.keyCode");
        // //console.log("this.getSelectedShapes().length: ", this.getSelectedShapes().length);
        if (!this.getSelectedShapes().length) {
          shape.setSelected(true);
          this.addSelectedShape(shape);
          this.updateShapeGroup();
        }
        else if (!shape.isSelected()) {
          this.deselectShapes();
          this.removeSelectedShape();
          shape.setSelected(true);
          this.addSelectedShape(shape);
          this.updateShapeGroup();
        }
        // this.deselectShapes();
        // _shapeBehindGroup = shape;
      }
    }

    this.determineState = function () {
      ////console.log("Canvas - determineState");
      ////console.log("this.currentState: ", _currentState);
      if (this.isCreate()) {
        return CREATE;
      }
      shape = this.getShapeFromPointer();
      ////console.log("shape: ", shape);
     if (!shape.obj) {
        ////console.log("!shape.obj");
        this.deselectShapes();
        this.updateShapeGroup();
        return DEFAULT;
      }
      else if (shape.resize) {
        return RESIZE;
      }
      else if (shape.move) {
        this.determineMove(shape.obj);
        return MOVE;
      }
    };

    this.draw = function () {
      // //////////console.log("canvas draw");
      var i
        , end = _shapes.length;

      _shapeGroup && _shapeGroup.drawGroup();


      for (i = 0; i < end; i++) {
        _shapes[i].draw();
      }

      _shapeGroup && _shapeGroup.drawResizeArea();

      _overlayShape && _overlayShape.draw();
    };

    this.mousePressed = function () {
      //////////console.log("Canvas - mousePressed");
      //////////console.log("this.shapes.length: ", _shapes.length);
      //////////console.log("this: ", this);

      // //////////console.log("this.determineState(): ", this.determineState());
      this.setCurrentState(this.determineState());

      _states[_currentState].start();
    };

    this.mouseDragged = function () {
      _states[_currentState].during();
    };

    this.mouseReleased = function () {
      // //////console.log("Canvas - mouseReleased");
      // //////console.log("keyCode: ", pjs.keyCode);
      _states[_currentState].end();
    };

    this.getShapes = function () {
      return _shapes;
    };

    this.getSelectedShapes = function () {
      return _selectedShapes;
    };

    this.getShapeGroup = function () {
      return _shapeGroup;
    };

    this.getShapeBehindGroup = function () {
      return _shapeBehindGroup;
    };

    this.getLineWeight = function () {
      return _lineWeight;
    };

    this.getLineStyle = function () {
      return _lineStyle;
    };

    this.getLineColor = function () {
      return _lineColor;
    };

    this.getColor = function () {
      return _color;
    };

    this.getShapeType = function () {
      return _shapeType;
    };

    this.getCurrentState = function () {
      return _currentState;
    };

    this.getBuffer = function () {
      return _buffer;
    };

    this.getStates = function () {
      return _states;
    };

    this.getOverlayShape = function () {
      return _overlayShape;
    };


    // Setters
    this.setShapes = function (aShapes) {
      _shapes = aShapes;
    };

    this.setShapeBehindGroup = function (aShapeBehindGroup) {
      _shapeBehindGroup = aShapeBehindGroup;
    };

    this.setSelectedShapes = function (aSelectedShapes) {
      _selectedShapes = aSelectedShapes;
    };

    this.setShapeGroup = function (aShapeGroup) {
      _shapeGroup = aShapeGroup;
    };

    this.setLineWeight = function (aLineWeight) {
      _lineWeight = aLineWeight;
    };

    this.setLineStyle = function (aLineStyle) {
      _lineStyle = aLineStyle;
    };

    this.setLineColor = function (aLineColor) {
      _lineColor = aLineColor;
    };

    this.setColor = function (aColor) {
      _color = aColor;
    };

    this.setShapeType = function (aShapeType) {
      _shapeType = aShapeType;
    };

    this.setCurrentState = function (aCurrentState) {
      _currentState = aCurrentState;
      switch (aCurrentState) {
        case DEFAULT:
        case CREATE:
          this.deselectShapes();
          this.removeSelectedShape();
          this.updateShapeGroup();
          break;
      }
    };

    this.setBuffer = function (aBuffer) {
      _buffer = aBuffer;
    };

    this.setStates = function (aStates) {
      _states = aStates;
    };

    this.setOverlayShape = function (aShape) {
      _overlayShape = aShape;
    };

  }



  Utils.Canvas.getInstance = function() {
    if (!_canvas){
      _canvas = new Canvas();
    } //if
    return _canvas;
  } //getInstance

}(window.Utils));
