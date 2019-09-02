import { elements } from './base'
import { compose } from 'rambda'

export const getInput = () => elements.searchInput.value

export const clearInput = () => {
  elements.searchInput.value = ''
}

export const clearResults = () => {
  elements.searchResultsList.innerHTML = ''
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

export const renderResults = recipes => {
  recipes.forEach(renderRecipe)
}
