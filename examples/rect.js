// Rect class
var Rect = Shape.extend({

  "width": 0,
  "height": 0,
  "resizePoint": null,

  "maxCoords": {
    "x": 0,
    "y": 0,
  },

  "minCoords": {
    "x": 0,
    "y": 0,
  },

  "constructor": function (opts) {
    //console.log("Rect - constructor");
    //console.log("opts: ", opts);
    this.width = opts.width;
    this.height = opts.height;
    this.base({
      "x": opts.x,
      "y": opts.y,
      "color": opts.color,
      "lineStyle": opts.lineStyle,
      "lineWeight": opts.lineWeight,
      "lineColor": opts.lineColor,
      "selected": opts.selected,
      "group": opts.group,
    });
  },


  "resize": function () {
    // //console.log("\n\n***resize***");
    var mouseX = pjs.mouseX
    , mouseY = pjs.mouseY;

    // //console.log("this.resizePoint: ", this.resizePoint);
    // //console.log("max x,y("+this.maxCoords.x+","+this.maxCoords.y+")");
    // //console.log("x,y("+this.x+","+this.y+")");
    // //console.log("width,height ("+this.width+","+this.height+")");
    // //console.log("mouse x,y ("+mouseX+","+mouseY+")");

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

    // //console.log("this x/y("+this.x+","+this.y+")");
    // //console.log("this width,height ("+this.width+","+this.height+")");

  },

  "draw": function () {
    // //console.log("shape draw");
    // //console.log("this.getLineColor(): ", this.getLineColor());
    // //console.log("this.lineColor: ", this.lineColor);

    var shapeColor
      , lineColor;
    // //console.log("lineColor: ", lineColor);
    // console.log("this.isGroup(): ", this.isGroup());
    if (this.isGroup()) {
      // console.log("this.isGroup(): ", this.isGroup());
      // console.log("x,y ("+this.x+","+this.y+")");
      // console.log("width,height ("+this.width+","+this.height+")");
      pjs.fill(153);
      pjs.rect(this.x - 5, this.y - 5, 10, 10);
      pjs.rect(this.x + this.width - 5, this.y - 5, 10, 10);

      pjs.rect(this.x - 5, this.y + this.height - 5, 10, 10);
      pjs.rect(this.x + this.width -  5, this.y + this.height - 5, 10, 10);
    }
    else {
      shapeColor = this.color.getColor();
      lineColor = this.getLineColor().getColor();
      pjs.fill(shapeColor.r, shapeColor.g, shapeColor.b);

      if (this.isSelected()) {
        // pjs.fill(0, 0, 0);
      }

      pjs.stroke(lineColor.r, lineColor.g, lineColor.b);
      // pjs.stroke(204, 102, 0);
      pjs.rect(this.x, this.y, this.width, this.height);
    }

  },

  isMouseOver: function () {
    //console.log("isMouseOver");
    var mouseX = pjs.mouseX;
    var mouseY = pjs.mouseY;

    return mouseX >= this.x && mouseX <= this.x + this.width
       &&  mouseY >= this.y && mouseY <= this.y + this.height;
  },

  "shouldResize": function (aCoords) {
    //console.log("shouldResize");
    //console.log("this x,y ("+this.x+","+this.y+")");
    //console.log("this width,height ("+this.width+","+this.height+")");
    //console.log("aCoords: ", aCoords);
    aCoords = {
      "x": pjs.mouseX,
      "y": pjs.mouseY,
    };
    // LEFT_UP
    x = this.x - 5;
    y = this.y - 5;
    w = x + 10;
    h = y + 10;

    x1 = aCoords.x >= x;
    x2 = aCoords.x <= w;

    y1 = aCoords.y >= y;
    y2 = aCoords.y <= h;

    // //console.log("x,y ("+x+","+y+")");
    // //console.log("w,h ("+w+","+h+")");

    // //console.log("x 1,2 ("+x1+","+x2+")");
    // //console.log("y 1,2 ("+ y1+","+y2+")");

    if (x1 && x2 && y1 && y2) {
      //console.log("found a match! LEFT_UP");
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

    // //console.log("x,y ("+x+","+y+")");
    // //console.log("w,h ("+w+","+h+")");

    // //console.log("x 1,2 ("+x1+","+x2+")");
    // //console.log("y 1,2 ("+ y1+","+y2+")");

    if (x1 && x2 && y1 && y2) {
      //console.log("found a match! LEFT_DOWN");
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

    // //console.log("x,y ("+x+","+y+")");
    // //console.log("w,h ("+w+","+h+")");

    // //console.log("x 1,2 ("+x1+","+x2+")");
    // //console.log("y 1,2 ("+ y1+","+y2+")");

    if (x1 && x2 && y1 && y2) {
      //console.log("found a match! RIGHT_UP");
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

    // //console.log("x,y ("+x+","+y+")");
    // //console.log("w,h ("+w+","+h+")");

    // //console.log("x 1,2 ("+x1+","+x2+")");
    // //console.log("y 1,2 ("+ y1+","+y2+")");

    if (x1 && x2 && y1 && y2) {
      //console.log("found a match! RIGHT_DOWN");
      this.resizePoint = RIGHT_DOWN;
      return true;
    }

    return false;
  },

  "setWidth": function (aWidth) {
    this.width = aWidth;
  },

  "setHeight": function (aHeight) {
    this.height = aHeight;
  },

  "setMinCoords": function (aMaxCoords) {
    // //console.log("setMinCoords");
    this.minCoords.x = this.x;
    this.minCoords.y = this.y;
  },

  "setMaxCoords": function (aMaxCoords) {
    // //console.log("setMaxCoords");
    this.maxCoords.x = this.x + this.width;
    this.maxCoords.y = this.y + this.height;
  },

  "setDimensions": function (aDimensions) {
    //console.log("Rect - setDimensions");
    //console.log("aDimensions: ", aDimensions);
    this.setWidth(aDimensions.width);
    this.setHeight(aDimensions.height);
    return this;
  },

  "setResizePoint": function (aResizePoint) {
    this.resizePoint = aResizePoint;
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
    //console.log("Rect - getDimensions");
    return {
      "width": this.getWidth(),
      "height": this.getHeight(),
    };
  },

}); // End Rect
