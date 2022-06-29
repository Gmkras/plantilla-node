require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000
const { dbConnect } = require('./config/mongo')

app.use(cors())
app.use(express.json())

app.use('/api/1.0', require('./app/routers'))

dbConnect()
app.listen(PORT, () => {
    console.log('Api lista por el puerto ', PORT)
})