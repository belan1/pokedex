const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const config = require('config')

const users = require('./routes/api/users')

const app = express()

app.use(cors())

app.use(bodyParser.json())

const db = config.get('mongoURI')

mongoose.connect(db)
    .then(() => {console.log('MongoDB Connected...')})
    .catch(err => {console.log(err)})

// Routes
app.use('/api/user', users)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})