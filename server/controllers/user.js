const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const pool = require('../utils/db')

userRouter.get('/', async (req, res) => {
	try {
		const result = await pool.query(`SELECT * from users`)
		res.json(result.rows)
	} catch (err) {
		console.error(err)
		res.status(500).json({error: 'Internal server error'})
	}
})

userRouter.get('/:username', async (req, res) => {
	const {username} = req.params
	try {
		const result = await pool.query('SELECT * FROM users WHERE username = $1', [username])
		if (result.rows.length === 0) {
			return res.status(404).json({error: 'User not found'})
		} res.json(result.rows[0])
	} catch (err) {
		console.error(err)
		res.status(500).json({error: 'Internal server error'})
	}
})

userRouter.delete('/:username', async (req, res) => {
	const {username} = req.params
	try {
		const result = await pool.query('DELETE FROM users WHERE username = $1 RETURNING *', [username])
		if (result.rows.length === 0) {
			return res.status(404).json({error: 'User not found'})
	}
	res.json({message: 'User deleted successfully'})
	res.status(204).end()
	} catch (err) {
		console.error(err)
		res.status(500).json({error: 'Internal server error'})
	}
})

userRouter.post('/', async (req, res) => {
	const { email, username, password } = req.body
	const saltRounds = 10
	if (!username || !email || !password) {
		return res.status(400).json({error: 'All fields are required'})
	}
	
	try {
		const passwordHash = await bcrypt.hash(password, saltRounds)
		const result = await pool.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *', [username, email, passwordHash])
		res.status(201).json(result.rows[0])
	} catch (err) {
		console.error(err)
		res.status(500).json({error: 'Internal server error'})
	}
})

userRouter.patch('/:username/password', async (req, res) => {
	const { username } = req.params
	const { newPassword } = req.body
	const saltRounds = 10
	
	try {
		const passwordHash = await bcrypt.hash(newPassword, saltRounds)
		const result = await pool.query('UPDATE users SET password_hash = $1 WHERE username = $2 RETURNING *', [passwordHash, username])
		if (result.rows.length === 0) {
			return res.status(404).json({error: 'User not found'})
	}
	res.json(result.rows[0])
}catch (err) {
		console.error(err)
		res.status(500).json({error: 'Internal'})
	}
})

userRouter.patch('/:username', async (req, res) => {
	const { username } = req.params
	const { newUsername } = req.body
	
	try {
		const result = await pool.query('UPDATE users SET username = $1 WHERE username = $2 RETURNING *', [newUsername, username])
		if (result.rows.length === 0) {
			return res.status(404).json({error: 'User not found'})
	}
	res.json(result.rows[0])
}catch (err) {
		console.error(err)
		res.status(500).json({error: 'Internal'})
	}
})

module.exports = userRouter