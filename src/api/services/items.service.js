import { config, author } from '#config/index.js'
import fetch from 'node-fetch'
import boom from '@hapi/boom'

class ItemsService {
  author;

  constructor() {
    this.author = {
      name: author.name,
      lastname: author.lastname,
    }
  }

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
        author: this.author,
        categories,
        items,
      }
    } catch (error) {
      throw boom.badRequest('[GET ITEMS] - Error al obtener los items', error)
    }
  }

  async getItem(id) {
    try {
      const itemResponse = await fetch(`${config.apiItemsUrl}/${id}`)
      const itemData = await itemResponse.json()

      const description = await this.getItemDescription(id)

      const item = {
        id: itemData.id,
        title: itemData.title,
        price: {
          currency: itemData.currency_id,
          amount: Math.trunc(itemData.price),
          decimals: itemData.price - Math.trunc(itemData.price)
        },
        picture: itemData.thumbnail,
        condition: itemData.condition,
        free_shipping: itemData.shipping.free_shipping,
        sold_quantity: itemData.sold_quantity,
        description: description
      }

      return {
        author: this.author,
        item
      }
    } catch (error) {
      throw boom.notFound('[GET ITEM] - Error al obtener el item', error)
    }
  }

  async getItemDescription(id) {
    try {
      const response = await fetch(`${config.apiItemsUrl}/${id}/description`)
      const data = await response.json()

      return data.plain_text
    } catch (error) {
      throw boom.notFound('[GET ITEM DESC] - Error al obtener la descripción del item', error)
    }
  }
}

export default ItemsService
