import express from 'express'
import RoutesManager from './routes'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'

const port = express()

const httpServer = http.createServer(port)

const serverIo = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

serverIo.on('connection', socket => {
  console.log(`Usuário conectado no socket ${socket.id}`)
})

port.use(express.json())

port.use(cors())

port.use(RoutesManager)

port.get('/authorization', (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=ae5ee30d4e5d1df337ec`
  )
})

port.get('/signin/callback', (req, res) => {
  const { code } = req.query

  return res.json(code)
})

export { httpServer, serverIo }
