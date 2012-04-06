(function (Utils)  {
  Utils.ShapeFactory = {};
  function ShapeFactory () {
    this.createShape = function (aType, options) {
      console.log("shapeFactory - createShape");
      console.log("aType: ", aType);
      console.log("options: ", options);
      var shape;
      switch (aType) {
        case RECT:
          shape = new Rect(options);
      }
      return shape;
    };
  }
  Utils.ShapeFactory = new ShapeFactory();
})(window.Utils);