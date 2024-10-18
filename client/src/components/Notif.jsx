import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notif = () => {
	const notification = useSelector((state) => state.notif.notis);
	const visible = useSelector((state) => state.notif.visible);
	const type = useSelector((state) => state.notif.type);

	return (
		<>
			{visible && (
				<Alert variant={type} className="mt-3">
					{notification}
				</Alert>
			)}
		</>
	);
};

export default Notif;