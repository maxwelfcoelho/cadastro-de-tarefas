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
app.get('/api/task/:id', isLogged, task.getById)
app.post('/api/task/create', isLogged, task.create)
app.delete('/api/task/delete/:id', isLogged, task.remove)
app.patch('/api/task/update', isLogged, task.update)
app.patch('/api/task/completed/:id', isLogged, task.setComplete)

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
})
