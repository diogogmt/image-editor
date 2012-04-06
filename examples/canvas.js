
(function (Utils)  {

  Utils.Canvas = {};
  var _canvas;
  // Canvas
  function Canvas () {
    console.log("canvas - constructor");

    var _shapes = []
      , _lineWeight
      , _lineStyle
      , _color
      , _shapeType
      , _currentState
      , _buffer
      , _states = []
      , _overlayShape = null;

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

    this.createShape = function (shape) {
      _shapes.push(shape);
      Utils.Controller.getInstance().perform("createShape",
        shape);
    };

    this.saveOverlayShape = function () {
      this.createShape(_overlayShape);
      _overlayShape = null;
    };

    this.deselectShapes = function () {
      var i;
      var end = _shapes.length;
      for (i = 0; i < end; i++) {
        _shapes[i].setSelected(false);
      }
    };

    this.isResize = function () {
      console.log("isResize");

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

      console.log("resizeFlag: ", resizeFlag);
      return resizeFlag;

    };

    this.isMove = function () {
      // console.log("isMove");
      var i;
      var end =  _shapes.length;
      var moveFlag = false;
      for (i = 0; i < end; i++) {
        shape = _shapes[i];
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

      console.log("moveFlag: ", moveFlag);
      console.log("this.shapes.length: ", _shapes.length);
      return moveFlag;

    };

    this.isCreate = function () {
      if (_currentState === CREATE) {
        return true;
      }
      return false;

    };

    this.determineState = function () {
      console.log("determineState");
      console.log("this.currentState: ", _currentState);
      if (this.isCreate()) {
        return CREATE;
      } else if (this.isResize()) {
        return RESIZE;
      } else if (this.isMove()) {
        return MOVE;
      }
      return DEFAULT;
    };

    this.draw = function () {
      // console.log("canvas draw");
      var i
        , end = _shapes.length;

      for (i = 0; i < end; i++) {
        _shapes[i].draw();
      }

      _overlayShape && _overlayShape.draw();
    };

    this.mousePressed = function () {
      console.log("Canvas - mousePressed");
      console.log("this.shapes.length: ", _shapes.length);
      console.log("this: ", this);

      // console.log("this.determineState(): ", this.determineState());
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










