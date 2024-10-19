const bcrypt = require('bcryptjs');
const userRouter = require('express').Router();
const pool = require('../utils/db');
const { checkIfExist } = require('../utils/dbHelpers');
const { checkIfPasswordCorrect } = require('../utils/auth');

// Get all users
userRouter.get('/', async (req, res, next) => {
	try {
		const result = await pool.query(
			`SELECT * FROM users;`,
		);

		res.json(result.rows);
	} catch (err) {
		next(err);
	}
});

// Get user by username
userRouter.get('/:username', async (req, res, next) => {
	const { username } = req.params;
	try {
		const result = await pool.query(
			'SELECT * FROM users WHERE username = $1;',
			[username],
		);

		const user = checkIfExist(result, 'User');

		res.json({
			username: user.username,
			email: user.email,
			id: user.id,
		});
	} catch (err) {
		next(err);
	}
});

// Delete user by username
userRouter.delete('/:username', async (req, res, next) => {
	const { username } = req.params;

	try {
		const result = await pool.query(
			'DELETE FROM users WHERE username = $1 RETURNING *;',
			[username],
		);

		const user = checkIfExist(result, 'User');

		res.json({ message: 'User deleted successfully' });
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

// Create a new user
userRouter.post('/', async (req, res, next) => {
	const { email, username, password } = req.body;
	const saltRounds = 10;

	if (!username || !email || !password) {
		return res.status(400).json({ error: 'All fields are required' });
	}

	try {
		const passwordHash = await bcrypt.hash(password, saltRounds);

		const result = await pool.query(
			'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *;',
			[username, email, passwordHash],
		);

		const user = checkIfExist(result, 'User');

		res.status(201).json({
			username: user.username,
			email: user.email,
		});
	} catch (err) {
		next(err);
	}
});

// Update user password
userRouter.patch('/:username/password', async (req, res, next) => {
	const { username } = req.params;
	const { oldPassword, newPassword } = req.body;
	const saltRounds = 10;

	if (!newPassword || !oldPassword) {
		return res
			.status(400)
			.json({ error: 'Both old and new password is required' });
	}

	try {
		const userResult = await pool.query(
			'SELECT * FROM users WHERE username = $1;',
			[username],
		);
		const user = checkIfExist(userResult, 'User');

		await checkIfPasswordCorrect(oldPassword, user);

		const passwordHash = await bcrypt.hash(newPassword, saltRounds);

		const result = await pool.query(
			'UPDATE users SET password_hash = $1 WHERE username = $2 RETURNING *;',
			[passwordHash, username],
		);

		const updatedUser = checkIfExist(result, 'User');

		res.status(200).json({
			username: updatedUser.username,
			email: updatedUser.email,
		});
	} catch (err) {
		next(err);
	}
});

// Update user username
userRouter.patch('/:oldUser/username', async (req, res, next) => {
	const { oldUser } = req.params;
	const { username } = req.body;

	if (!username) {
		return res.status(400).json({ error: 'New username is required' });
	}

	try {
		const result = await pool.query(
			'UPDATE users SET username = $1 WHERE id = $2 RETURNING *;',
			[username, oldUser],
		);

		const user = checkIfExist(result, 'User');

		res.status(200).json({
			username: user.username,
			email: user.email,
		});
	} catch (err) {
		next(err);
	}
});

module.exports = userRouter;
