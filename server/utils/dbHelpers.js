const checkIfExist = (result, type) => {
	if (result.rows.length === 0) {
		const err = new Error(`${type} not found`);
		err.status = 404;
		throw err;
	}
	return result.rows[0];
};

module.exports = {
	checkIfExist,
};
