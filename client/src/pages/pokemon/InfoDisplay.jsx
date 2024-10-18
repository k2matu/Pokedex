import React from 'react';
import { Row, Col } from 'react-bootstrap';

const InfoDisplay = ({ type, value, metric }) => {
	return (
		<div className="mb-4">
			<h3 className="text-center">{type}</h3>
			<Row className="justify-content-center">
				<Col xs="auto">
					<div className="info-badge">
						{value} {metric}
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default InfoDisplay;