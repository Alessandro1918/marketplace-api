import 'dotenv/config'  //always the firts import
import express from 'express'
import cors from 'cors'
import { authRoutes } from './routes/authRoutes'
import { itemsRoutes } from './routes/itemsRoutes'

const app = express()
app.use(cors())
app.use(express.json())

//app.use(routes)
app.use('/ml', authRoutes)
app.use('/items', itemsRoutes)

const PORT = process.env.PORT || 2000	//Heroku will have it's own value for process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Enviroment: ${process.env.NODE_ENV}`)
})