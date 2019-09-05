import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import { elements, renderLoader, clearLoader } from './views/base'

/* GLOBAL STATE OF THE APP
 * - Search object
 * - Current recipie object
 * - Shopping list object
 * - Liked recipes
 */
const state = {}

// *****************************************************************************
// SEARCH CONTROLLER
const controlSearch = async () => {
  // 1. get query from view
  const query = searchView.getInput()
  console.log(query)

  if (query) {
    // 2. new search object and add to state
    state.search = new Search(query)

    // 3. Prepare UI for results
    searchView.clearInput()
    searchView.clearResults()
    renderLoader(elements.searchResults)

    try {
      // 4. Search for recepies
      await state.search.getResults(query)

      // 5. Render results on UI
      console.log(state.search.result)
      clearLoader()
      searchView.renderResults(state.search.result)
    } catch (err) {
      clearLoader()
      console.error('[error]', err)
    }
  }
}

// *****************************************************************************
// RECIPE CONTROLLER
// #recipe_71460a3ceb1bdddfe73780b9efb22139
// const r = new Recipe('#recipe_71460a3ceb1bdddfe73780b9efb22139')
// r.getRecipe()
// console.log(r)
// const r = new Recipe('#recipe_65c39de6ee1e5ff6ce8093f0c6261b73')
const controlRecipe = async () => {
  const id = window.location.hash
  if (id) {
    console.log(id)
    // prepare UI for changes
    recipeView.clearRecipe()
    renderLoader(elements.recipe)

    // highlight selected search item
    if (state.search) searchView.highlightSelected(id)

    // create new recipe object
    state.recipe = new Recipe(id)

    try {
      // get recipe data
      await state.recipe.getRecipe()

      // calc stuff

      // render recipe
      clearLoader()
      console.log(state.recipe)
      recipeView.renderRecipe(state.recipe)
    } catch (err) {
      clearLoader()
      console.error('[error]', err)
    }
  }
}

const installEventListeners = () => {
  // console.log('installing event listeners...')

  // search query submit
  elements.searchForm.addEventListener('submit', e => {
    e.preventDefault() // prevent page from reloading
    controlSearch()
  })

  // search results render / next / prev buttons in pagination:
  elements.searchResultsPages.addEventListener('click', e => {
    // find closest parent with '.btn-inline' class
    const btn = e.target.closest('.btn-inline')
    if (btn) {
      const goToPage = parseInt(btn.dataset.goto, 10)
      searchView.clearResults()
      searchView.renderResults(state.search.result, goToPage)
    }
  })

  // only fires when url after # has changed or on page load
  ;['hashchange', 'load'].forEach(e => {
    window.addEventListener(e, controlRecipe)
  })

  // TEST
  // window.addEventListener('load', controlRecipe)
}
const init = function() {
  console.log('initializing app...')
  installEventListeners()

  //   console.log(search)
}

export { init }
