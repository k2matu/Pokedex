import { setSortType } from '../../reducers/pokemonReducer';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';

const SortDropDown = () => {
	const dispatch = useDispatch();

	const visible = useSelector((state) => state.pokemon.visible);
	const notisVisible = useSelector((state) => state.notif.visible);

	const handleSortChange = (sortValue) => {
		dispatch(setSortType(sortValue));
	};

	if (!visible || notisVisible) {
		return null;
	}

	return (
		<>
			<Dropdown className="d-inline mx-2">
				<Dropdown.Toggle
					id="dropdown-autoclose-true"
					style={{
						backgroundColor: 'white',
						color: '#000',
						borderColor: 'grey'
					}}>
					Sort By
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item onClick={() => handleSortChange('A-Z')}>A-Z</Dropdown.Item>
					<Dropdown.Item onClick={() => handleSortChange('Z-A')}>Z-A</Dropdown.Item>
					<Dropdown.Item onClick={() => handleSortChange('Lowest')}>Lowest Number (First)</Dropdown.Item>
					<Dropdown.Item onClick={() => handleSortChange('Highest')}>Highest Number (First)</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	);
};


export default SortDropDown;