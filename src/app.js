import express from 'express'
import cors from 'cors'
import { router } from '#routes/index.js'
import { config } from '#config/index.js'

import { logErrors, errorHandler, boomErrorHandler } from '#middlewares/error.handler.js'

const app = express()
const port = config.port
const env = config.env

app.use(express.json())

const whiteList = ['http://localhost:3000', 'http://localhost:5173'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send(`
    Routes:<br />
    /api/items<br />
    /api/items/:id<br />
  `)
})

router(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  env == 'dev' && console.log(`Listening at http://localhost:${port}`)
})
