const getTokenFrom = (req) => {
	const authorization = req.get('authorization');
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '');
	}
	const err = new Error('Token missing')
	err.status = 401;
	throw err;
};

const validateToken = async (token) => {
	const decodedToken = await jwt.verify(token, process.env.SECRET)
	if (!decodedToken || decodedToken.id) {
		const err = new Error('Invalid token');
		err.status = 401;
		throw err;
	}
	return decodedToken;
}

module.export = {
	getTokenFrom,
	validateToken,
}