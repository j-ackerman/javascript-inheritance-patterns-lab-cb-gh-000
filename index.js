//1. Define a `Point` object that is constructed with an `x,y` coordinate pair to indicate its position. Add a `toString` function to the Point prototype to return the location in `(x, y)` format.

function Point(x,y){
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() {
  return `(${this.x}, ${this.y})`;
}

//2. Define a `Shape` object. This will be the base for all shapes on the plane. It should have an `addToPlane` function that takes two integers, `x` and `y`, as arguments. This function should assign a `Point`to the Shape's `position` property based on these arguments. Shape should also define a `move` function that takes an `x,y` pair of arguments and moves the `position` to a new `Point`.

function Shape() {}
Shape.prototype.addToPlane = function(x,y) {
    this.position = new Point(x,y);
}
Shape.prototype.move = function(x,y) {
    this.position = new Point(x,y);
}

//3. Define a `Circle` object that inherits from `Shape` and is constructed with an integer argument that sets the `radius` property. Define and implement functions on `Circle` to calculate `area()` and `circumference()` based on the `radius`.

function Circle(radius){
  Shape.call(this);
  this.radius = radius;
}
Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;
Circle.prototype.area = function(){
  return Math.PI*(this.radius*this.radius);
}
Circle.prototype.circumference = function(){
  return 2*Math.PI*this.radius;
}
Circle.prototype.diameter = function(){
  return this.radius*2;
}

//4. Define a `Polygon` object that inherits from `Shape`. It should be constructed with an array of `Side` objects that have a `length` property. `Polygon` should have a property called `sides` that holds the array of `Side` objects. Implement a function called `perimeter()` that calculates the perimeter of any `Polygon` based on the lengths of the `sides`. Implement a function called `numberOfSides()` that returns the number of sides.

function Side(length){
  this.length = length;
}

function Polygon(sides){
  Shape.call(this);
  this.sides = sides;
}
Polygon.prototype = new Shape();
Polygon.prototype.constructor = Polygon;
Polygon.prototype.perimeter = function(){
  var perimeter = 0;
  for(var x = 0; x < this.sides.length; x++){
    perimeter += this.sides[x].length;
  }
  return perimeter;
}
Polygon.prototype.numberOfSides = function(){
  return this.sides.length;
}
//5. Define a `Quadrilateral` object that inherits from `Polygon` and is constructed with four integer arguments representing the side lengths.
function Quadrilateral(s1,s2,s3,s4){
  Polygon.call(this, [new Side(s1), new Side(s2), new Side(s3), new Side(s4)]);
}
Quadrilateral.prototype = new Polygon();
Quadrilateral.prototype.constructor = Quadrilateral;

// 6. Define a `Triangle` object that inherits from `Polygon` and is constructed with three integer arguments representing the side lengths.
function Triangle(s1,s2,s3){
  Polygon.call(this, [new Side(s1), new Side(s2), new Side(s3)]);
}
Triangle.prototype = new Polygon();
Triangle.prototype.constructor = Triangle;

// 7. Define a `Rectangle` object that inherits from `Quadrilateral` and is constructed with two integer arguments that set `width` and `height` properties. Implement an `area()` function to calculate the area.
function Rectangle(width,height){
  this.width = width;
  this.height = height;
  Quadrilateral.call(this, width, width, height, height);
}
Rectangle.prototype = new Quadrilateral();
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.area = function(){
  return this.height*this.width;
}

// 8. Define a `Square` object that inherits from `Rectangle` and is constructed with a single integer argument that sets a `length` property. If everything is wired up right in the prototype chain, `Square` should have access to `area()`, `perimeter()`, `numberOfSides()`, `addToPlane()`, `position`, `move()`, `width`, `height` and so on.
function Square(length){
  Rectangle.call(this, length, length);
}

// 9. Define and implement a function for `Square` called `listProperties()` that returns a string containing only the properties that belong to `Square`. It should not list the `constructor`, `area`, `perimeter`, and other things inherited from the prototype chain.
Square.prototype = new Rectangle();
Square.prototype.constructor = Square;
Square.prototype.listProperties = function(){
  var result = "";
  for(var prop in Square){
    if(Square.hasOwnProperty(prop)) result += `Square.${prop} = ${Square[prop]}`;
  }
  return result;
  //return this.length;
}
