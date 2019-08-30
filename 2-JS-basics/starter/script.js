/* *****************************************************************************
 * Variables and data types
 */

/*
console.log('hello world!!!')

var firstName = 'John'
var lastName = 'Smith'
var age = 28

var fullAge = true

console.log(firstName, lastName, age, fullAge)

var job // undefined
console.log(job)

job = 'teacher' // now defined
console.log(job)
*/

/* *****************************************************************************
 * Variables mutation and type coersion
 */

// var firstName = 'John'
// var age = 28

// // Type coercion
// console.log(firstName + ' ' + age) // type coersion converts age to string

// var job, isMarried
// job = 'teacher'
// isMarried = false
// console.log(
//   firstName + ' is a ' + age + ' old ' + job + '. Is he married? ' + isMarried
// )

// // Variable mutation
// age = 'twenty eight'
// job = 'driver'
// console.log(
//   firstName +
//     ' is a ' +
//     age +
//     ' years old ' +
//     job +
//     '. Is he married? ' +
//     isMarried
// )

// prompts
// var lastName = prompt('What is his last Name?')
// console.log(firstName + ' ' + lastName)

/* *****************************************************************************
 * Basic operators
 */

// var year = 2019
// var ageJohn = 28
// var ageMark = 35

// // Math operators
// var yearJohn = year - ageJohn
// var yearMark = year - ageMark
// console.log(yearJohn)
// console.log(yearMark)
// console.log(year + 2)
// console.log(year * 2)
// console.log(year / 2)

// // Logical operators
// var johnOlder = ageJohn > ageMark
// console.log(johnOlder)

// // typeof operator
// console.log(typeof johnOlder)
// console.log(typeof ageJohn)
// console.log(typeof 'foobar')
// var x
// console.log(typeof x)
// console.log(typeof null)

/* *****************************************************************************
 * Operator precedence
 */

// var now = 2019
// var yearJohn = 1989
// var fullAge = 18

// // Multiple operators
// var isFullAge = now - yearJohn >= fullAge
// console.log(isFullAge)

// // Grouping
// var ageJohn = now - yearJohn
// var ageMark = 25
// var average = (ageJohn + ageMark) / 2
// console.log(average)

// // Multiple assignments
// var x, y
// x = y = (3 + 5) * 4 - 6 // asignment is right-to-left
// console.log(x, y)

// // More operators
// x = x * 2
// x *= 2
// x = x + 1
// x++
// x--
// x += 10
// console.log(x)

/* *****************************************************************************
 * CODING CHALLENGE 1
 */

// BMI = mass / height^2 = mass / (height * height)
// var massJohn, massMark, heightJohn, heightMark, bmiJohn, bmiMark, bmiComp
// massJohn = 101.6 // 224 lb
// massMark = 111.58 // 246 lb
// heightJohn = 1.8 // 5'11 ft
// heightMark = 1.8 // 5'11 ft
// bmiJohn = massJohn / heightJohn ** 2
// bmiMark = massMark / heightMark ** 2
// bmiComp = bmiJohn > bmiMark
// console.log(
//   'is John (bmi: ' +
//     bmiJohn +
//     ') fatter than Mark (bmi: ' +
//     bmiMark +
//     ')? ' +
//     bmiComp
// )

/* *****************************************************************************
 * If/Else
 */

// var firstName = 'John'
// var civilStatus = 'single'

// if (civilStatus === 'married') {
//   console.log(firstName + ' is married')
// } else {
//   console.log(firstName + ' is not married')
// }

/* *****************************************************************************
 * Truthy and Falsy values
 */

// falsy:
// undefined, null, 0, '', NaN

// truthy: not falsy

// == operator does type coersion
// var height = 23
// if (height == '23') {
//   console.log('EQUAL!!! not really...')
// }

// teams = [
//   { name: 'John', score: (89 + 120 + 103) / 3 },
//   { name: 'Mike', score: (119 + 94 + 123) / 3 },
//   { name: 'Mary', score: (97 + 134 + 105) / 3 },
// ]

// console.log(teams.sort((p, q) => (p.score > q.score ? 1 : -1))[0].name)
