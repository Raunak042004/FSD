function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person("Alice", 30);
console.log(person1.name);
console.log(person1.age);