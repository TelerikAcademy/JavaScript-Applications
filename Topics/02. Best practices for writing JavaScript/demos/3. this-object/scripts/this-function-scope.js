(function createAndSetVariable(number){
  this.number = number;
}(5));

console.log("outside the function scope: " + number);