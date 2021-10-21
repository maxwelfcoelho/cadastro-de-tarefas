import * as dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'
dotenv.config()

import * as user from './controllers/user'

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3000

app.use(express.static('www'))

app.post('/api/register', user.register)

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
})
