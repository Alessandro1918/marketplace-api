const { Pool } = require('pg')

let pool;
if (process.env.NODE_ENV === 'dev') {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })
} else {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false },
  })
}

pool
  .connect()
  .then(client => {
    console.log('DB connected!')
    client.release();
  })
  .catch(err => console.log(err))

exports.query = (text, param) => pool.query(text, param)