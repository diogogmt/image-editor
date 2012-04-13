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

  "overlay": false,

  "constructor": function (opts) {
    // console.log("Rect - constructor");
    // console.log("opts: ", opts);
    this.width = opts.width;
    this.height = opts.height;
    this.overlay = opts.overlay;
    this.base({
      "x": opts.x,
      "y": opts.y,
      "color": opts.color,
      "lineStyle": opts.lineStyle,
      "lineWeight": opts.lineWeight,
      "lineColor": opts.lineColor,
      "selected": opts.selected,
      "group": opts.group,
      "type": opts.type,
    });
  },



  "resize": function () {
    // ////console.log("\n\n***resize***");
    var mouseX = pjs.mouseX
    , mouseY = pjs.mouseY;

    // ////console.log("this.resizePoint: ", this.resizePoint);
    // ////console.log("max x,y("+this.maxCoords.x+","+this.maxCoords.y+")");
    // ////console.log("x,y("+this.x+","+this.y+")");
    // ////console.log("width,height ("+this.width+","+this.height+")");
    // ////console.log("mouse x,y ("+mouseX+","+mouseY+")");

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

    // ////console.log("this x/y("+this.x+","+this.y+")");
    // ////console.log("this width,height ("+this.width+","+this.height+")");

  },

  "drawGroup": function () {
    // console.log("Rect - drawGroup");
    // console.log("x,y ("+this.x+","+this.y+")");
     pjs.stroke(238,233,233);
    // Shape Group
    pjs.rect(this.resizeRect.getLeftX(this.x) + this.resizeRect.getWidth() / 2,
      this.resizeRect.getTopY(this.y) + this.resizeRect.getHeight() / 2,
      this.resizeRect.getRightX(this.x, this.width) - this.resizeRect.getLeftX(this.x),
      this.resizeRect.getBottomY(this.y, this.height) - this.resizeRect.getTopY(this.y)
    );
  },

  "drawResizeArea": function () {
    // console.log("Ract - drawResizeArea");
    // //console.log("this.isGroup(): ", this.isGroup());
    // //console.log("x,y ("+this.x+","+this.y+")");
    // //console.log("width,height ("+this.width+","+this.height+")");

    pjs.stroke(0);
    pjs.strokeWeight(1);
    pjs.fill(255);
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

  "drawShape": function () {
    // //console.log("Rect - drawRect")
    // ////console.log("this.getLineColor(): ", this.getLineColor());
    // ////console.log("this.lineColor: ", this.lineColor);

    var shapeColor = this.color.getColor()
      , lineColor = this.getLineColor().getColor()
      , lineWeight = this.lineWeight;
    // console.log("overlay: ", this.overlay);
    // console.log("this.getOverlay(): ", this.getOverlay());


    if (this.overlay) {
      pjs.noFill();
    }
    else {
      // ////console.log("lineColor: ", lineColor);
      pjs.fill(shapeColor.r, shapeColor.g, shapeColor.b);
    }

    pjs.stroke(lineColor.r, lineColor.g, lineColor.b);
    pjs.strokeWeight(lineWeight);
    pjs.rect(this.x, this.y, this.width, this.height);
  },

  "draw": function () {
    // ////console.log("Rect - draw");
    // //console.log("this.isGroup(): ", this.isGroup());

    !this.isGroup() && this.drawShape();

  },

  isMouseOver: function () {
    ////console.log("isMouseOver");
    var mouseX = pjs.mouseX;
    var mouseY = pjs.mouseY;

    if (this.shouldResize()) {
      return false;
    }

    return mouseX >= this.x && mouseX <= this.x + this.width
       &&  mouseY >= this.y && mouseY <= this.y + this.height;
  },


  "findResizeCorner": function (pos) {
    //console.log("Rect - findResizeCorner");
    //console.log("pos: ", pos.lr + ", " + pos.tb);
    var bounds = {
      "x" : 0,
      "y" : 0,
      "width" : 0,
      "height" : 0,
    };

    if (pos.lr === LEFT) {
      bounds.x = this.resizeRect.getLeftX(this.x);
      bounds.width = this.resizeRect.getLeftX(this.x) + this.resizeRect.getWidth();
    }
    else if (pos.lr === RIGHT) {
      bounds.x = this.resizeRect.getRightX(this.x, this.width);
      bounds.width = this.resizeRect.getRightX(this.x, this.width) + this.resizeRect.getWidth();
    }

    if (pos.tb === TOP) {
      bounds.y = this.resizeRect.getTopY(this.y);
      bounds.height = this.resizeRect.getTopY(this.y) + this.resizeRect.getHeight();
    }
    else if (pos.tb === BOTTOM) {
      bounds.y = this.resizeRect.getBottomY(this.y, this.height);
      bounds.height = this.resizeRect.getBottomY(this.y, this.height) + this.resizeRect.getHeight();
    }

    return bounds;

  },

  "shouldResize": function () {
    //console.log("shouldResize");
    //console.log("this x,y ("+this.x+","+this.y+")");
    ////console.log("this width,height ("+this.width+","+this.height+")");
    var i
      , x
      , y
      , width
      , height
      , coords = {
        "x": pjs.mouseX,
        "y": pjs.mouseY,
      };
    //console.log("coords: ", coords);

    //console.log("CORNERS.length: ", CORNERS.length);
    for (i = 0; i < CORNERS.length; i++) {
      bounds = this.findResizeCorner(PLACES[CORNERS[i]]);
      x = coords.x >= bounds.x;
      y = coords.y >= bounds.y;
      width = coords.x <= bounds.width;
      height = coords.y <= bounds.height;
      //console.log("x,y ("+x+","+y+")");
      //console.log("width,height ("+ width+","+height+")");

      if (x && y && width && height) {
        ////console.log("found a match! LEFT_TOP");
        this.resizePoint = CORNERS[i];
        return CORNERS[i];
      }
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
    // ////console.log("setMinCoords");
    this.minCoords.x = this.x;
    this.minCoords.y = this.y;
  },

  "setMaxCoords": function (aMaxCoords) {
    // ////console.log("setMaxCoords");
    this.maxCoords.x = this.x + this.width;
    this.maxCoords.y = this.y + this.height;
  },

  "setDimensions": function (aDimensions) {
    ////console.log("Rect - setDimensions");
    ////console.log("aDimensions: ", aDimensions);
    this.setWidth(aDimensions.width);
    this.setHeight(aDimensions.height);
    return this;
  },

  "setResizePoint": function (aResizePoint) {
    this.resizePoint = aResizePoint;
  },

  "setOverlay": function (aOverlay) {
    this.overlay = aOverlay;
  },


  "getWidth": function () {
    return this.width;
  },

  "getHeight": function () {
    return this.height;
  },

  "getResizePoint": function () {
    return this.resizePoint;
  },

  "getStartCoords": function () {
    return {
      "x": this.maxCoords.x,
      "y": this.maxCoords.y,
    };
  },

  "getDimensions": function () {
    ////console.log("Rect - getDimensions");
    return {
      "width": this.getWidth(),
      "height": this.getHeight(),
    };
  },

  "getOverlay": function () {
    return this.overlay;
  },

}); // End Rect
