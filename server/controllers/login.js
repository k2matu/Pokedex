const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const pool = require('../utils/db');
const { checkIfExist } = require('../utils/dbHelpers');
const { checkIfPasswordCorrect } = require('../utils/auth');

// Login authenication
loginRouter.post('/', async (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res
			.status(400)
			.json({ error: 'Username and password are required' });
	}

	try {
		const result = await pool.query(
			'SELECT * FROM users WHERE username = $1;',
			[username],
		);

		const user = checkIfExist(result, 'User');

		await checkIfPasswordCorrect(password, user);

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
