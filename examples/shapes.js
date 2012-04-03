const LEFT_UP = 1
  , LEFT_DOWN = 2
  , RIGHT_UP = 3
  , RIGHT_DOWN = 4;

// Shape class
var Shape = Base.extend({
  "x": 0,
  "y": 0,
  "color": null,
  "zindex": 0,
  "lineStyle": 0,
  "lineWeight": 0,
  "selected": true,

  "constructor": function (opts) {
    this.x = opts.x;
    this.y = opts.y
    this.lineStyle = opts.lineStyle;
    this.lineWeight = opts.lineWeight;
    this.color = opts.color;
  },

  // Setters
  "setX": function (aX) {
    this.x = aX;
  },

  "setY": function (aY) {
    this.y = aY;
  },

  "setColor": function (aColor) {
    this.color = aColor;
  },

  "setZindex": function (aZindex) {
    this.zIndex = aZindex;
  },

  "setLineStyle": function (aLineStyle) {
    this.lineStyle = aLineStyle;
  },

  "setLineWeight": function (aLineWeight) {
    this.lineWeight = aLineWeight;
  },

  "setSelected": function (aSelected) {
    this.selected = aSelected;
  },

  "setCoords": function (aCoords) {
    console.log("setCoords");
    this.setX(aCoords.x);
    this.setY(aCoords.y);
  },

  "setX": function (aX) {
    this.x = aX;
  },

  // Getters
  "getX": function () {
    return this.x;
  },

  "getY": function () {
    return this.y;
  },

  "getColor": function () {
    return this.color;
  },

  "getZindex": function () {
    return this.zIndex;
  },

  "getLineStyle": function () {
    return this.lineStyle;
  },

  "getLineWeight": function () {
    return this.lineWeight;
  },

  "getSelected": function () {
    return this.selected;
  },

  "getCoords": function () {
    var that = this;
    return {
      "x": that.getX(),
      "y": that.getY(),
    };
  },

  "isSelected": function () {
    return this.selected;
  },

}); // End Shape

