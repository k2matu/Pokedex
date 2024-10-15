import { useSelector } from "react-redux"

const Notif = () => {
	const notification = useSelector((state) => state.notif.notis)
	const visible = useSelector((state) => state.notif.visible);

	const style = {
		display: visible ? "" : "none",
		border: "solid",
		padding: 10,
		borderWidth: 1,
	}

	return (
		<div style={style}>
			{notification}
		</div>
	)
}

export default Notif;