import express from 'express'
import url from 'url'
import ItemsService from '#services/items.service.js'
import { validatorHandler } from '#middlewares/validator.handler.js'
import { getItemSchema } from '#interfaces/items/item.dto.js'

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

router.get('/:id',
  validatorHandler(getItemSchema, 'params'),
  async (req, res) => {
    const { id } = req.params

    try {
      const item = await service.getItem(id)

      res.status(200).json(item)
    } catch (error) {
      console.error(error)
      res.status(404).send(error)
    }
  }
)

export {
  router
}
