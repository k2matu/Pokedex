import { useSelector } from 'react-redux';
import ShowFavorite from '../user/ShowFavorite';

const SearchUser = () => {
	const users = useSelector((state) => state.user.users);
	const searchUser = useSelector((state) => state.user.searchUser);

	const filteredUsers = users.filter((user) => user.username.includes(searchUser));

	if (filteredUsers[0] && filteredUsers.length < 2) {
		return <ShowFavorite user={filteredUsers[0].username} isTrue={true} />;
	}


};

export default SearchUser;