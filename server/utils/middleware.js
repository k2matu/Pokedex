const logger = require('./logger');

const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method);
	logger.info('Path:  ', req.path);
	logger.info('Body:  ', req.body);
	logger.info('---');
	next();
};

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
	logger.error(err.message);

	if (err.code === '23505') {
		return res.status(409).json({ error: 'Username already exists' });
	} else if (err.status) {
		return res.status(err.status).json({ error: err.message });
	} else {
		return res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
};
