const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
	const { username, password } = res.body
})

module.exports = loginRouter