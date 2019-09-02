import axios from 'axios'
import { BASE_URL } from '../../constants'
import { API_APP_ID, API_KEY } from '../../edamamKey'

export default class Search {
  constructor(query) {
    this.query = query
  }

  async getResults() {
    try {
      const result = await axios(
        `${BASE_URL}/search?q=${this.query}&from=0&to=50&app_id=${API_APP_ID}&app_key=${API_KEY}`
      )
      this.result = result.data.hits.map(item => item.recipe)
      //   console.log(this.recipies)
    } catch (err) {
      console.error('[error]', err)
    }
  }
}
