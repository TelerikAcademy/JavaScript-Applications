function Person(fname, lname) {
  this.fullName = function() {
    return fname + " " + lname;
  }
}

var validPerson = new Person("Valid", "Person");

var invalidPerson = Person("Invalid", "Person");

console.log(validPerson.fullName());
console.log(fullName());
// console.log(invalidPerson.fullName());