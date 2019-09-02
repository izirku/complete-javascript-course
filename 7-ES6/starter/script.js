// *****************************************************************************
// LET & CONST

// // ES5 - function scoped, hoisted to `undefined`
// var name5 = 'Jane Smith'
// var age5 = 23
// name5 = 'Jane Miller' // mutatiion
// console.log(name5)

// // ES6 - block scoped, not hoisted (can be only used after defined)
// const name6 = 'Jane Smith'
// let age6 = 23
// // will cause an error
// // name6 = 'Jane Miller' // cannot mutate
// // console.log(name6)

// // ES5
// function driversLicense5(passedTest) {
//   if (passedTest) {
//     var firstName = 'John'
//     var yearOfBirth = 1990
//   }
//   console.log(
//     firstName + ' born in ' + yearOfBirth + ', is now can drive a car'
//   )
// }

// driversLicense5(true)

// // ES6
// function driversLicense6(passedTest) {
//   // if block
//   if (passedTest) {
//     let firstName = 'John'
//     const yearOfBirth = 1990
//   }
//   // will cause error, as firstName and yearOfBirth in different BLOCK
//   //   console.log(
//   //     firstName + ' born in ' + yearOfBirth + ', is now can drive a car'
//   //   )
// }

// driversLicense6(true)

// function driversLicense6_2(passedTest) {
//   let firstName
//   const yearOfBirth = 1990

//   // if block
//   if (passedTest) {
//     firstName = 'John'
//   }
//   console.log(
//     firstName + ' born in ' + yearOfBirth + ', is now can drive a car'
//   )
// }

// driversLicense6_2(true)

// let i = 25

// // `let i` in for is different
// for (let i = 0; i < 5; i++) {
//   console.log(i)
// }

// console.log(i)

// *****************************************************************************
// BLOCKS and IIFEs

// {
//   const a = 1
//   let b = 2

//   var sumAandB = () => {
//     return a + b
//   }
// }
// console.log(sumAandB())

// wll cause error outside of block
// console.log(a + b);

// *****************************************************************************
// STRINGS

// let firstName = 'John'
// let lastName = 'Smith'
// let yearOfBirth = 1984
// function calcAge(yearOfBirth) {
//   return new Date().getFullYear - yearOfBirth
// }

// console.log(
//   `This is ${firstName} ${lastName}. He was born in year of ${yearOfBirth}. He is ${calcAge(
//     yearOfBirth
//   )} years old.`
// )

// const n = `${firstName} ${lastName}`
// console.log(n.startsWith('J'))
// console.log(n.endsWith('h'))
// console.log(n.includes(' '))
// console.log(n.includes('oh'))
// console.log(firstName.repeat(5))
// console.log(`${firstName} `.repeat(5)) // hack to add a space between repeats

// *****************************************************************************
// ARROW FUNCTIONS

// const years = [1960, 1984, 1986, 1991]

// // ES5
// var ages5 = years.map(function(el) {
//   return new Date().getFullYear() - el
// })
// console.log(ages5)

// // ES6
// let ages6 = years.map(el => new Date().getFullYear() - el)
// console.log(ages6)

// ages6 = years.map(
//   (el, index) => `${index + 1}: ${el} -> ${new Date().getFullYear() - el}`
// )
// console.log(ages6)

// *****************************************************************************
// ARROW FUNCTIONS - LEXICAL THIS

// ES5

// not working
// var box5 = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     // `this` here is in method, therefore points to object
//     document.querySelector('.green').addEventListener('click', function() {
//       // `this` here is in a function, therefore points to global object
//       console.log('box ' + this.postMessage + ', color: ' + this.green)
//     })
//   },
// }

// box5.clickMe()

// working example, common pattern in ES5, create var self = this
// var box5_2 = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     // `this` here is in method, therefore points to object
//     var self = this // remember `this`
//     document.querySelector('.green').addEventListener('click', function() {
//       // `this` here is in a function, therefore points to global object
//       // using `self` instead works:
//       console.log('box ' + self.position + ', color: ' + self.color)
//     })
//   },
// }

// box5_2.clickMe()

// var box6 = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     // `this` here is in method, therefore points to object
//     document.querySelector('.green').addEventListener('click', () => {
//       // `this` here is in an arrow function, therefore points to `this` from
//       // its lexical scope (i.e. reusing parent's `this`)
//       console.log('box ' + this.position + ', color: ' + this.color)
//     })
//   },
// }

// box6.clickMe()

