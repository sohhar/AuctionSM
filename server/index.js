const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const auctionsUrl = require('./routes/auctions')
const bidsUrl = require('./routes/bids')

dotenv.config()  // store all pwd & keys in .env

// get keys & pwd from .env
const app = express()
const port = process.env.PORT || 5000
const mongoDBUri = process.env.ATLAS_URI || 'mongodb://localhost/auction'

// 2 Middleware
app.use(express.json())         // receive data from frontend in JSON format
app.use(express.urlencoded({ extended: false }))
app.use('/auctions', auctionsUrl)  // auctions collection API
app.use('/bids', bidsUrl)  // bids collections API

// connect to Mondo DB
mongoose.connect(mongoDBUri, { useNewUrlParser: true }) //, useCreateIndex: true
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB connected successfully")
})

// 1 Start backend server listening
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
