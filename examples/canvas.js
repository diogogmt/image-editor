
(function (Utils)  {

  Utils.Canvas = {};
  var _canvas;
  // Canvas
  function Canvas () {
    ////console.log("canvas - constructor");

    var _shapes = []
      , _lineWeight
      , _lineStyle
      , _lineColor = new Utils.Color(0,0,0)
      , _color
      , _shapeType
      , _currentState
      , _buffer
      , _states = []
      , _overlayShape = null
      , _shapeGroup = null;

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

    this.getSelectedShapes = function () {
      ////console.log("Canvas - setSelectedShapesColor");
      var end = _shapes.length
        , selectedShapes = [];
      for (i = 0; i < end; i++) {
        if (_shapes[i].isSelected()) {
          selectedShapes.push(_shapes[i]);
        }
      }
      return selectedShapes;
    };

    this.addShape = function (shape) {
      ////console.log("Canvas - addShape");
      _shapes.push(shape);
    };

    this.removeShape = function (shape) {
      ////console.log("Canvas - removeShape");
      _shapes.forEach(function (element, index, array) {
        // ////console.log("shape === element ? ", shape === element);
        if (shape === element) {
          // ////console.log("removing shape");
          _shapes.splice(index, 1);
        }
      });
    };

    this.addToShapeGroup = function (shape) {
      console.log("Canvas - addToShapeGroup");
      console.log("!_shapeGroup: ", !_shapeGroup);
      if (!_shapeGroup) {
        _shapeGroup = Utils.ShapeFactory.createShape(RECT, {
          "x": shape.getX(),
          "y": shape.getY(),
          "width": shape.getWidth(),
          "height": shape.getHeight(),
          "color": this.getColor(),
          "lineWeight": this.getLineWeight(),
          "lineStyle": this.getLineStyle(),
          "lineColor": this.getLineColor(),
          "selected": true,
        });
      }
      else {
        // Find min X/Y shape
        console.log("_shapeGroup xy("+_shapeGroup.getX()+","+
          _shapeGroup.getY()+")");
        console.log("_shapeGroup width,height("+_shapeGroup.getWidth()+","+
          _shapeGroup.getHeight()+")");


        console.log("shape xy("+shape.getX()+","+
          shape.getY()+")");
        console.log("shape width,height("+shape.getWidth()+","+
          shape.getHeight()+")");

        var group = {
          "x": _shapeGroup.getX(),
          "y": _shapeGroup.getY(),
          "w": _shapeGroup.getWidth(),
          "h": _shapeGroup.getHeight(),
        };

        var single = {
          "x": shape.getX(),
          "y": shape.getY(),
          "w": shape.getWidth(),
          "h": shape.getHeight(),
        }

        if (single.x < group.x) {
          _shapeGroup.setWidth((group.x + group.w) - single.x);
          _shapeGroup.setX(single.x);
        }
        else {
          _shapeGroup.setWidth((single.x + single.w) - group.x);
        }

        if (single.y < group.y) {
          _shapeGroup.setHeight((group.y + group.h) - single.y);
          _shapeGroup.setY(single.y);
        }
        else {
          _shapeGroup.setHeight((single.y + single.h) - group.y);
        }

        console.log("_shapeGroup xy("+_shapeGroup.getX()+","+
          _shapeGroup.getY()+")");
        console.log("_shapeGroup width,height("+_shapeGroup.getWidth()+","+
          _shapeGroup.getHeight()+")");
      }
    }

    this.saveOverlayShape = function () {
      Utils.Controller.getInstance().perform("createShape",
        _overlayShape);
      _overlayShape = null;
    };

    this.resizeShape = function (shape, options) {
      //console.log("Canvas - resizeShape")
      Utils.Controller.getInstance().perform("resizeShape",
        [shape, options]);
    };

    this.deselectShapes = function () {
      var i;
      var end = _shapes.length;
      for (i = 0; i < end; i++) {
        _shapes[i].setSelected(false);
      }
      _shapeGroup = null;
    };

    this.isResize = function () {
      ////console.log("isResize");

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

      ////console.log("resizeFlag: ", resizeFlag);
      return resizeFlag;

    };

    this.isMove = function () {
      console.log("isMove");
      var i;
      var end =  _shapes.length;
      var moveFlag = false;
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
          else {
            break;
          }
        }
      }

      ////console.log("moveFlag: ", moveFlag);
      ////console.log("this.shapes.length: ", _shapes.length);
      return moveFlag;

    };

    this.isCreate = function () {
      if (_currentState === CREATE) {
        return true;
      }
      return false;

    };

    this.determineState = function () {
      ////console.log("determineState");
      ////console.log("this.currentState: ", _currentState);
      if (this.isCreate()) {
        return CREATE;
      } else if (this.isResize()) {
        return RESIZE;
      } else if (this.isMove()) {
        return MOVE;
      }
      this.deselectShapes();
      return DEFAULT;
    };

    this.draw = function () {
      // ////console.log("canvas draw");
      var i
        , end = _shapes.length;

      _shapeGroup && _shapeGroup.draw();

      for (i = 0; i < end; i++) {
        _shapes[i].draw();
      }

      _overlayShape && _overlayShape.draw();
    };

    this.mousePressed = function () {
      ////console.log("Canvas - mousePressed");
      ////console.log("this.shapes.length: ", _shapes.length);
      ////console.log("this: ", this);

      // ////console.log("this.determineState(): ", this.determineState());
      this.setCurrentState(this.determineState());

      _states[_currentState].start();
    };

    this.mouseDragged = function () {
      _states[_currentState].during();
    };

    this.mouseReleased = function () {
      _states[_currentState].end();
    };


    this.getShapes = function () {
      return _shapes;
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










