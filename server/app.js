const express = require('express')
const app = express()
const cors = require('cors')
const pokemonRouter = require('./controllers/pokemon')
const userRouter = require('./controllers/user')
const axios = require('axios')
const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

app.use(cors())
app.use(express.json())

app.use('/api/pokemon', pokemonRouter)
app.use('/api/user', userRouter)

module.exports = app