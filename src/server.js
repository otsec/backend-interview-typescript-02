const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const config = {
  server: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  },
  mysql: {
    host: process.env.MYSQL_HOST_IP,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  prospect: {
    baseUrl: process.env.PROSPECT_BASE_URL,
    apiKey: process.env.PROSPECT_API_KEY
  },
}

const pool = mysql.createPool(config.mysql)

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({ status: 'healthy' })
})

app.get('/email-verifications', (req, res) => {
  pool.query(
    `SELECT email_verification.*, email.email
     FROM email_verification
     JOIN email ON email.id = email_verification.email_id
     ORDER BY email.last_verified_at`,
    (err, results) => {
      if (err) {
        return res.send(err)
      } else {
        return res.send(results)
      }
    })
})

app.post('/email-verification', (req, res) => {
  axios
    .post(
      config.prospect.baseUrl + '/api/v1/email-verifier',
      {email: [req.body.email]},
      {headers: {'Authorization': 'Bearer ' + config.prospect.apiKey}}
    )
    .then(function (response) {
      pool.query('INSERT INTO email (email) VALUES (?)', [req.body.email], function (err, result) {
        pool.query('INSERT INTO email_verification (email_id, result) VALUES (?, ?)', [result.insertId, 'success'], function (err, result) {
          return res.send(response)
        })
      })
    })
    .catch(function (error) {
      return res.send(error)
    })
})

app.listen(config.server.port, config.server.host, () => {
  console.log(`App server now listening on http://${config.server.host}:${config.server.port}`)
})
