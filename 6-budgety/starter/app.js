///////////////////////////////////////////////////////////////////////////////
// MODEL
var model = (function() {
  var state = {
    lineItems: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
    budget: 0,
    percentage: -1,
  }

  var Expense = function(id, description, value) {
    this.id = id
    this.description = description
    this.value = value
    this.percentage = -1
  }

  Expense.prototype = {
    updatePercentage: function(totalInc) {
      this.percentage =
        totalInc > 0 ? Math.round((this.value / totalInc) * 100) : -1
    },
    getPercentage: function() {
      //   return { id: this.id, percentage: this.percentage }
      return this.percentage
    },
  }

  var Income = function(id, description, value) {
    this.id = id
    this.description = description
    this.value = value
  }

  var addItem = function({ type, description, value }) {
    var newItem, id

    // next id
    if (state.lineItems[type].length > 0) {
      id = state.lineItems[type][state.lineItems[type].length - 1].id + 1
    } else {
      id = 0
    }

    if (type === 'inc') {
      newItem = new Income(id, description, value)
    } else if (type === 'exp') {
      newItem = new Expense(id, description, value)
    }

    state.lineItems[type].push(newItem)
    return newItem
  }

  var deleteItem = function(type, id) {
    var idx
    idx = state.lineItems[type].map(({ id }) => id).indexOf(id)
    if (idx !== -1) {
      state.lineItems[type].splice(idx, 1)
    }
  }

  var calcBudget = function() {
    // calculate income and expenses
    ;['inc', 'exp'].forEach(k => {
      state.totals[k] = state.lineItems[k].reduce(
        (acc, { value }) => acc + value,
        0
      )
    })

    // calculate the budget: income - expenses
    state.budget = state.totals.inc - state.totals.exp

    // calculate percentages
    if (state.totals.inc > 0) {
      state.percentage = Math.round((state.totals.exp / state.totals.inc) * 100)
    } else {
      state.percentage = -1
    }
  }

  var calcPercentages = function() {
    state.lineItems.exp.forEach(exp => {
      exp.updatePercentage(state.totals.inc)
    })
  }

  var getBudget = function() {
    return {
      budget: state.budget,
      totalInc: state.totals.inc,
      totalExp: state.totals.exp,
      percentage: state.percentage,
    }
  }

  var getPercentages = function() {
    return state.lineItems.exp.map(exp => exp.getPercentage())
  }

  return {
    addItem,
    deleteItem,
    calcBudget,
    calcPercentages,
    getBudget,
    getPercentages,
  }
})()

