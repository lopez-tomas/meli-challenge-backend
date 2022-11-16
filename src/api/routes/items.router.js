import express from 'express'
import ItemsService from '#services/items.service.js'
import { validatorHandler } from '#middlewares/validator.handler.js'
import { getItemSchema } from '#interfaces/items/item.dto.js'

const router = express.Router()
const service = new ItemsService()

router.get('/', async (req, res, next) => {
  try {
    const response = await service.getItems(req.query.q)

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getItemSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params

    try {
      const item = await service.getItem(id)

      res.status(200).json(item)
    } catch (error) {
      next(error)
    }
  }
)

export {
  router
}
