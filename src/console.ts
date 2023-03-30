import * as dotenv from 'dotenv'
import * as mysql from 'mysql2'
import * as redis from 'redis'

dotenv.config()

// test mysql

{
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  pool.query('show tables', (err, result, fields) => {
    console.log('mysql test results')
    console.log(err || result, '\n')
  })
}

// test redis

{
  const client = redis.createClient({
    url: process.env.REDIS_DSN,
  })

  client.connect()
    .then(() => {
      return client.info('server')
    })
    .then(result => {
      console.log('redis test result')
      console.log(result, '\n')
    })
    .catch(err => {
      console.error('redis error')
      console.error(err, '\n')
    })
}
