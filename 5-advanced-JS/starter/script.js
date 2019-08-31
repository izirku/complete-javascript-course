// *************
// Object.create

// var personProto = {
//   lastName: 'Smith',
//   calcualteAge: function() {
//     console.log(2019 - this.yearOfBirth)
//   },
// }

// var Person = function(name, yearOfBirth, job) {
//   var person = Object.create(personProto)
//   person.name = name
//   person.yearOfBirth = yearOfBirth
//   person.job = job
//   return person
// }

// ********************
// Function constructor

// var Person = function(name, yearOfBirth, job) {
//   this.name = name
//   this.yearOfBirth = yearOfBirth
//   this.job = job
// }

// Person.prototype = {
//   lastName: 'Smith',
//   calcualteAge: function() {
//     let date = new Date()
//     return date.getFullYear() - this.yearOfBirth
//   },
//   maxHeartRate: function() {
//     if (this.calcualteAge() >= 18 && this.calcualteAge() <= 81) {
//       return Math.round(206.9 - 0.67 * this.calcualteAge())
//     } else {
//       return -1
//     }
//   },
// }

// // new creates a brand new blank object
// var john = new Person('John', 1984, 'full-stack developer')
// console.log(john)
// console.log(john.hasOwnProperty('name'))
// console.log(john.hasOwnProperty('lastName'))

// **********************************************
// IIFE - Immedietly Invoked Function Expressions

// is an IIFE (hides data, privacy)
// ;(function() {
//   var score = Math.random() * 10
//   console.log(score >= 5)
// })()

// ********
// Closures

// function retirement(retirementAge) {
//   var a = ' years left until retirement'

//   return function(yearOfBirth) {
//     var age = new Date().getFullYear() - yearOfBirth
//     console.log(retirementAge - age + a)
//   }
// }

// var retirementUS = retirement(66)
// console.log(retirementUS(1984))

// *****************
// Bind, Call, Apply

var john = {
  name: 'John',
  age: 35,
  job: 'full-stack developer',
  presentation: function(style, timeOfDay) {
    if (style === 'formal') {
      console.log(
        'Good ' +
          timeOfDay +
          ", ladies and gentlemen! I'm " +
          this.name +
          ", I'm a " +
          this.job +
          " and I'm " +
          this.age +
          ' years old.'
      )
    } else if (style === 'friendly') {
      console.log(
        "Hey! What's up? " +
          "I'm " +
          this.name +
          ", I'm a " +
          this.job +
          " and I'm " +
          this.age +
          ' years old. Have a nice ' +
          timeOfDay +
          '.'
      )
    }
  },
}

var emily = {
  name: 'Emily',
  age: '27',
  job: 'soderjanka',
}

john.presentation('formal', 'morning')

// call & apply set `this` to a first parameter and invoke function
john.presentation.call(emily, 'friendly', 'afternoon')
john.presentation.apply(emily, ['friendly', 'afternoon'])

// bind sets `this` to a first parameter, but does not invoke the function
// other parameters are bound as well - partial application much?
var johnFriendly = john.presentation.bind(john, 'friendly')
johnFriendly('evening')

var emilyFormal = john.presentation.bind(emily, 'formal')
emilyFormal('svolochi')
