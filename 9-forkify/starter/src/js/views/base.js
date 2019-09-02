import {
  DM_SEARCH_FORM,
  DM_SEARCH_INPUT,
  DM_SEARCH_RESULTS_LIST,
  DM_SEARCH_RESULTS,
  DM_LOADER,
  DM_SEARCH_RESULTS_PAGES,
} from '../../constants'

import icons from '../../../assets/img/icons.svg'

export const elements = {
  searchForm: document.querySelector(DM_SEARCH_FORM),
  searchInput: document.querySelector(DM_SEARCH_INPUT),
  searchResults: document.querySelector(DM_SEARCH_RESULTS),
  searchResultsList: document.querySelector(DM_SEARCH_RESULTS_LIST),
  searchResultsPages: document.querySelector(DM_SEARCH_RESULTS_PAGES),
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
