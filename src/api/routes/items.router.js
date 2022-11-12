import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
  res.send('You have reached the items router')
})

router.get('/:id', async (req, res) => {
  res.send('You have reached the items/:id router')
})

export {
  router
}