// var box66 = {
//   color: 'green',
//   position: 1,
//   clickMe: () => {
//     // `this` here is in method, but, we use arrow function,
//     // therefore `this` points to surroundg lexical scope `this`,
//     // which is a global object.
//     // WE HAVE TO BE VERY CAREFUL WITH ARROWS and not to lose sight of `this`
//     document.querySelector('.green').addEventListener('click', () => {
//       // `this` here is in an arrow function, therefore points to `this` from
//       // its lexical scope (i.e. reusing parent's `this`)
//       console.log('box ' + this.position + ', color: ' + this.color)
//     })
//   },
// }

// // box66.clickMe()

// var friends = ['Bob', 'Jane', 'Mark']

// function Person(name) {
//   this.name = name
// }

// // ES5
// // not working:
// // Person.prototype.myFriends5 = function(friends) {
// //   var arr = friends.map(function(el) {
// //     return this.name + ' is a friend with ' + el
// //   })
// //   return arr
// // }

// Person.prototype.myFriends5 = function(friends) {
//   var arr = friends.map(
//     function(el) {
//       return this.name + ' is a friend with ' + el
//     }.bind(this)
//   )
//   return arr
// }

// // ES6
// Person.prototype.myFriends6 = function(friends) {
//   return friends.map(el => `${this.name} is a friend with ${el}`)
// }

// var john = new Person('John')

// var myFriends5 = john.myFriends5(friends)
// console.log(myFriends5)

// let myFriends6 = john.myFriends6(friends)
// console.log(myFriends6)

// *****************************************************************************
// ARRAYS
const boxes = document.querySelectorAll('.box')

// ES5
// var boxesArray5 = Array.prototype.slice.call(boxes)
// boxesArray5.forEach(function(cur) {
//   cur.style.backgroundColor = 'dodgerblue'
// })

// ES6
// Array.from(boxes).forEach(el => {
//   el.style.backgroundColor = 'dodgerblue'
// })

// if we want to use `break` and `continue`, we cannot use .map or .forEach
// we can use new looping mechanism though:

// for (const el of Array.from(boxes)) {
//   if (el.className.includes('blue')) {
//     continue
//   }
//   el.style.backgroundColor = 'orangered'
// }

// *****************************************************************************
// MAPS

// const questions = new Map()
// window.questions = questions

// questions.set(
//   'question',
//   "What's the official name of the latest major JavaScript version?"
// )

// questions.set(1, 'ES5')
// questions.set(2, 'ES5')
// questions.set(3, 'ES5')
// questions.set(4, 'ES5')
// questions.set('correct', 3)
// questions.set(true, 'correct answer')
// questions.set(false, 'wrong answer, please try again')

// console.log(questions.get('question'))
// console.log(questions.size)

// questions.delete(4)
// console.log(questions.size)

// if (questions.has(4)) {
//   questions.delete(4)
// } else {
//   console.log('key 4 element already deleted')
// }

// questions.forEach((value, key) => {
//   console.log(`${key}: ${value}`)
// })

// for (let key of questions) {
//   console.log(`a key: ${key}`)
// }

// for (let [key, value] of questions.entries()) {
//   console.log(`${key}: ${value}`)
// }

// questions.clear()
// console.log(questions.size)

// *****************************************************************************
// CLASSES

// ES5 "Inheritance"

var Person5 = function(name, yearOfBirth, job) {
  this.name = name
  this.yearOfBirth = yearOfBirth
  this.job = job
}
Person5.prototype.calculateAge = function() {
  return new Date().getFullYear() - this.yearOfBirth
}

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
  Person5.call(this, name, yearOfBirth, job)
  this.olympicGames = olympicGames
  this.medals = medals
}

// inherit the prototype of Person5
Athlete5.prototype = Object.create(Person5.prototype)

Athlete5.prototype.wonAnotherMedal = function() {
  this.medals++
}

var athlete5 = new Athlete5('Anna', 1990, 'pole dancer olympic pro', 3, 10)
console.log(athlete5)
console.log(athlete5.calculateAge())
athlete5.wonAnotherMedal()
console.log(athlete5)

// ES6 INHERITANCE

class Person6 {
  constructor(name, yearOfBirth, job) {
    this.name = name
    this.yearOfBirth = yearOfBirth
    this.job = job
  }

  calculateAge() {
    return new Date().getFullYear() - this.yearOfBirth
  }

  static greeting() {
    console.log('Hey there!')
  }
}

Person6.greeting()

class Athlete6 extends Person6 {
  constructor(name, yearOfBirth, job, olympicGames, medals) {
    super(name, yearOfBirth, job)
    this.olympicGames = olympicGames
    this.medals = medals
  }

  wonAnotherMedal() {
    this.medals++
  }
}

var athlete6 = new Athlete6('Anna', 1990, 'pole dancer olympic pro', 3, 10)
console.log(athlete6)
console.log(athlete6.calculateAge())
athlete6.wonAnotherMedal()
console.log(athlete6)
