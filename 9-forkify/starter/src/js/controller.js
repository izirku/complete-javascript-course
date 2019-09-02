import Search from './models/Search'

/* GLOBAL STATE OF THE APP
 * - Search object
 * - Current recipie object
 * - Shopping list object
 * - Liked recipes
 */
const state = {}

const controlSearch = async () => {
  // 1. get query from view
  const query = 'pizza'

  if (query) {
    // 2. new search object and add to state
    state.search = new Search(query)

    // 3. Prepare UI for results

    // 4. Search for recepies
    await state.search.getResults('pizza')

    // 5. Render results on UI
    console.log(state.search.result)
  }
}

const installEventListeners = () => {
  console.log('installing event listeners...')
  document.querySelector('.search').addEventListener('submit', e => {
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
