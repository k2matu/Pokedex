const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const pool = require('../utils/db');
const { checkIfExist } = require('../utils/dbHelpers');

// Helper function to check password
const checkifPasswordCorrect = async (password, user) => {
	const passwordCorrect = await bcrypt.compare(password, user.password_hash);

	if (!passwordCorrect) {
		const err = new Error('Invalid username/password');
		err.status = 401;
		throw err;
	}
};

// Login authenication
loginRouter.post('/', async (req, res, next) => {
	const { username, password } = req.body;
	
	if (!username || !password) {
		return res.status(400).json({ error: 'Username and password are required' });
	}

	try {
		const result = await pool.query('SELECT * FROM users WHERE username = $1', [
			username,
		]);

		const user = checkIfExist(result, 'User');
		await checkifPasswordCorrect(password, user);

		const userForToken = {
			username: user.username,
			id: user.id,
		};

		const token = jwt.sign(userForToken, process.env.SECRET);

		res.status(200).json({ token, username: user.username });
	} catch (err) {
		next(err);
	}
});

module.exports = loginRouter;
