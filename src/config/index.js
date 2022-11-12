import dotenv from 'dotenv'
dotenv.config()

const config = {
  env: process.env.RAILWAY_ENVIRONMENT || 'dev',
  port: process.env.PORT || process.env.LOCAL_PORT,
  apiSearchUrl: process.env.API_SEARCH_URL,
  apiItemsUrl: process.env.API_ITEMS_URL,
}

const author = {
  name: process.env.AUTHOR_NAME,
  lastname: process.env.AUTHOR_LASTNAME,
}

export {
  config,
  author,
}
