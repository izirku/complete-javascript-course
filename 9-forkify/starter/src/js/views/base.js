import {
  DM_SEARCH_FORM,
  DM_SEARCH_INPUT,
  DM_SEARCH_RESULTS_LIST,
  DM_SEARCH_RESULTS,
  DM_LOADER,
  DM_SEARCH_RESULTS_PAGES,
  DM_RECIPE,
  DM_SEARCH_SHOPPING_LIST,
  DM_LIKES_MENU,
  DM_LIKES_LIST,
} from '../../constants'

import icons from '../../../assets/img/icons.svg'

export const elements = {
  searchForm: document.querySelector(DM_SEARCH_FORM),
  searchInput: document.querySelector(DM_SEARCH_INPUT),
  searchResults: document.querySelector(DM_SEARCH_RESULTS),
  searchResultsList: document.querySelector(DM_SEARCH_RESULTS_LIST),
  searchResultsPages: document.querySelector(DM_SEARCH_RESULTS_PAGES),
  recipe: document.querySelector(DM_RECIPE),
  shoppingList: document.querySelector(DM_SEARCH_SHOPPING_LIST),
  likesMenu: document.querySelector(DM_LIKES_MENU),
  likesList: document.querySelector(DM_LIKES_LIST),
}

export const renderLoader = parent => {
  const loader = `
    <div class="loader">
      <svg>
        <use href="${icons}#icon-cw"></use>
      </svg>
    </div>
    `
  parent.insertAdjacentHTML('afterbegin', loader)
}

export const clearLoader = () => {
  const loader = document.querySelector(DM_LOADER)
  if (loader) {
    loader.parentElement.removeChild(loader)
  }
}

// const limitRecipeTitle = (title, limit = 17) =>
//   title.length <= limit
//     ? title
//     : `${title.substr(
//         0,
//         title.substr(0, limit - title.match(/ /g).length - 1).lastIndexOf(' ')
//       )}…`

// const limitRecipeTitle = (title, limit = 17) =>
//   title.length <= limit
//     ? title
//     : compose(
//         len => title.substr(0, len),
//         len => title.substr(0, len).lastIndexOf(' '),
//         len => len - title.match(/ /g).length - 1
//       )(title.length) + '…'

export const limitRecipeTitle = (title, limit = 17) =>
  title.length <= limit
    ? title
    : `${title.substr(
        0,
        title.substr(0, limit - title.match(/ /g).length - 1).lastIndexOf(' ')
      )}…`
