import dotenv from 'dotenv'
dotenv.config()

const config = {
  env: process.env.RAILWAY_ENVIRONMENT || 'dev',
  port: process.env.PORT || process.env.LOCAL_PORT,
}

export {
  config,
}
