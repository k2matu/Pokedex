import { Row, Col } from 'react-bootstrap';

const AbilityDisplay = ({ abilities }) => {
	return (
		<div className="mb-4">
			<h3 className="text-center">Abilities:</h3>
			<Row className="justify-content-center">
				{abilities && abilities.length > 0 ? (
					abilities.map((ability, index) => (
						<Col key={index} xs="auto" className="m-1">
							<div className="ability-badge">
								{ability.name}
							</div>
						</Col>
					))
				) : (
					<Col xs="auto">
						<div className="no-abilities text-muted">No abilities found.</div>
					</Col>
				)}
			</Row>
		</div>
	);
};

export default AbilityDisplay;
