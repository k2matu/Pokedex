import { setSortType } from '../../reducers/pokemonReducer'
import { useSelector, useDispatch } from 'react-redux'

const SortDropDown = () => {
	const dispatch = useDispatch()

	const sortType = useSelector((state) => state.pokemon.sortType)

	return (
		<div>
			<p>Sort By</p>
			<select
				value={sortType}
				onChange={(e) => dispatch(setSortType(e.target.value))}>
				<option value="A-Z">A-Z</option>
				<option value="Z-A">Z-A</option>
				<option value="Lowest">Lowest Number (First)</option>
				<option value="Highest">Highest Number (First)</option>
			</select>
		</div>
	)
}

export default SortDropDown