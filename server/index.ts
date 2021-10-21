import * as dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'
dotenv.config()

import { connect } from './libs/mongodb'
import * as user from './controllers/user'
import * as task from './controllers/task'
import { isLogged } from './libs/middlewareLogin'

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3000

app.use(express.static('www'))

connect().then()

app.post('/api/register', user.register)
app.post('/api/login', user.login)

app.get('/api/tasks', isLogged, task.list)

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
})
