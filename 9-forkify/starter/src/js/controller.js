import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements, renderLoader } from './views/base'

/* GLOBAL STATE OF THE APP
 * - Search object
 * - Current recipie object
 * - Shopping list object
 * - Liked recipes
 */
const state = {}

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

    // 4. Search for recepies
    // await state.search.getResults(query)

    // 5. Render results on UI
    // console.log(state.search.result)
    // searchView.renderResults(state.search.result)
  }
}

const installEventListeners = () => {
  console.log('installing event listeners...')
  elements.searchForm.addEventListener('submit', e => {
    e.preventDefault() // prevent page from reloading
    controlSearch()
  })
}
const init = function() {
  console.log('initializing app...')
  installEventListeners()

  //   console.log(search)
}

export { init }
