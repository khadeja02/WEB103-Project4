import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import customItemsRoutes from './routes/customItemsRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/custom-items', customItemsRoutes)

app.get('/', (req, res) => {
  res.send('DIY Delight API is running')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
