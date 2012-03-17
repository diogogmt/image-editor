(function() {


  var Bouncer = Base.extend({
    constructor: function () {

    },

    x: 0,

    y: 0,

    canmove: true,

    step: 0,

    xoffset: 0,

    yoffset: 0,

    computeNextStep: function (width, height, framerate) {
      console.log("Bouncer computeNextStep");
      console.log("this.canmove: " + this.canmove);
      if(this.canmove) {
        this.reallyComputeNextStep(pjs.width, pjs.height, 24); // 24 = framerate
      }
    },

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
  });


  var Ball = Bouncer.extend({
    constructor: function (x, y, r) {
      this.x = x;
      this.y = y;
      this.radius = r;
    },

    radius: 0,

    reallyComputeNextStep: function (sketch_width, sketch_height, frame_rate) {
      console.log("Ball reallyComputeNextStep");
      this.step = parseInt(((this.step + 1) % frame_rate));

      var sin_value = Math.abs(Math.sin(pjs.PI * this.step / parseFloat(frame_rate)));

      var bounce_height = sketch_height / 2 * sin_value;

      var ball_height = sketch_height - (bounce_height + this.radius);

      this.y = parseInt(ball_height);
    },

    draw: function () {
      console.log("Ball draw");
      console.log("this.x: " + this.x);
      console.log("this.y: " + this.y);
      console.log("this.xoffset: " + this.xoffset);
      console.log("this.yoffset: " + this.yoffset);
      console.log("this.radius: " + this.radius);
      pjs.ellipse(this.x + this.xoffset, this.y + this.yoffset, this.radius, this.radius);
    },

    mouseOver: function  (mx, my) {
      return Math.sqrt((this.x - mx) * (this.x - mx) + (this.y - my) * (this.y - my)) <= this.radius;
    },
  });

  var bouncer = {};

  var canvas = document.getElementById('glibcanvas');
  pjs = new Processing(canvas);

  // Definition for the initial entry point
  pjs.setup = function() {
    console.log("setup");
    pjs.size(200,200);
    pjs.frameRate(24);
    pjs.stroke("#003300");
    pjs.fill("#0000FF");
    bouncer[0] = new Ball(pjs.width/3-20,20,20);
  }

  pjs.draw = function() {
    for(b = 0, end = Object.keys(bouncer).length; b < end; b++) {
      bouncer[b].computeNextStep(pjs.width, pjs.height, 24); // 24 = frameRate 
    }

    // pjs.background("#FFFFEE");
    pjs.background(255, 204, 0);

    for(b = 0, end = Object.keys(bouncer).length; b < end; b++) {
      bouncer[b].draw();
    }
  }


  pjs.mousePressed = function () {
    for(b = 0, end = Object.keys(bouncer).length; b < end; b++) {
      if(bouncer[b].mouseOver(pjs.mouseX, pjs.mouseY)) {
       bouncer[b].mousePressed();
      }
    }
  }

  pjs.mouseReleased = function () {
    for(b = 0, end = Object.keys(bouncer).length; b < end; b++) {
      bouncer[b].mouseReleased();
    }
  }

  pjs.mouseDragged = function () {
    for(b = 0, end = Object.keys(bouncer).length; b < end; b++) {
      bouncer[b].mouseDragged(pjs.mouseX, pjs.mouseY);
    }
  }


    // Finally, calling setup() will kickstart the sketch
    pjs.setup();
}());


