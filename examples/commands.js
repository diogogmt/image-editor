createShapeCommand = function (canvas)  {
	var shape;
	
	return {
		"execute": function () {
			shape = new Shape(canvas);
			canvas.insertShape(shape);
		}
		"undo": function () {
			canvas.removeShape(shape);
		}
	}
}

deleteShapeCommand = function (canvas, shape)  {
	var shape;
	
	return {
		"execute": function () {
			canvas.removeShape(shape);
			
		}
		"undo": function () {
			canvas.insertShape(shape);
		}
	}
}


setColorCommand = function (canvas, color)  {
	var oldColor = canvas.getColor();
	
	return {
		"execute": function () {			
			canvas.setColor(color);
		}
		"undo": function () {
			canvas.setColor(oldColor);
		}
	}
}

setLineWeightCommand = function (canvas, lineWeight)  {
	var oldLineWeight = canvas.getLineWeight();
	
	return {
		"execute": function () {			
			canvas.setLineWeight(lineWeight);
		}
		"undo": function () {
			canvas.setColor(oldLineWeight);
		}
	}
}


setLineStyleCommand = function (canvas, lineStyle)  {
	var oldLineStyle = canvas.getLineStyle();
	
	return {
		"execute": function () {			
			canvas.setLineStyle(lineStyle);
		}
		"undo": function () {
			canvas.setColor(oldLineStyle);
		}
	}
}

createShapeGroupCommand = function (canvas, shapes)  {
	var oldShapeGroup = canvas.getShapeGroup();
	
	return {
		"execute": function () {			
			canvas.setShapeGroup(shapes);
		}
		"undo": function () {
			canvas.setShapeGroup(oldShapeGroup);
		}
	}
}

resizeShapeCommand = function (canvas, shape, options)  {

	// options object
	//{
		//"dimensions": {
			//"width": shape.getWidth(),
			//"height": shape.getHeight(),
		//},
		//"coords": {
			//"x": shape.getX(),
			//"y": shape.getY(),
		//}
	//}
	

	// dimensions object
	//{
		//"width": shape.getWidth(),
		//"height": shape.getHeight()
	//}
	
	// coords object
	//{
		//"x": shape.getX(),
		//"y": shape.getY(),
	//}
	var dimensions = shape.getDimensions();	
	var coords = shape.getCoords();
	
	return {
		"execute": function () {			
			canvas.getShape(shape).setDimensions(dimensions)
				.setCoords(coords);
		},
		
		"undo": function () {
			canvas.getShape(shape).setDimensions(options.oldDimensions)
				.setCoords(options.oldCoords);
		}
	}
}


pasteCommand = function (canvas, shape)  {	
	return {
		"execute": function () {			
			canvas.insertShape(shape);
		}
		"undo": function () {
			canvas.removeShape(shape);
		}
	}
}

moveCommand = function (canvas, shape, options)  {

	// options object
	//{
		//"oldDimensions": {
			//"width": shape.getWidth(),
			//"height": shape.getHeight(),
		//},
		//"oldCoords": {
			//"x": shape.getX(),
			//"y": shape.getY(),
		//}
	//}
	

	// dimensions object
	//{
		//"width": shape.getWidth(),
		//"height": shape.getHeight()
	//}
	
	// coords object
	//{
		//"x": shape.getX(),
		//"y": shape.getY(),
	//}
	var dimensions = shape.getDimensions();	
	var coords = shape.getCoords();
	
	return {
		"execute": function () {			
			canvas.getShape(shape).setDimensions(dimensions)
				.setCoords(coords);
		},
		
		"undo": function () {
			canvas.getShape(shape).setDimensions(options.oldDimensions)
				.setCoords(options.oldCoords);
		}
	}
}