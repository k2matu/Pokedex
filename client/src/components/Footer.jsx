import { Container } from 'react-bootstrap';

const Footer = () => {
	return (
		<footer className="bg-light text-dark py-4">
			<Container className="text-center">
				GitHub:
				<a href="https://github.com/k2matu/Pokedex" className="text-dark ms-2" target="_blank" rel="noopener noreferrer">
					k2matu
				</a>
			</Container>
		</footer>
	);
};

export default Footer;