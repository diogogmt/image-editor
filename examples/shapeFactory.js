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
          shape = new Rect(options);
          break;
        case CIRCLE:
          shape = new Circle(options);
          break;
        case TRIANGLE:
          shape = new Triangle(options);
          break;
        case LINE:
          shape = new Line(options);
          break;
      }
      return shape;
    };
  }
  Utils.ShapeFactory = new ShapeFactory();
})(window.Utils);