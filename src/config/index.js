import dotenv from 'dotenv'
dotenv.config()

const config = {
  env: process.env.RAILWAY_ENVIRONMENT || 'dev',
  port: process.env.PORT || process.env.LOCAL_PORT,
  frontendUrl: process.env.FRONTEND_URL,
  apiSearchUrl: process.env.API_SEARCH_URL,
  apiItemsUrl: process.env.API_ITEMS_URL,
  apiCategoriesUrl: process.env.API_CATEGORIES_URL,
  apiSellersUrl: process.env.API_SELLERS_URL,
}

const author = {
  name: process.env.AUTHOR_NAME,
  lastname: process.env.AUTHOR_LASTNAME,
}

export {
  config,
  author,
}
