(function() {

  Color = Base.extend({
    r: 0,

    g: 0,

    b: 0,

    constructor: function (r,g,b) {
      console.log("Color constructor");
      this.r = r;
      this.g = g;
      this.b = b;
    },

  });



  zindex = 0;
  // Shape class
  Shape = Base.extend({
    x: 0,

    y: 0,

    step: 0,

    xoffset: 0,

    yoffset: 0,

    color: null,

    zindex: 0,

    constructor: function (opt) {
      console.log("Shape constructor");
      if (opt && "color" in opt) {
        this.color = opt.color;
      }
      else {
        this.color = new Color(255, 0, 0);
      }
      console.log("this.color");
      console.log(this.color);
      this.zindex = zindex++;
      console.log("zindex: " + zindex);
      console.log("this.zindex: " + this.zindex);
    },

    

    mousePressed: function () {
      // console.log("mousePressed");
      // console.log(this);
    },

    mouseReleased: function () {
      // console.log("mouseReleased");
      // console.log(this);
      this.x += this.xoffset;
      this.y += this.yoffset;
      this.xoffset = 0;
      this.yoffset = 0;
    },

    mouseDragged: function (mx, my) {
      // console.log("mouseDragged");
      // console.log(this);
      this.xoffset = mx - this.x;
      this.yoffset = my - this.y;
      console.log("x: " + this.x);
      console.log("y: " + this.y);
      console.log("mx: " + mx);
      console.log("my: " + my);
    },
  }); // End Shape



  // Circle class
  Circle = Shape.extend({
    constructor: function (x, y, r) {
      this.x = x;
      this.y = y;
      this.radius = r;
      this.base({
        "color": new Color(255, 0, 0),
      });
    },

    radius: 0,

    draw: function () {
      // console.log("Circle draw");
      // console.log(this);
      pjs.fill(this.color.r, this.color.g, this.color.b);
      pjs.ellipse(this.x + this.xoffset, this.y + this.yoffset, this.radius, this.radius);
    },

    mouseOver: function  (mx, my) {
      console.log("Circle mouseOver");
      console.log("this.x: " + this.x);
      console.log("this.y: " + this.y);
      console.log("mx: " + mx);
      console.log("my" + my);
      var num = (this.x - mx) * (this.x - mx) + (this.y - my) * (this.y - my);
      var squareRoot = Math.sqrt(num);
      console.log("num: " + num);
      console.log("squareRoot: " + squareRoot);
      console.log("radius: " + this.radius);
      return squareRoot <= this.radius / 2;
    },
  }); // End Circle


  // Rect class
  Rect = Shape.extend({
    constructor: function (x, y, w, h) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.base({
        "color": new Color(0, 0, 255),
      });
    },

    width: 0,

    height: 0,

    draw: function () {
      // console.log("Rect draw");
      pjs.fill(this.color.r, this.color.g, this.color.b);
      pjs.rect(this.x + this.xoffset, (this.y - this.height / 2) + this.yoffset, this.width, this.height);
    },

    mouseOver: function  (mx, my) {
      console.log("Rect mouseOver");
      // console.log("x: " + this.x);
      // console.log("y: " + this.y);
      // console.log("mx: " + mx);
      // console.log("my: " + my);
      // console.log("width: " + this.width);
      // console.log("height: " + this.height);

      // console.log((this.x <= mx && mx <= this.x + this.width && (this.y - this.height / 2) <= my && my <= (this.y + this.height / 2)));
      // this.x <= mx
      // mx <= this.x + this.width
      // (this.y - this.height / 2) <= my
      // my <= (this.y + this.height / 2);
      return this.x <= mx && mx <= this.x + this.width && (this.y - this.height / 2) <= my && my <= (this.y + this.height / 2);
    },
  }); // End Rect


  // Triangle class
  Triangle = Shape.extend({
    constructor: function (x1, y1, x2, y2, x3, y3) {
      this.coords = {
        x: [
          x1,
          x2,
          x3,
        ],
        y: [
          y1,
          y2,
          y3,
        ],
      };

      this.coordsOffset = {
        x: [
          0,
          0,
          0,
        ],
        y: [
          0,
          0,
          0,
        ],
      };
      this.base({
        "color": new Color(255, 255, 0),
      });
    },

    coords: null,

    coordsOffset: null,

    xOffset: 0,

    yOffset: 0,

    draw: function () {
      // console.log("Triangle draw");
      pjs.fill(this.color.r, this.color.g, this.color.b);
      pjs.triangle(this.coords["x"][0] + this.xOffset, this.coords["y"][0] + this.yOffset,
        this.coords["x"][1] + this.xOffset, this.coords["y"][1] + this.yOffset,
        this.coords["x"][2] + this.xOffset, this.coords["y"][2] + this.yOffset);
    },

    mouseOver: function  (mx, my) {
      console.log("Triangle mouseOver");

      var maxX = Math.max.apply( Math, this.coords["x"] );
      // console.log("maxX: " + maxX);

      var minX = Math.min.apply( Math, this.coords["x"] );
      // console.log("minX: " + minX);

      var maxY = Math.max.apply( Math, this.coords["y"] );
      // console.log("maxY: " + maxY);

      var minY = Math.min.apply( Math, this.coords["y"] );
      // console.log("minY: " + minY);

      if (mx > maxX || mx < minX ||
          my > maxY || my < minY) {
        console.log("returning false");
        return false;
      }
      console.log("returning true");
      return true;
    },

    mouseReleased: function () {
      console.log("mouseReleased");

      this.coords["x"][0] += this.xOffset;
      this.coords["x"][1] += this.xOffset;
      this.coords["x"][2] += this.xOffset;

      this.coords["y"][0] += this.yOffset;
      this.coords["y"][1] += this.yOffset;
      this.coords["y"][2] += this.yOffset;

      this.xOffset = 0;
      this.yOffset = 0;
    },

    mouseDragged: function (mx, my) {
      console.log("Triangle mouseDragged");
      // console.log(this);


      this.xOffset = mx - this.coords["x"][1]
      this.yOffset = my - this.coords["y"][1];

      console.log("mouseXY("+mx+","+my+")");

      console.log("x("+this.coords["x"][0]+","+this.coords["x"][1]+","+this.coords["x"][2] + ")");
      console.log("y("+this.coords["y"][0]+","+this.coords["y"][1]+","+this.coords["y"][2] + ")");

      console.log("offsetX("+this.xOffset+","+this.yOffset+")");

    },
  }); // End Rect



  Editor = Base.extend({

    shapes: null,

    selectedShapes: null,

    selectedColor: null,

    selectedStyle: null,

    constructor: function () {
      console.log("Editor constrcutor");
      this.shapes = new Array();
      this.selectedShapes = new Array();
    },

    actions: {
      "setColor": function () {

      },

      "setZindex": function (shape, zindex) {
        console.log("Editor setZindex");
        this.shapes[shape].zindex = zindex;
        
        var numbers = [4, 2, 5, 1, 3];
        this.shapes.sort(function(a, b) {
          return a.zindex - b.zindex;
        });
      },

      "addShape": function (shape) {
        console.log("Editor addShape");
        var arg;

        console.log("i: " + i);
        for (var i = 0, end = arguments.length; i < end; i++) {
          arg = arguments[i];
          if (arg instanceof Shape) {
            this.shapes.push(arg);
          }
        }

        return this;
      }
    },

    perform: function (action, options) {
      console.log("Editor action");
      console.log(arguments);
      console.log(action);
      console.log(options);

      if (this.actions[action] && 'function' == typeof this.actions[action]) {
        var opts = Array.isArray(options)
          ? options
          : [options];
        this.actions[action].apply(this, opts);
      }
    },

    draw: function () {
      for (var i = 0, end = this.shapes.length; i < end; i++) {
        this.shapes[i].draw();
      }
    },

    mousePressed: function () {
      console.log("Editor mousePressed");
      var i = this.shapes.length;
      // Because of the zindex, we iterate the loop from top to bottom
      while (i--) {
        if(this.shapes[i].mouseOver(pjs.mouseX, pjs.mouseY)) {
          console.log("shape selected");
          this.shapes[i].mousePressed();
          this.selectedShapes.push(this.shapes[i]);
          break;
        }
      }
    },

    mouseReleased: function () {
      console.log("mouseReleased");
      for (var i = 0, end = this.selectedShapes.length; i < end; i++) {
        console.log("i: " + i);
        console.log(this.selectedShapes);

        this.selectedShapes[i].mouseReleased();
      }
      this.selectedShapes = new Array();
      console.log(this.selectedShapes);

    },

    mouseDragged: function () {
      // console.log("mouseDragged");
      for (var i = 0, end = this.selectedShapes.length; i < end; i++) {
        // console.log("i: " + i);
        this.selectedShapes[i].mouseDragged(pjs.mouseX, pjs.mouseY);
      }
    },

  });



  var canvas = document.getElementById('glibcanvas');
  pjs = new Processing(canvas);

  editor = new Editor();

  // Definition for the initial entry point
  pjs.setup = function() {
    // console.log("setup");
    pjs.size(400, 400);
    pjs.frameRate(24);
    pjs.stroke("#003300");
    pjs.fill("#0000FF");
    editor.perform("addShape", 
      [
      new Circle(pjs.width / 2, pjs.height / 2, 50),
      new Rect(pjs.width / 4, pjs.height / 4, 50, 50)]
    );
    editor.perform("addShape", new Triangle(30, 90, 50, 20, 80, 90));
    editor.perform("addShape", new Triangle(130, 90, 150, 20, 180, 90));
  }

  pjs.draw = function() {
    pjs.background(255, 204, 0);
    editor.draw();
  }


  pjs.mousePressed = function () {
    editor.mousePressed();
  }

  pjs.mouseReleased = function () {
    editor.mouseReleased();
  }

  pjs.mouseDragged = function () {
    editor.mouseDragged();
  }


  // Finally, calling setup() will kickstart the sketch
  pjs.setup();
}());


