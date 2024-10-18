import { Row, Col } from 'react-bootstrap';

const TypeDisplay = ({ types }) => {
	return (
		<div className="mb-4">
			<h3 className="text-center">Type:</h3>
			{types && types.length > 0 ? (
				<Row className="justify-content-center">
					{types.map((typeInfo, index) => (
						<Col key={index} xs="auto" className="m-1">
							<div className="type-badge">
								<img
									src={`/pokemon/types/${typeInfo.name}.png`}
									height="20px"
									alt={typeInfo.name}
								/>
							</div>
						</Col>
					))}
				</Row>
			) : (
				<p className="text-center text-muted">Unknown</p>
			)}
		</div>
	);
};

export default TypeDisplay;