const { Pool } = require('pg')

let pool;
if (process.env.NODE_ENV === 'dev') {
  pool = new Pool({
    user: process.env.DB_USER_DEV,
    host: process.env.DB_HOST_DEV,
    database: process.env.DB_NAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    port: process.env.DB_PORT_DEV,
  })
} else {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })
}

pool
  .connect()
  .then(client => {
    console.log('DB \'marketplace\' connected!')
    client.release();
  })
  .catch(err => console.log(err))

exports.query = (text, param) => pool.query(text, param)