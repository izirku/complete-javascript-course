import { elements } from './base'
import icons from '../../../assets/img/icons.svg'

export const renderItem = item => {
  const markup = `
  <li class="shopping__item" data-itemid="${item.id}">
      <div class="shopping__count">
          <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
          <p>${item.unit}</p>
      </div>
      <p class="shopping__description">${item.ingredient}</p>
      <button class="shopping__delete btn-tiny">
          <svg>
              <use href="${icons}#icon-circle-with-cross"></use>
          </svg>
      </button>
  </li>
  `
  elements.shoppingList.insertAdjacentHTML('beforeend', markup)
}

export const deleteItem = id => {
  console.log('deleting item:', id)

  const item = document.querySelector(`[data-itemid="${id}"]`)
  if (item) item.parentElement.removeChild(item)
}
