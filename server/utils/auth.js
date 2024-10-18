const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Extract token from authorization header
const getTokenFrom = (req) => {
	const authorization = req.get('authorization');
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '');
	}
	const err = new Error('Token missing');
	err.status = 401;
	throw err;
};

// Validate token
const validateToken = (token) => {
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!decodedToken.id) {
		const err = new Error('Invalid token');
		err.status = 401;
		throw err;
	}
	return decodedToken;
};

const checkIfPasswordCorrect = async (password, user) => {
	const passwordCorrect = await bcrypt.compare(password, user.password_hash);

	if (!passwordCorrect) {
		const err = new Error('Invalid username/password');
		err.status = 401;
		throw err;
	}
};

module.exports = {
	getTokenFrom,
	validateToken,
	checkIfPasswordCorrect,
};
