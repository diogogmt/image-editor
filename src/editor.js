(function() {


  // Shape class
  var Shape = Base.extend({
    constructor: function () {

    },

    x: 0,

    y: 0,

    canmove: true,

    step: 0,

    xoffset: 0,

    yoffset: 0,

    mousePressed: function () {
      this.canmove = false;
    },

    mouseReleased: function () {
      this.canmove = true;
      this.x += this.xoffset;
      this.y += this.yoffset;
      this.xoffset = 0;
      this.yoffset = 0;
    },

    mouseDragged: function (mx, my) {
      if(!this.canmove) {
        this.xoffset = mx - this.x;
        this.yoffset = my - this.y;
      }
    },
  }); // End Shape



  // Circle class
  var Circle = Shape.extend({
    constructor: function (x, y, r) {
      this.x = x;
      this.y = y;
      this.radius = r;
    },

    radius: 0,

    draw: function () {
      // console.log("Circle draw");
      pjs.ellipse(this.x + this.xoffset, this.y + this.yoffset, this.radius, this.radius);
    },

    mouseOver: function  (mx, my) {
      // console.log("Rect mouseOver");
      var num = (this.x - mx) * (this.x - mx) + (this.y - my) * (this.y - my);
      var squareRoot = Math.sqrt(num);
      // console.log("num: " + num);
      // console.log("squareRoot,radius (" + squareRoot + ", " + this.radius + ")");
      return squareRoot <= this.radius;
    },
  }); // End Circle


  // Rect class
  var Rect = Shape.extend({
    constructor: function (x, y, w, h) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
    },

    width: 0,

    height: 0,

    draw: function () {
      // console.log("Rect draw");
      pjs.rect(this.x + this.xoffset, (this.y - this.height / 2) + this.yoffset, this.width, this.height);
    },

    mouseOver: function  (mx, my) {
      // console.log("Rect mouseOver");
      return this.x <= mx && mx <= this.x + this.width && (this.y - this.height / 2) <= my && my <= (this.y + this.height / 2);
    },
  }); // End Rect


  // Triangle class
  var Triangle = Shape.extend({
    constructor: function (x1, y1, x2, y2, x3, y3) {
      this.x1 = x1;
      this.y1 = y1;

      this.x2 = x2;
      this.y2 = y2;

      this.x3 = x3;
      this.y3 = y3;
    },

    x1: 0,

    y1: 0,

    x2: 0,

    y2: 0,

    x3: 0,

    y3: 0,

    draw: function () {
      // console.log("Triangle draw");
      pjs.triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
    },

    mouseOver: function  (mx, my) {
      // console.log("Rect mouseOver");
      return false;
    },
  }); // End Rect



  var shapes = {};

  var canvas = document.getElementById('glibcanvas');
  pjs = new Processing(canvas);

  // Definition for the initial entry point
  pjs.setup = function() {
    console.log("setup");
    pjs.size(400, 400);
    pjs.frameRate(24);
    pjs.stroke("#003300");
    pjs.fill("#0000FF");
    shapes[0] = new Circle(pjs.width / 2, pjs.height / 2, 50);
    shapes[1] = new Rect(pjs.width / 4, pjs.height / 4, 50, 50);
    shapes[2] = new Triangle(30, 75, 58, 20, 86, 75);
  }

  pjs.draw = function() {
    for(b = 0, end = Object.keys(shapes).length; b < end; b++) {
      // shapes[b].computeNextStep(pjs.width, pjs.height, 24); // 24 = frameRate 
    }

    // pjs.background("#FFFFEE");
    pjs.background(255, 204, 0);

    for(b = 0, end = Object.keys(shapes).length; b < end; b++) {
      shapes[b].draw();
    }
  }


  pjs.mousePressed = function () {
    for(b = 0, end = Object.keys(shapes).length; b < end; b++) {
      if(shapes[b].mouseOver(pjs.mouseX, pjs.mouseY)) {
        shapes[b].mousePressed();
      }
    }
  }

  pjs.mouseReleased = function () {
    for(b = 0, end = Object.keys(shapes).length; b < end; b++) {
      shapes[b].mouseReleased();
    }
  }

  pjs.mouseDragged = function () {
    for(b = 0, end = Object.keys(shapes).length; b < end; b++) {
      shapes[b].mouseDragged(pjs.mouseX, pjs.mouseY);
    }
  }


  // Finally, calling setup() will kickstart the sketch
  pjs.setup();
}());


