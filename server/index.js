const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const pool = require('./utils/db')

pool.connect()
	.then(() => {
		logger.info('Connected to PostgreSQL');
		app.listen(config.PORT, () => {
			logger.info(`Server running on port ${config.PORT}`);
		})
	})
	.catch((error) => {
		logger.error('Error connecting to PostgreSQL:', error.message)
		process.exit(1)
	})