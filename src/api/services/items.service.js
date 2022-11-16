import { config, author } from '#config/index.js'
import fetch from 'node-fetch'
import boom from '@hapi/boom'
import { translateItemCondition, getSellerNicknameFromUrl, capitalizeFirstLetter } from '#utils/index.js'

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
          condition: translateItemCondition(item.condition),
          free_shipping: item.shipping.free_shipping,
          seller: {
            id: item.seller.id,
            nickname: getSellerNicknameFromUrl(item.seller.permalink),
            title: capitalizeFirstLetter(item.seller.seller_reputation.power_seller_status),
            level: item.seller.seller_reputation.level_id,
            sales: {
              period: item.seller.seller_reputation.metrics.sales.period,
              completed: item.seller.seller_reputation.metrics.sales.completed,
            },
            location: {
              city: item.seller_address.city.name,
              state: item.seller_address.state.name,
              country: item.seller_address.country.name,
            }
          }
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
      const response = await fetch(`${config.apiItemsUrl}/${id}`)
      const data = await response.json()

      const description = await this.getItemDescription(id)
      const categoryName = await this.getItemCategoryName(data.category_id)

      const item = {
        id: data.id,
        title: data.title,
        price: {
          currency: data.currency_id,
          amount: Math.trunc(data.price),
          decimals: data.price - Math.trunc(data.price)
        },
        picture: data.thumbnail,
        condition: translateItemCondition(data.condition),
        free_shipping: data.shipping.free_shipping,
        sold_quantity: data.sold_quantity,
        description: description,
        category: categoryName,
        available_quantity: data.available_quantity,
        attributes: [...data.attributes],
        warranty: data.warranty,
        sale_terms: [...data.sale_terms],
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

  async getItemCategoryName(id_category) {
    try {
      const response = await fetch(`${config.apiCategoriesUrl}/${id_category}`)
      const data = await response.json()

      return data.name
    } catch (error) {
      throw boom.notFound('[GET ITEM CATEGORY] - Error al obtener la categoría del item', error)
    }
  }

  async getItemSeller(id_seller) {
    try {
      const response = await fetch(`${config.apiSellersUrl}/${id_seller}`)
      const data = await response.json()

      const seller = {
        id: data.id,
        nickname: data.nickname,
        title: data.seller_reputation.power_seller_status,
        level: data.seller_reputation.level_id,
      }

      return seller
    } catch (error) {
      throw boom.notFound('[GET SELLER] - Error al obtener el vendedor del item', error)
    }
  }
}

export default ItemsService
