import { compose } from 'rambda'
import { elements } from './base'
import icons from '../../../assets/img/icons.svg'

export const getInput = () => elements.searchInput.value

export const clearInput = () => {
  elements.searchInput.value = ''
}

export const clearResults = () => {
  elements.searchResultsList.innerHTML = ''
  elements.searchResultsPages.innerHTML = ''
}

// const limitRecipeTitle = (title, limit = 17) =>
//   title.length <= limit
//     ? title
//     : `${title.substr(
//         0,
//         title.substr(0, limit - title.match(/ /g).length - 1).lastIndexOf(' ')
//       )}…`

const limitRecipeTitle = (title, limit = 17) =>
  title.length <= limit
    ? title
    : compose(
        len => title.substr(0, len),
        len => title.substr(0, len).lastIndexOf(' '),
        len => len - title.match(/ /g).length - 1
      )(title.length) + '…'

const renderRecipe = recipe => {
  const getID = uri => uri.split('#')[1]
  const markup = `
    <li>
      <a class="results__link" href="#${getID(recipe.uri)}">
        <figure class="results__fig">
          <img src="${recipe.image}" alt="Test">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${limitRecipeTitle(recipe.label)}</h4>
          <p class="results__author">${recipe.source}</p>
        </div>
      </a>
    </li>
    `
  elements.searchResultsList.insertAdjacentHTML('beforeend', markup)
}

// type: "prev" or "next"
const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto="${
  type === 'prev' ? page - 1 : page + 1
}">
  <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
  <svg class="search__icon">
    <use href="${icons}#icon-triangle-${
  type === 'prev' ? 'left' : 'right'
}"></use>
  </svg>
</button>
`

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage)
  let button

  switch (true) {
    case page === 1 && pages > 1:
      // next btn only
      button = createButton(page, 'next')
      break
    case page === pages && pages > 1:
      // prev btn only
      button = createButton(page, 'prev')
      break

    case page > 1 && page < pages:
      // both btns
      button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
      `
      break
  }

  if (button) {
    elements.searchResultsPages.insertAdjacentHTML('afterbegin', button)
  }
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage
  const end = page * resPerPage
  recipes.slice(start, end).forEach(renderRecipe)
  renderButtons(page, recipes.length, resPerPage)
}
