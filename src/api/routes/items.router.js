import express from 'express'
import url from 'url'
import fetch from 'node-fetch'
import { config } from '#config/index.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { query } = url.parse(req.url, true)

    const response = await fetch(`${config.apiSearchUrl}?q=${query.search}`)
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

    res.status(200).json({
      author: {
        name: `${config.authorName}`,
        lastname: `${config.authorLastname}`
      },
      categories,
      items
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

router.get('/:id', async (req, res) => {
  res.send('You have reached the items/:id router')
})

export {
  router
}
