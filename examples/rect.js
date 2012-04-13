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
      case LEFT_TOP:
        if (mouseY > this.maxCoords.y) {
          this.resizePoint = LEFT_BOTTOM;
          this.setMinCoords();
          this.setMaxCoords();
        }

        if (mouseX > this.maxCoords.x) {
          this.resizePoint = RIGHT_TOP;
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
      case LEFT_BOTTOM:
        if (mouseY < this.y) {
          this.resizePoint = LEFT_TOP;
          this.setMaxCoords();
        }

        if (mouseX > this.maxCoords.x) {
          this.resizePoint = RIGHT_BOTTOM;
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

      case RIGHT_TOP:
        if (mouseX < this.minCoords.x) {
          this.resizePoint = LEFT_TOP;
          this.setMaxCoords();
        }

        if (mouseY > this.maxCoords.y) {
          this.resizePoint = RIGHT_BOTTOM;
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

      case RIGHT_BOTTOM:
        if (mouseX < this.minCoords.x) {
          this.resizePoint = LEFT_BOTTOM;
          this.setMinCoords();
          this.setMaxCoords();
        }

        if (mouseY < this.minCoords.y) {
          this.resizePoint = RIGHT_TOP;
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

  "drawResizeRects": function () {
    // console.log("this.isGroup(): ", this.isGroup());
    // console.log("x,y ("+this.x+","+this.y+")");
    // console.log("width,height ("+this.width+","+this.height+")");
    pjs.noStroke();
    pjs.fill(153);
    // LEFT,TOP RECT
    pjs.rect(this.resizeRect.getLeftX(this.x),
      this.resizeRect.getTopY(this.y),
      this.resizeRect.getWidth(),
      this.resizeRect.getHeight()
    );

    // LEFT,BOTTOM RECT
    pjs.rect(this.resizeRect.getLeftX(this.x),
      this.resizeRect.getBottomY(this.y, this.height),
      this.resizeRect.getWidth(),
      this.resizeRect.getHeight()
    );

    // RIGHT,TOP RECT
    pjs.rect(this.resizeRect.getRightX(this.x, this.width),
      this.resizeRect.getTopY(this.y),
      this.resizeRect.getWidth(),
      this.resizeRect.getHeight()
    );

    // RIGHT,BOTTOM RECT
    pjs.rect(this.resizeRect.getRightX(this.x, this.width),
      this.resizeRect.getBottomY(this.y, this.height),
      this.resizeRect.getWidth(),
      this.resizeRect.getHeight()
    );
  },

  "drawRect": function () {
    // console.log("Rect - drawRect")
    // //console.log("this.getLineColor(): ", this.getLineColor());
    // //console.log("this.lineColor: ", this.lineColor);

    var shapeColor
      , lineColor;

    shapeColor = this.color.getColor();
    lineColor = this.getLineColor().getColor();
    // //console.log("lineColor: ", lineColor);

    pjs.fill(shapeColor.r, shapeColor.g, shapeColor.b);

    if (this.isSelected()) {
      // pjs.fill(0, 0, 0);
    }

    pjs.stroke(lineColor.r, lineColor.g, lineColor.b);
    // pjs.stroke(204, 102, 0);
    pjs.rect(this.x, this.y, this.width, this.height);
  },

  "draw": function () {
    // //console.log("Rect - draw");
    // console.log("this.isGroup(): ", this.isGroup());
    this.isGroup() ? this.drawResizeRects()
      : this.drawRect();

  },

  isMouseOver: function () {
    //console.log("isMouseOver");
    var mouseX = pjs.mouseX;
    var mouseY = pjs.mouseY;

    return mouseX >= this.x && mouseX <= this.x + this.width
       &&  mouseY >= this.y && mouseY <= this.y + this.height;
  },


  "findResizeCorner": function (lr, tb) {
    bounds = {
      "x" : 0,
      "y" : 0,
      "width" : 0,
      "height" : 0,
    }

    if (lr === LEFT) {
      bounds.x = this.x - this.resizeRect.getWidth();
      bounds.width = this.x;
    }
    else if (lr === RIGHT) {
      bounds.x = this.x + this.width;
      bounds.width = this.x + this.width;
    }

    if (tb === TOP) {
      bounds.y = this.y - this.resizeRect.getHeight()
      bounds.height = this.y + this.resizeRect.getHeight();
    }
    else if (tb === BOTTOM) {
      bounds.y = this.y + this.height
      bounds.height = this.y + this.height + this.resizeRect.getHeight();
    }

    return bounds;

  },

  "shouldResize": function () {
    console.log("shouldResize");
    console.log("this x,y ("+this.x+","+this.y+")");
    //console.log("this width,height ("+this.width+","+this.height+")");
    var i
      , coords = {
        "x": pjs.mouseX,
        "y": pjs.mouseY,
      };
    console.log("coords: ", coords);


    for (i = 0; i < CORNERS.length; i++) {
      bounds = this.findResizeCorner(PLACES[CORNERS[i]]);
      x1 = coords.x >= bounds.x;
      x2 = coords.x <= bounds.width;
      y1 = coords.y >= bounds.y;
      y2 = coords.y <= bounds.height;

      if (x1 && x2 && y1 && y2) {
        //console.log("found a match! LEFT_TOP");
        this.resizePoint = CORNERS[i];
        return true;
      }
    }
    // // LEFT_TOP
    // x = this.x - 10;
    // y = this.y - 10;
    // w = this.x;
    // h = y + 10;

    // x1 = aCoords.x >= x;
    // x2 = aCoords.x <= w;

    // y1 = aCoords.y >= y;
    // y2 = aCoords.y <= h;

    // console.log("x,y ("+x+","+y+")");
    // console.log("w,h ("+w+","+h+")");

    // console.log("x 1,2 ("+x1+","+x2+")");
    // console.log("y 1,2 ("+ y1+","+y2+")");

    // if (x1 && x2 && y1 && y2) {
    //   //console.log("found a match! LEFT_TOP");
    //   this.resizePoint = LEFT_TOP;
    //   return true;
    // }


    // // LEFT_BOTTOM
    // x = this.x - 10;
    // y = this.y + this.height;
    // w = this.x;
    // h = y + 10;

    // x1 = aCoords.x >= x;
    // x2 = aCoords.x <= w;

    // y1 = aCoords.y >= y;
    // y2 = aCoords.y <= h;

    // // //console.log("x,y ("+x+","+y+")");
    // // //console.log("w,h ("+w+","+h+")");

    // // //console.log("x 1,2 ("+x1+","+x2+")");
    // // //console.log("y 1,2 ("+ y1+","+y2+")");

    // if (x1 && x2 && y1 && y2) {
    //   //console.log("found a match! LEFT_BOTTOM");
    //   this.resizePoint = LEFT_BOTTOM;
    //   return true;
    // }



    // // RIGHT_TOP
    // x = this.x + this.width;
    // y = this.y - 10;
    // w = x + 10;
    // h = y + 10;

    // x1 = aCoords.x >= x;
    // x2 = aCoords.x <= w;

    // y1 = aCoords.y >= y;
    // y2 = aCoords.y <= h;

    // // //console.log("x,y ("+x+","+y+")");
    // // //console.log("w,h ("+w+","+h+")");

    // // //console.log("x 1,2 ("+x1+","+x2+")");
    // // //console.log("y 1,2 ("+ y1+","+y2+")");

    // if (x1 && x2 && y1 && y2) {
    //   //console.log("found a match! RIGHT_TOP");
    //   this.resizePoint = RIGHT_TOP;
    //   return true;
    // }


    // // RIGHT_BOTTOM
    // x = this.x + this.width;
    // y = this.y + this.height;
    // w = x + 10;
    // h = y + 10;

    // x1 = aCoords.x >= x;
    // x2 = aCoords.x <= w;

    // y1 = aCoords.y >= y;
    // y2 = aCoords.y <= h;

    // // //console.log("x,y ("+x+","+y+")");
    // // //console.log("w,h ("+w+","+h+")");

    // // //console.log("x 1,2 ("+x1+","+x2+")");
    // // //console.log("y 1,2 ("+ y1+","+y2+")");

    // if (x1 && x2 && y1 && y2) {
    //   //console.log("found a match! RIGHT_BOTTOM");
    //   this.resizePoint = RIGHT_BOTTOM;
    //   return true;
    // }

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
