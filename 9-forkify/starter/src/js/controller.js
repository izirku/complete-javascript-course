import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'
import Likes from './models/Likes'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likesView from './views/likesView'
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
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id))
    } catch (err) {
      clearLoader()
      console.error('[error]', err)
    }
  }
}

// *****************************************************************************
// LIST CONTROLLER

const controlList = () => {
  // create a new list if none
  if (!state.list) state.list = new List()

  // add each ingredient to the list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient)
    listView.renderItem(item)
  })
}

// *****************************************************************************
// LIKES CONTROLLER
const controlLike = () => {
  if (!state.likes) state.likes = new Likes()
  const currentId = state.recipe.id

  // user has not yet liked the current recipe
  if (!state.likes.isLiked(currentId)) {
    // add like to the state
    const newLike = state.likes.addLike(
      currentId,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    )

    // toggle the like button
    likesView.toggleLikeBtn(true)

    // add like to the UI list
    likesView.renderLike(newLike)

    // user has liked the current recipe
  } else {
    // remove like to the state
    state.likes.deleteLike(currentId)

    // toggle the like button
    likesView.toggleLikeBtn(false)

    // remove like to the UI list
    likesView.deleteLike(currentId)
  }

  likesView.toggleLikeMenu(state.likes.getNumLikes())
}

// *****************************************************************************
// INITIALIZATION

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

  // handle recipe buttons
  elements.recipe.addEventListener('click', e => {
    switch (true) {
      // decrease servings & ingredients' count
      case e.target.matches('.btn-decrease, .btn-decrease *'):
        if (state.recipe.servings > 1) {
          state.recipe.updateServings('dec')
          recipeView.updateServings(state.recipe)
        }
        break
      // increase servings & ingredients' count
      case e.target.matches('.btn-increase, .btn-increase *'):
        state.recipe.updateServings('inc')
        recipeView.updateServings(state.recipe)
        break
      // add ingredients to shopping list
      case e.target.matches('.recipe__btn--add, .recipe__btn--add *'):
        controlList()
        break
      case e.target.matches('.recipe__love, .recipe__love *'):
        controlLike()
        break
    }
  })

  // handle list delete / update item events
  elements.shoppingList.addEventListener('click', e => {
    const el = e.target.closest('.shopping__item')
    if (el) {
      const id = el.dataset.itemid

      // handle delete:
      switch (true) {
        case e.target.matches('.shopping__delete, .shopping__delete *'):
          // delete from state
          state.list.deleteItem(id)

          // delete from UI
          listView.deleteItem(id)
          break
        // handle count update
        case e.target.matches('.shopping__count-value'):
          state.list.updateCount(id, parseFloat(e.target.value))
          break
      }
    }
  })

  // TEST
  // window.addEventListener('load', controlRecipe)
}

const init = function() {
  console.log('initializing app...')

  // TEST ONLY
  state.likes = new Likes()
  likesView.toggleLikeMenu(state.likes.getNumLikes())

  installEventListeners()

  //   console.log(search)
  window.l = new List()
}

export { init }
