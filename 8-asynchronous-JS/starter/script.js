console.log('js code is running...')

// ****************************************************************************
// call-back hell

// function getRecipie() {
//   setTimeout(() => {
//     const recipieId = [123, 456, 789, 321]
//     console.log(recipieId)

//     setTimeout(
//       id => {
//         const recipe = { title: 'Fresh tomato pasta', publisher: 'Jonas' }
//         console.log(`${id}: ${recipe.title}`)

//         setTimeout(
//           id => {
//             const recipe = { title: 'Borsch', publisher: 'Ivan' }
//             console.log(`${id}: ${recipe.title}`)
//           },
//           1500,
//           recipieId[1]
//         )
//       },
//       1000,
//       recipieId[2]
//     )
//   }, 1500)
// }
// getRecipie()

// ****************************************************************************
// PROMISES

// promise is called immediately on creation
// params
//   1. executor function with `resolve` and `reject` params
// const getIDs = new Promise((resolve, reject) => {
//   console.log('executor function is running...')
//   setTimeout(() => {
//     console.log('executor function is running setTimeout callback')
//     resolve([123, 456, 789, 321]) // takes a result
//   }, 1500)
// })

// const getRecipie = recipieID => {
//   return new Promise((resolve, reject) => {
//     setTimeout(
//       () => {
//         const recipe = { title: 'Fresh tomato pasta', publisher: 'Jonas' }
//         resolve(`${recipieID}: ${recipe.title}`)
//       },
//       1000,
//       recipieID
//     )
//   })
// }

// const getRelated = recipieID => {
//   return new Promise((resolve, reject) => {
//     setTimeout(
//       () => {
//         const recipe = { title: 'Fresh tomato pasta', publisher: 'Jonas' }
//         resolve(`${recipieID}: ${recipe.publisher}`)
//       },
//       1000,
//       recipieID
//     )
//   })
// }

// getIDs
//   .then(IDs => {
//     console.log(IDs)
//     return getRecipie(2) // returns a Promise, chain it
//   })
//   .then(result => {
//     console.log(result)
//     return getRelated(2) // returns a Promise, chain it
//   })
//   .then(result => {
//     console.log(result)
//   })
//   .catch(err => {
//     console.log(err)
//   })

// ASYNC/AWAIT way
// async function getRecipies() {
//   const IDs = await getIDs
//   console.log(IDs)
//   const recipe = await getRecipie(IDs[2])
//   console.log(recipe)
//   const author = await getRelated(IDs[2])
//   console.log(author)

//   return recipe // returns a promise that can be consumed
// }
// getRecipies().then(result => console.log(`resolved: ${result}`))
// console.log('End')

//   'https://crossorigin.me/https://www.metaweather.com/api/location/2122265/',

function getWeather(woeid) {
  fetch(
    `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
  )
    .then(result => {
      // let obj = JSON.parse(result)
      //   console.log('result:', result)
      return result.json()
    })
    .then(data => {
      // console.log(data)
      const today = data.consolidated_weather[0]
      console.log(
        `temperatures in ${data.title} stay between ${today.min_temp} and ${today.max_temp}`
      )
    })
    .catch(err => {
      console.log('error occured:', err)
    })
}

// getWeather('2122265') // Moscow
// getWeather('2123260') // St Petersburg

async function getWeatherAW(woeid) {
  try {
    const result = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
    )
    const data = await result.json()
    const today = data.consolidated_weather[0]
    console.log(
      `temperatures in ${data.title} stay between ${today.min_temp.toFixed(
        2
      )} and ${today.max_temp.toFixed(2)}`
    )
    return data // promise
  } catch (e) {
    console.error(err)
  }
}

// getWeatherAW('2122265') // Moscow
//   .then(data => {
//     console.log(data)
//   })
// getWeatherAW('2123260') // St Petersburg

console.log('End')
