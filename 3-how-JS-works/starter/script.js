///////////////////////////////////////
// Lecture: Hoisting

///////////////////////////////////////
// Lecture: Scoping

// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/

// Example to show the differece between execution stack and scope chain

// var a = 'Hello!'
// first()

// function first() {
//   var b = 'Hi!'
//   second()

//   function second() {
//     var c = 'Hey!'
//     third()
//   }
// }

// function third() {
//   var d = 'John'
//   //   console.log(a + b + c + d) // no access to `var b` or `var c`
//   console.log(a + d)
// }

///////////////////////////////////////
// Lecture: The this keyword

/*
 * Regular function call - `this` keyword points at the global object
 *                          (window in case of browsers)
 * Method call - `this` keyword points at the object that is calling the method
 *
 * `this` keyword is not assigned a value until a function where it's defined
 * is actually called
 */

// global execution context
console.log('`this` in a global execution context:', this) // empty object, why?

calculateAge(1984)

function calculateAge(year) {
  console.log(2019 - year)
  console.log('`this` in context of regular function call:', this) // window
}

var john = {
  name: 'John',
  yearOfBirth: 1984,
  calculateAge: function() {
    console.log('`this` in a method call:', this) // `this` is `john` object
    console.log(2019 - this.yearOfBirth)

    function innerFunction() {
      console.log('`this` in a inner function inside of a method call:', this)
    }

    innerFunction() // `this` is window

    var innerFatFunction = () => {
      console.log(
        '`this` in a inner fat-arrow function inside a method call:',
        this
      )
    }

    innerFatFunction() // `this` is `john` object
  },
}

console.log('John object ops:')

john.calculateAge()

var mike = {
  name: 'Mike',
  yearOfBirth: 1988,
}

// method borrowing
mike.calculateAge = john.calculateAge

console.log('Mike object ops:')
mike.calculateAge()
