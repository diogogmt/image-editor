(function (Utils)  {
  Utils.ShapeFactory = {};
  function ShapeFactory () {
    this.createShape = function (aType, options) {
      //console.log("shapeFactory - createShape");
      //console.log("aType: ", aType);
      //console.log("options: ", options);
      var shape;
      switch (aType) {
        case RECT:
          options.type = RECT;
          shape = new Rect(options);
          break;
        case CIRCLE:
          options.type = CIRCLE;
          shape = new Circle(options);
          break;
        case TRIANGLE:
          options.type = TRIANGLE;
          shape = new Triangle(options);
          break;
        case LINE:
          options.type = LINE;
          shape = new Line(options);
          break;
      }
      return shape;
    };
  }
  Utils.ShapeFactory = new ShapeFactory();
})(window.Utils);