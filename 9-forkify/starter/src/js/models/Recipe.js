import axios from 'axios'
import { BASE_URL, RECEPIE_URL } from '../../constants'
import { API_APP_ID, API_KEY } from '../../edamamKey'

// "http://www.edamam.com/ontologies/edamam.owl#recipe_65c39de6ee1e5ff6ce8093f0c6261b73"

// function wordSwap(match, p1) {
//   console.log(match)
//   switch (p1.toLowerCase()) {
//     case 'tablespoon':
//       return 'tbsp'
//     case 'teaspoon':
//       return 'tsp'
//     case 'ounce':
//       return 'oz'
//     case 'cup':
//       return 'cup'
//     case 'pound':
//       return 'lb'
//   }
// }

const unitMap = new Map([
  ['tablespoon', 'tbsp'],
  ['teaspoon', 'tsp'],
  ['ounce', 'oz'],
  ['cup', 'cup'],
  ['pound', 'lb'],
])

const fractionalMap = new Map([
  ['¼', '1/4'],
  ['½', '1/2'],
  ['¾', '3/4'],
  ['⅐', '1/7'],
  ['⅑', '1/9'],
  ['⅒', '1/9'],
  ['⅓', '1/3'],
  ['⅔', '2/3'],
  ['⅕', '1/5'],
  ['⅖', '2/5'],
  ['⅗', '3/5'],
  ['⅘', '4/5'],
  ['⅙', '1/6'],
  ['⅚', '5/6'],
  ['⅛', '1/8'],
  ['⅜', '3/8'],
  ['⅝', '5/8'],
  ['⅞', '7/8'],
  ['↉', '0/3'],
])

const wordSwap = (_match, p1) => unitMap.get(p1.toLowerCase())
const fractionSwap = match => fractionalMap.get(match)

export default class Recipe {
  constructor(id) {
    this.id = id
  }

  async getRecipe() {
    try {
      const result = await axios(
        `${BASE_URL}/search?r=${encodeURIComponent(
          RECEPIE_URL + this.id
        )}&app_id=${API_APP_ID}&app_key=${API_KEY}`
      )
      //   this.result = result.data[0]
      this.title = result.data[0].label
      this.author = result.data[0].source
      this.img = result.data[0].image
      this.url = result.data[0].shareAs
      this.ingredients = result.data[0].ingredientLines
      this.parseIngredients()
      //   this.ingredients = result.data[0].ingredients
      //   this.ingredients = result.data[0].ingredients.map(
      //     ({ text, weight, measure }) => measure === "undefineds"
      //   )
      this.time = result.data[0].totalTime
      this.servings = result.data[0].yield

      //   this.parseIngredients()

      //   this.result = result.data.hits.map(item => item.recipe)
      //   console.log(this)
    } catch (err) {
      console.error('[error]', err)
    }
  }

  parseIngredients() {
    const rxUnicodeFractions = /[¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞↉]/

    const newIngredients = this.ingredients.map(el => {
      // uniform units
      let ingredient = el.replace(
        /(teaspoon|tablespoon|ounce|cup|pound)(s)?/gi,
        wordSwap
      )
      // uniform fractions
      while (rxUnicodeFractions.test(ingredient)) {
        ingredient = ingredient.replace(rxUnicodeFractions, fractionSwap)
      }

      // remove parens and all of their contents
      ingredient = ingredient.replace(/ *\([^\)]*\) */g, '')

      // parse ingredients into: count, unit, ingredient

      return ingredient
    })
    this.ingredients = newIngredients
  }
  //   // Parse ingredients
  //   parseIngredients() {
  //     const newIngredients = this.ingredients.map(ingredient => {
  //       let result = {
  //         food: ingredient.food,
  //         text: ingredient.text,
  //         description: '',
  //       }

  //       // Edit for plurals and language edge cases
  //       ingredient.measure = this.parseMeasurement(
  //         ingredient.quantity,
  //         ingredient.measure
  //       )
  //       // It's cooking, not chemistry
  //       ingredient.weight = ingredient.weight.toFixed(1) // Will eventually look to round this properly and remove the decimal when .0

  //       // Ideally use the quantity plus the unit of measurement, but if ingredient.measure is gram use ingredient.weight instead
  //       // If there's no unit of measurement but there is a quantity, use ingredient.quantity + ingredient.food
  //       if (ingredient.quantity && ingredient.measure !== 'gram') {
  //         // NB: a quantity of '1' with a <unit> type is usually suspect (1 black pepper, 1 milk chocolate etc), add gram weight + food type
  //         // 'Egg' is an exception
  //         if (ingredient.measure === '<unit>') {
  //           result.description =
  //             ingredient.quantity === 1 && ingredient.food.toLowerCase() !== 'egg'
  //               ? `${ingredient.food} (${ingredient.weight}g)`
  //               : `${ingredient.quantity} ${ingredient.food} (${ingredient.weight}g)`
  //         }
  //         // Else use quantity + the parsed unit
  //         else {
  //           result.description = `${ingredient.quantity} ${ingredient.measure} of ${ingredient.food}`
  //         }
  //       }
  //       // If there's no quantity or weight, use 'to taste'
  //       else if (!ingredient.quantity && !ingredient.weight) {
  //         result.description = `to taste`
  //       }
  //       // Else just use the gram weight
  //       else {
  //         result.description = `${ingredient.food} (${ingredient.weight}g)`
  //       }
  //       return result
  //     })

  //     this.parsedIngredients = newIngredients
  //   }

  //   parseMeasurement(quantity, measurement) {
  //     // Ignore <unit> as a measurement
  //     if (measurement === '<unit>') return measurement
  //     // If the quantity is not exactly one, make the measurement plural
  //     else if (quantity !== 1) {
  //       // Add unusual cases here
  //       switch (measurement) {
  //         case 'leaf':
  //           return 'leaves'
  //         default:
  //           return `${measurement}s`
  //       }
  //     } else {
  //       return measurement
  //     }
  //   }
}
