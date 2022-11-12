import fetch from 'node-fetch'
import { config } from '#config/index.js'

class ItemsService {
  async getItems(query) {
    try {
      const response = await fetch(`${config.apiSearchUrl}?q=${query}`)
      const data = await response.json()
      const hasCategory = data.available_filters.find(category => category.id === 'category')

      const categories = hasCategory
        ? data.available_filters
            .find(category => category.id === 'category').values
            .sort((a, b) => b.results - a.results)
        : []

      const items = data.results.map(item => (
        {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: Math.trunc(item.price),
            decimals: item.price - Math.trunc(item.price)
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping
        }
      ))

      return {
        author: {
          name: `${config.authorName}`,
          lastname: `${config.authorLastname}`
        },
        categories,
        items,
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default ItemsService
