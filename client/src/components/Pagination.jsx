import Pagination from 'react-bootstrap/Pagination';

const PageRendering = ({ totalPokemons, pokemonPerPage, currentPage, onPageChange }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPokemons / pokemonPerPage); i++) {
		pageNumbers.push(i);
	}

	if (totalPokemons > 0) {
		return (
			<Pagination>
				<Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
				{pageNumbers.map((number) => (
					<Pagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)}>
						{number}
					</Pagination.Item>
				))}
				<Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === pageNumbers.length} />
			</Pagination>
		);
	}
};

export default PageRendering;
