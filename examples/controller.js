(function (Utils) {

  Utils.Controller = {};

  var _controller;
  function Controller () {
    var _undoManager = Utils.UndoManager.getInstance();
    var _canvas = Utils.Canvas.getInstance();

    var _actions = {
      "setCanvasState": function (aState, aShapeType) {
        console.log("Controller - setCanvasState");
        console.log("aState: ", aState);
        console.log("aShapeType: ", aShapeType);

        _canvas.setCurrentState(aState);
        aShapeType && _canvas.setShapeType(aShapeType);
      },

      "createShape": function (shape) {
        console.log("Controller - createShape");
        console.log("shape: ", shape);
      },
    };

  this.perform = function (action, options) {
    console.log("Controller - perform");
    console.log("action: ", action);
    console.log("options: ", options);
    if (_actions[action] && 'function' == typeof _actions[action]) {
      var opts = Array.isArray(options)
        ? options
        : [options];
      _actions[action].apply(this, opts);
    }
  };
};


  Utils.Controller.getInstance = function() {
    if (!_controller){
      _controller = new Controller();
    } //if
    return _controller;
  } //getInstance

}(window.Utils));



// setColor
// setShapeType
// setLineStyle
// setLineWeight

// setSelectedShapesColor

// setSelectMode



// createShape
// deleteShape
// setShapeColor
// setShapeLineWeight
// setShapeLineStyle
// createShapeGroup
// resizeShape
// paste
// move
