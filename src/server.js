const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

const config = {
  server: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  }
}

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({ status: 'healthy' })
})

app.listen(config.server.port, config.server.host, () => {
  console.log(`App server now listening on http://${config.server.host}:${config.server.port}`)
})