// Rect class
var Rect = Shape.extend({

  "width": 0,
  "height": 0,

  "maxCoords": {
    "x": 0,
    "y": 0,
  },

  "minCoords": {
    "x": 0,
    "y": 0,
  },

  "constructor": function (opts) {
    console.log("opts: ", opts);
    this.width = opts.width;
    this.height = opts.height;
    this.base({
    "x": opts.x,
    "y": opts.y,
    "color": opts.color,
    "lineStyle": opts.lineStyle,
    "lineWeight": opts.lineWeight,
    });
  },


  "setWidth": function (aWidth) {
    this.width = aWidth;
  },

  "setHeight": function (aHeight) {
    this.height = aHeight;
  },

  "setMinCoords": function (aMaxCoords) {
    console.log("setMinCoords");
    this.minCoords.x = this.x;
    this.minCoords.y = this.y;
  },

  "setMaxCoords": function (aMaxCoords) {
    console.log("setMaxCoords");
    this.maxCoords.x = this.x + this.width;
    this.maxCoords.y = this.y + this.height;
  },

  "setDimensions": function (aDimensions) {
    console.log("setDimensions");
    console.log("aDimensions: ", aDimensions);
    this.setWidth(aDimensions.width);
    this.setHeight(aDimensions.height);
  },


  "getWidth": function () {
    return this.width;
  },

  "getHeight": function () {
    return this.height;
  },

  "getStartCoords": function () {
    return {
      "x": this.maxCoords.x,
      "y": this.maxCoords.y,
    };
  },

  "getDimensions": function () {
    return {
      "width": this.width,
      "height": this.height,
    };
  },


  "resize": function () {
    console.log("\n\n***resize***");
    var mouseX = pjs.mouseX
    , mouseY = pjs.mouseY;

    console.log("this.resizePoint: ", this.resizePoint);
    console.log("max x,y("+this.maxCoords.x+","+this.maxCoords.y+")");
    console.log("x,y("+this.x+","+this.y+")");
    console.log("width,height ("+this.width+","+this.height+")");
    console.log("mouse x,y ("+mouseX+","+mouseY+")");

    switch (this.resizePoint) {
      case LEFT_UP:
        if (mouseY > this.maxCoords.y) {
          this.resizePoint = LEFT_DOWN;
          this.setMinCoords();
          this.setMaxCoords();
        }

        if (mouseX > this.maxCoords.x) {
          this.resizePoint = RIGHT_UP;
          this.setMinCoords();
          this.setMaxCoords();
        }

        if (mouseY > this.y) {
          this.height -= mouseY - this.y;
          this.y = mouseY;
        }
        else if (mouseY < this.y) {
          this.height += this.y - mouseY;
          this.y = mouseY;
        }

        if (mouseX > this.x) {
          this.width -= mouseX - this.x;
          this.x = mouseX;
        }
        else if (mouseX < this.x) {
          this.width += this.x - mouseX;
          this.x = mouseX;
        }


        break;
      case LEFT_DOWN:
        if (mouseY < this.y) {
          this.resizePoint = LEFT_UP;
          this.setMaxCoords();
        }

        if (mouseX > this.maxCoords.x) {
          this.resizePoint = RIGHT_DOWN;
          this.setMinCoords();
        }

        if (mouseX > this.x) {
          this.width -= mouseX - this.x;
          this.x = mouseX;
        }
        else if (mouseX < this.x) {
          this.width += this.x - mouseX;
          this.x = mouseX;
        }

        if (mouseY > (this.y + this.height)) {
          this.height += mouseY - (this.y + this.height);
        }
        else if (mouseY < (this.y + this.height)) {
          this.height -= (this.y + this.height) - mouseY;
        }
        break;

      case RIGHT_UP:
        if (mouseX < this.minCoords.x) {
          this.resizePoint = LEFT_UP;
          this.setMaxCoords();
        }

        if (mouseY > this.maxCoords.y) {
          this.resizePoint = RIGHT_DOWN;
          this.setMaxCoords();
          this.setMinCoords();
        }

        if (mouseX < (this.x + this.width)) {
          this.width -= (this.x + this.width) - mouseX;
        }
        else if (mouseX > (this.x + this.width)) {
          console.log("mouseX > this.maxCoords.x");
          this.width += mouseX - (this.x + this.width);
        }

        if (mouseY > this.y) {
          this.height -= mouseY - this.y;
          this.y = mouseY;
        }
        else if (mouseY < this.y) {
          this.height += this.y - mouseY;
          this.y = mouseY;
        }
        break;

      case RIGHT_DOWN:
        if (mouseX < this.minCoords.x) {
          this.resizePoint = LEFT_DOWN;
          this.setMinCoords();
          this.setMaxCoords();
        }

        if (mouseY < this.minCoords.y) {
          this.resizePoint = RIGHT_UP;
          this.setMinCoords();
          this.setMaxCoords();
        }

        if (mouseX > (this.x + this.width)) {
          this.width += mouseX - (this.x + this.width);
        }
        else if (mouseX < (this.x + this.width)) {
          this.width -= (this.x + this.width) - mouseX;
        }

        if (mouseY > (this.y + this.height)) {
          this.height += mouseY - (this.y + this.height);
        }
        else if (mouseY < (this.y + this.height)) {
          this.height -= (this.y + this.height) - mouseY;
        }
        break;

    }

    console.log("this x/y("+this.x+","+this.y+")");
    console.log("this width,height ("+this.width+","+this.height+")");

  },

  "draw": function () {
    // console.log("shape draw");
    pjs.fill(this.color.r, this.color.g, this.color.b);
    pjs.rect(this.x, this.y, this.width, this.height);

    if (this.isSelected()) {
      pjs.fill(153);
      pjs.rect(this.x - 5, this.y - 5, 10, 10);
      pjs.rect(this.x + this.width - 5, this.y - 5, 10, 10);

      pjs.rect(this.x - 5, this.y + this.height - 5, 10, 10);
      pjs.rect(this.x + this.width -  5, this.y + this.height - 5, 10, 10);
    }

  },

  isMouseOver: function () {
    console.log("isMouseOver");
    var mx = pjs.mouseX;
    var my = pjs.mouseY;
    var n = this.x <= mx && mx <= this.x + this.width &&
      (this.y - this.height / 2) <= my &&
      my <= (this.y + this.height / 2);

    // console.log("mx,my("+mx+","+my+")");
    // console.log("return: ", n);


    return this.x <= mx && mx <= this.x + this.width &&
      (this.y - this.height / 2) <= my &&
      my <= (this.y + this.height / 2);
  },

  "shouldResize": function (aCoords) {
    console.log("shouldResize");
    console.log("this x,y ("+this.x+","+this.y+")");
    console.log("this width,height ("+this.width+","+this.height+")");
    console.log("aCoords: ", aCoords);

    // LEFT_UP
    x = this.x - 5;
    y = this.y - 5;
    w = x + 10;
    h = y + 10;

    x1 = aCoords.x >= x;
    x2 = aCoords.x <= w;

    y1 = aCoords.y >= y;
    y2 = aCoords.y <= h;

    console.log("x,y ("+x+","+y+")");
    console.log("w,h ("+w+","+h+")");

    console.log("x 1,2 ("+x1+","+x2+")");
    console.log("y 1,2 ("+ y1+","+y2+")");

    if (x1 && x2 && y1 && y2) {
      console.log("found a match! LEFT_UP");
      this.resizePoint = LEFT_UP;
      return true;
    }


    // LEFT_DOWN
    x = this.x - 5;
    y = this.y + this.height - 5;
    w = x + 10;
    h = y + 10;

    x1 = aCoords.x >= x;
    x2 = aCoords.x <= w;

    y1 = aCoords.y >= y;
    y2 = aCoords.y <= h;

    console.log("x,y ("+x+","+y+")");
    console.log("w,h ("+w+","+h+")");

    console.log("x 1,2 ("+x1+","+x2+")");
    console.log("y 1,2 ("+ y1+","+y2+")");

    if (x1 && x2 && y1 && y2) {
      console.log("found a match! LEFT_DOWN");
      this.resizePoint = LEFT_DOWN;
      return true;
    }



    // RIGHT_UP
    x = this.x + this.width - 5;
    y = this.y - 5;
    w = x + 10;
    h = y + 10;

    x1 = aCoords.x >= x;
    x2 = aCoords.x <= w;

    y1 = aCoords.y >= y;
    y2 = aCoords.y <= h;

    console.log("x,y ("+x+","+y+")");
    console.log("w,h ("+w+","+h+")");

    console.log("x 1,2 ("+x1+","+x2+")");
    console.log("y 1,2 ("+ y1+","+y2+")");

    if (x1 && x2 && y1 && y2) {
      console.log("found a match! RIGHT_UP");
      this.resizePoint = RIGHT_UP;
      return true;
    }


    // RIGHT_DOWN
    x = this.x + this.width - 5;
    y = this.y + this.height - 5;
    w = x + 10;
    h = y + 10;

    x1 = aCoords.x >= x;
    x2 = aCoords.x <= w;

    y1 = aCoords.y >= y;
    y2 = aCoords.y <= h;

    console.log("x,y ("+x+","+y+")");
    console.log("w,h ("+w+","+h+")");

    console.log("x 1,2 ("+x1+","+x2+")");
    console.log("y 1,2 ("+ y1+","+y2+")");

    if (x1 && x2 && y1 && y2) {
      console.log("found a match! RIGHT_DOWN");
      this.resizePoint = RIGHT_DOWN;
      return true;
    }

    return false;

  }

}); // End Rect