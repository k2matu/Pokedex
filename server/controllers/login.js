const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const pool = require('../utils/db')

loginRouter.post('/', async (req, res) => {
	const { username, password } = req.body
	
	try {
		const result = await pool.query('SELECT * FROM users WHERE username = $1', [username])
		if (result.rows.length === 0) {
			return res.status(401).json({error: 'Invalid username or password'})
	}
	
	console.log(result.rows[0].password_hash)
	const passwordCorrect = await bcrypt.compare(password, result.rows[0].password_hash)
	
	if (!passwordCorrect) {
		return res.status(401).json({error: 'Invalid username or password'})
	}
	
	const userForToken = {
		username: result.rows[0].username,
		id: result.rows[0].id,
	}
	
	const token = jwt.sign(userForToken, process.env.SECRET)
	
	res
	.status(200)
	.json({token, username: result.rows[0].username})
	} catch (err) {
		console.error(err)
		res.status(500).json({error: 'Internal server error1'})
	}
})

module.exports = loginRouter