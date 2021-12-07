const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
})

pool
  .connect()
  .then(client => {
    console.log('DB connected!')
    client.release();
  })
  .catch(err => console.log(err))

exports.query = (text, param) => pool.query(text, param)