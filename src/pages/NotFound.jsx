import React from "react";
import { Link } from "react-router";

function NotFound() {
	return (
		<div style={style.container}>
			<h1 style={style.title}>404</h1>
			<p style={style.subTitle}>
				Oops! The page you're looking for doesnt exist
			</p>
			<Link to="/" style={style.link}>
				{" "}
				Go Back Home
			</Link>
		</div>
	);
}

const style = {
	container: {
		textAlign: "center",
		padding: "80px 20px",
		color: "#fff",
	},
	title: {
		fontSize: "80px",
		marginBottom: "20px",
	},
	subTitle: {
		fontWeight: "20px",
		color: "white",
		marginBottom: "10px",
	},
	link: {
		color: "blue",
	},
};

export default NotFound;
