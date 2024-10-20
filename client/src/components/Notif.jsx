import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notif = () => {
	const notification = useSelector((state) => state.notif.notis);
	const visible = useSelector((state) => state.notif.visible);
	const type = useSelector((state) => state.notif.type);

	return (
		<div className="m-0">
			{visible && (
				<Alert variant={type} className="m-0">
					{notification}
				</Alert>
			)}
		</div>
	);
};

export default Notif;