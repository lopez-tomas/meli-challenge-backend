import { Router } from 'express'

import { router as itemsRouter } from '#routes/items.router.js'

const router = (app) => {
  const router = Router()
  app.use('/api', router);

  router.use('/items', itemsRouter);
}

export {
  router
}
