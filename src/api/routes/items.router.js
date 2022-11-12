import express from 'express'
import url from 'url'
import ItemsService from '#services/items.service.js'

const router = express.Router()
const service = new ItemsService()

router.get('/', async (req, res) => {
  const { query } = url.parse(req.url, true)
  try {
    const response = await service.getItems(query.search)

    res.status(200).json(response)
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