///////////////////////////////////////////////////////////////////////////////
// VIEW
var view = (function() {
  var typeDOM = document.querySelector('.add__type')
  var valueDOM = document.querySelector('.add__value')
  var descriptionDOM = document.querySelector('.add__description')
  var addButtonDOM = document.querySelector('.add__btn')
  var incomeListDOM = document.querySelector('.income__list')
  var expenseListDOM = document.querySelector('.expenses__list')
  var budgetDOM = document.querySelector('.budget__value')
  var totalIncDOM = document.querySelector('.budget__income--value')
  var totalExpDOM = document.querySelector('.budget__expenses--value')
  var totalExpPercentDOM = document.querySelector(
    '.budget__expenses--percentage'
  )
  var percentagesSelector = '.item__percentage'
  var dateSelector = '.budget__title--month'

  var formatNumber = function(n, isPositive = true) {
    var fmt
    n = Math.abs(n).toFixed(2)
    n = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    fmt = (isPositive ? '+ ' : '- ') + n
    return fmt
    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    // \B - non-word boundary
  }

  var formatIncomeItem = function({ id, description, value }) {
    return `
    <div class="item clearfix" id="inc-${id}">
      <div class="item__description">${description}</div>
      <div class="right clearfix">
        <div class="item__value">${formatNumber(value)}</div>
        <div class="item__delete">
          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
        </div>
      </div>
    </div>`
  }

  var formatExpenseItem = function({ id, description, value }) {
    return `
    <div class="item clearfix" id="exp-${id}">
      <div class="item__description">${description}</div>
      <div class="right clearfix">
        <div class="item__value">${formatNumber(value, false)}</div>
        <div class="item__percentage">---</div>
        <div class="item__delete">
          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
        </div>
      </div>
    </div>`
  }

  var getInput = function() {
    return {
      type: typeDOM.value, // either `inc` or `exp`
      description: descriptionDOM.value,
      value: parseFloat(valueDOM.value),
    }
  }

  var clearInput = function() {
    valueDOM.value = ''
    descriptionDOM.value = ''
    descriptionDOM.focus()
  }

  var addListItem = function(item, type) {
    type === 'inc'
      ? incomeListDOM.insertAdjacentHTML('beforeend', formatIncomeItem(item))
      : expenseListDOM.insertAdjacentHTML('beforeend', formatExpenseItem(item))
  }

  var deleteListItem = function(selectorId) {
    var child = document.getElementById(selectorId)
    child.parentNode.removeChild(child)
  }

  var displayBudget = function({ budget, totalInc, totalExp, percentage }) {
    budgetDOM.textContent = formatNumber(budget, budget >= 0)
    totalIncDOM.textContent = formatNumber(totalInc)
    totalExpDOM.textContent = formatNumber(totalExp, false)
    totalExpPercentDOM.textContent = percentage > 0 ? percentage + '%' : '---'
  }

  var displayPercentages = function(percentages) {
    var percentageNodes = document.querySelectorAll(percentagesSelector)
    percentageNodes.forEach((el, key) => {
      el.textContent = percentages[key] > 0 ? percentages[key] + '%' : '---'
    })
    // percentages.forEach(({ id, percentage }) => {
    //   document.getElementById(`pers-${id}`).textContent =
    //     percentage > 0 ? percentage + '%' : '---'
    // })
  }

  var displayDate = function() {
    var date, options
    options = { month: 'long', year: 'numeric' }
    date = new Intl.DateTimeFormat('en-US', options).format(new Date())
    document.querySelector(dateSelector).textContent = date
  }

  var changedType = function() {
    typeDOM.classList.toggle('red-focus')
    descriptionDOM.classList.toggle('red-focus')
    valueDOM.classList.toggle('red-focus')
    addButtonDOM.classList.toggle('red')
  }

  return {
    getInput,
    clearInput,
    addListItem,
    deleteListItem,
    displayDate,
    displayBudget,
    displayPercentages,
    changedType,
  }
})()

///////////////////////////////////////////////////////////////////////////////
// CONTROLLER
var controller = (function(model, view) {
  var updateBudget = function() {
    // 1. calculate budget
    model.calcBudget()

    // 2. return budget
    var budget = model.getBudget()

    // 3. update budget UI
    view.displayBudget(budget)
    // console.log(budget)
  }

  var updatePercentages = function() {
    model.calcPercentages()
    var percentages = model.getPercentages()
    view.displayPercentages(percentages)
  }

  var handleAddItem = function() {
    var input,
      newItem,
      // 1. get input
      input = view.getInput()

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      view.clearInput()

      // 2. add income / expense
      newItem = model.addItem(input)

      // 3. add budget line to UI
      view.addListItem(newItem, input.type)

      // 4. calculate and update budget
      updateBudget()

      // 5. calculate and update percentages
      updatePercentages()
    }
  }

  var handleDeleteItem = function(e) {
    var itemId, type, id
    itemId = e.target.parentNode.parentNode.parentNode.parentNode.id
    if (itemId) {
      ;[type, id] = itemId.split('-')
      id = parseInt(id)
      model.deleteItem(type, id)
      view.deleteListItem(itemId)
      updateBudget()
      updatePercentages()
    }
  }

  var app = function() {
    view.displayDate()
    view.displayBudget({ budget: 0, totalInc: 0, totalExp: 0, percentage: 0 })

    document.querySelector('.add__btn').addEventListener('click', handleAddItem)

    document.addEventListener('keypress', e => {
      if (e.keyCode === 13 || e.which === 13) {
        handleAddItem()
      }
    })

    document
      .querySelector('.container')
      .addEventListener('click', handleDeleteItem)

    document
      .querySelector('.add__type')
      .addEventListener('change', view.changedType)
  }

  return { app }
})(model, view)

controller.app()
