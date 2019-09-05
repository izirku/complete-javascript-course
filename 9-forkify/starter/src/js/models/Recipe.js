import axios from 'axios'
import numericQuantity from 'numeric-quantity'

import { BASE_URL, RECEPIE_URL } from '../../constants'
import { API_APP_ID, API_KEY } from '../../edamamKey'

// "http://www.edamam.com/ontologies/edamam.owl#recipe_65c39de6ee1e5ff6ce8093f0c6261b73"

const rxQuantMax = /^\d+\s*-\s*(\d+)$/g
const rxUnicodeFractions = /[¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞↉]/
const rxQuantUnitDescr = /^(\d+ +\d+(?:\/|-)\d+|\d+(?:\/|-)\d+|\d+)?\s*(?:fluid|fl)?\s*(tablespoon|teaspoon|tsp|tbsp|tbs|tbl|tb|t|ounce|oz|package|pkg|pint|pt|quart|qt|gallon|gal|lb|pound|cup|c|gram|kilogram|kg|liter|l|milliliter|ml|large|medium|small|average|avg|leaf|leaves|clove|measure(?:ment)?)?(?:s)?\b\s*(.*)$/gi

const unitMap = new Map([
  ['tablespoon', 'tbsp'],
  ['tbs', 'tbsp'],
  ['tbl', 'tbsp'],
  ['t', 'tbsp'],
  ['teaspoon', 'tsp'],
  ['ounce', 'oz'],
  ['cup', 'cup'],
  ['c', 'cup'],
  ['pound', 'lb'],
  ['package', 'pkg'],
  ['pint', 'pt'],
  ['quart', 'qt'],
  ['gallon', 'gal'],
  ['gram', 'g'],
  ['kilogram', 'kg'],
  ['mililiter', 'ml'],
  ['average', 'avg'],
  ['leaves', 'leaf'],
  ['measurement', 'meas.'],
  ['measure', 'meas.'],
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

// const wordSwap = (_match, p1) => unitMap.get(p1.toLowerCase())
const unitCleanse = u => {
  const clean = unitMap.get(u.toLowerCase())
  return clean ? clean : u.toLowerCase()
}

// convert quantities such as:
// 1/4   => 0.25
// 1 1/2 => 1.5
// 1-2   => 2 (max)
const parseQuantity = q => {
  const n = numericQuantity(q.replace(rxQuantMax, (_m, g1) => g1))
  return n ? n : 0
}

const fractionSwap = match => fractionalMap.get(match)

const parseIngredients = rawIngredients => {
  const ingredients = rawIngredients.map(el => {
    let ingredient = el

    // uniform fractions
    while (rxUnicodeFractions.test(ingredient)) {
      ingredient = ingredient.replace(rxUnicodeFractions, fractionSwap)
    }

    // remove parens and all of their contents
    ingredient = ingredient.replace(/ *\([^\)]*\) */g, ' ')

    // separate quantity, units and description:
    ingredient.replace(rxQuantUnitDescr, (_match, qt, unit, descr) => {
      ingredient = {
        count: qt ? parseQuantity(qt) : 1,
        unit: unit ? unitCleanse(unit) : qt ? 'ct.' : 'to taste',
        ingredient: descr,
      }
    })

    return ingredient
  })

  return ingredients
}

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
      this.title = result.data[0].label
      this.author = result.data[0].source
      this.img = result.data[0].image
      this.url = result.data[0].shareAs
      this.time = result.data[0].totalTime
      this.servings = result.data[0].yield
      this.ingredients = parseIngredients(result.data[0].ingredientLines)
    } catch (err) {
      console.error('[error]', err)
    }
  }

  updateServings(type) {
    // servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1

    // ingredients
    this.ingredients.forEach(ing => {
      ing.count *= newServings / this.servings
    })

    this.servings = newServings
  }
}
