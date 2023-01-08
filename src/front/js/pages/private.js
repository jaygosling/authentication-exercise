import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import {Link } from "react-router-dom";

export const Private = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center mt-5">
<h1>PRIVATE</h1>

		</div>
	);
};
