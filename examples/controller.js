(function (Utils) {

  Utils.Controller = {};

  var _controller;
  function Controller () {
    var _undoManager = Utils.UndoManager.getInstance();
    var _canvas = Utils.Canvas.getInstance();

    var _actions = {
      "setCanvasState": function (aState, aShapeType) {
        //console.log("Controller - setCanvasState");
        //console.log("aState: ", aState);
        //console.log("aShapeType: ", aShapeType);

        _canvas.setCurrentState(aState);
        aShapeType && _canvas.setShapeType(aShapeType);
      },

      "setColor": function (color) {
        //console.log("Controller - setColor");
        //console.log("color: ", color);
        _canvas.setColor(color);

        var shapes = _canvas.getSelectedShapes();
        if (shapes.length) {
          var command = new SetColorCommand(shapes, color);
          command.execute();
          _undoManager.register(command);
        }
      },

      "setLineWeight": function (aWeight) {
        console.log("Controller - setLineWeight");
        console.log("aWeight: ", aWeight);
        _canvas.setLineWeight(aWeight);

        var shapes = _canvas.getSelectedShapes();
        if (shapes.length) {
          var command = new SetLineWeightCommand(shapes, aWeight);
          command.execute();
          _undoManager.register(command);
        }
      },

      "createShape": function (shape) {
        //console.log("Controller - createShape");
        //console.log("shape: ", shape);
        var command = new CreateShapeCommand(_canvas, shape);
        command.execute();
        _undoManager.register(command);
      },

      "resizeShape": function (shape, options) {
        //console.log("Controller - resizeShape");
        //console.log("shape: ", shape);
        //console.log("shape: ", options);
        options.canvas = _canvas;
        var command = new ResizeShapeCommand(shape, options);
        command.execute();
        _undoManager.register(command);
      },

      "deleteShape": function () {
        console.log("Controller - delteShape");
        //console.log("shape: ", shape);
        var command = new DeleteShapeCommand(_canvas);
        command.execute();
        _undoManager.register(command);
      },
    };

  this.perform = function (action, options) {
    //console.log("Controller - perform");
    //console.log("action: ", action);
    //console.log("options: ", options);
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
