import express from 'express'
import cors from 'cors'
import { config } from '#config/index.js'

const app = express()
const port = config.port
const env = config.env

app.use(express.json())

const whiteList = ['http://localhost:3000'];
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
  res.send('Hello World!')
})

app.get('/api', (req, res) => {
  res.send(`
    Routes:<br />
    /api/items<br />
    /api/items/:id<br />
  `)
})

app.listen(port, () => {
  env == 'dev' && console.log(`Listening at http://localhost:${port}`)
})
