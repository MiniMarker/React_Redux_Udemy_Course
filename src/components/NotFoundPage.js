import {Link} from "react-router-dom";
import React from "react";

const NotFoundPage = () => (
	<div>
		<p>404</p>
		<Link to={"/"}>Go home</Link>

	</div>
);

export default NotFoundPage;