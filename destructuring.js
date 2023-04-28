const car = {
  brand: "opel",
  year: 2017,
};

// Object destructuring: IF we use the key of the property of an object, as name for the variable we want to create , we can use Object destructuring:

const { brand } = car; // this is the same as const brand = car.brand;

const { year } = car; // this is the same as const year = car.year;

// Object destructuring allow us to declare more than one variable at the same time

const dog = {
  breed: "Bulldog",
  color: "black",
  age: 5,
};

const { breed, color, age } = dog;
