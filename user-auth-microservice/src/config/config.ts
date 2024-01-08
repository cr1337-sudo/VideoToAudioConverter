import dotenv from 'dotenv'

dotenv.config()

const config = {
  BACK_PORT: process.env.BACK_PORT as string,
  BACK_HOST: process.env.BACK_HOST as string,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID as string,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
  SECRET_JWT: process.env.SECRET_JWT as string
}

export default config
