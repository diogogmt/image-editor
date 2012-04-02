const TOP_LEFT = 1
  , TOP_RIGHT = 2
  , BOTTOM_LEFT = 3
  , BOTTOM_RIGHT = 4;

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
    console.log("\n***RECT resize");
    // pjs.mouseX = 75;
    // pjs.mouseY = 100

    console.log("type: ", this.resizePoint);
    console.log("mouse X,Y("+pjs.mouseX+","+pjs.mouseY+")");
    console.log("max X,Y("+this.maxCoords.x+","+this.maxCoords.y+")");
    console.log("this X,Y("+this.x+","+this.y+")");
    console.log("this width,height("+this.width+","+this.height+")");

    switch (this.resizePoint) {
      // Check if mouse is going left/right
      case TOP_LEFT:
        if (pjs.mouseX >= this.x) {
          // console.log("pjs.mouseX >= this.x");
          if (pjs.mouseX <= this.maxCoords.x) {
            this.width -= pjs.mouseX - this.x;
            this.x = pjs.mouseX;
            }
            else {
              this.width = pjs.mouseX - this.x;
            }
        }
        else {
          // console.log("else");
          this.width += this.x - pjs.mouseX;
          this.x = pjs.mouseX;
        }

        // Check if mouse is going up/down
        if (pjs.mouseY >= this.y) {
          // console.log("pjs.mouseY >= this.y");
          if (pjs.mouseY <= this.maxCoords.y) {
            this.height -= pjs.mouseY - this.y;
            this.y = pjs.mouseY;
          }
          else {
            this.height = pjs.mouseY - this.y;
          }
        }
        else {
          // console.log("else");
          this.height += this.y - pjs.mouseY;
          this.y = pjs.mouseY;
        }
        break;

      case TOP_RIGHT:
        if (pjs.mouseX >= this.x + this.width) {
          console.log("pjs.mouseX >= this.x + this.width");
          this.width += pjs.mouseX - (this.x + this.width);
        }
        else {
          console.log("else");
          if (pjs.mouseX <= this.x) {
            console.log("pjs.mouseX <= this.x");
            this.width += this.x - pjs.mouseX;
            this.x = pjs.mouseX;
          }
          else {
            console.log("else");
            if (pjs.mouseX <= this.minCoords.x) {
              console.log("HIT MIN COORDS");
              this.width -= pjs.mouseX - this.x;
              this.x = pjs.mouseX;
            }
            else {
              this.width -= (this.x + this.width) - pjs.mouseX;
            }
          }
        }

        if (pjs.mouseY < this.y) {
          console.log("pjs.mouseY < this.y");
          this.height += this.y - pjs.mouseY;
          this.y = pjs.mouseY;
        }
        else {
          console.log("else");
          this.height -= pjs.mouseY - this.y;
          this.y = pjs.mouseY;
        }
        break;

      default:
        break;
    }

    console.log("this X,Y("+this.x+","+this.y+")");
    console.log("this width,height ("+this.width+","+this.height+")");
    // console.log("this width,height("+this.width+","+this.height+")");

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

    // TOP LEFT
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
      console.log("found a match! TOP_LEFT");
      this.resizePoint = TOP_LEFT;
      return true;
    }


    // TOP RIGHT
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
      console.log("found a match! TOP_RIGHT");
      this.resizePoint = TOP_RIGHT;
      return true;
    }

    return false;

  }

}); // End Rect