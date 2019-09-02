import axios from 'axios'
import { apiKey, apiAppID } from '../../edamamKey'

const baseURL = 'http://cors-anywhere.herokuapp.com/https://api.edamam.com'

export default class Search {
  constructor(query) {
    this.query = query
  }

  async getResults() {
    try {
      const result = await axios(
        `${baseURL}/search?q=${this.query}&from=0&to=50&app_id=${apiAppID}&app_key=${apiKey}`
      )
      this.result = result.data.hits
      //   console.log(this.recipies)
    } catch (err) {
      console.error('[error]', err)
    }
  }
}
