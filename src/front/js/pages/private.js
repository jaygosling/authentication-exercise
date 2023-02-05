import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Private = () => {
	const { store, actions } = useContext(Context);
	if (sessionStorage.getItem("token")) {
		return (
			<div className="container text-center mt-5">

				<h1>PRIVATE</h1>
				<div>If you can read this, you're in your personal private area</div>
				<button type="button" className="btn btn-primary mt-3" onClick={actions.logout}>Log Out</button>
			</div>
		)
	} else {

		return (
			<div className="container text-center mt-5">

				<h1>PRIVATE</h1>
				<div>You're not logged in.<br />Please log in first</div>
				<Link to="/login">
					<button className="btn btn-primary">Log in</button>
				</Link>


			</div>
		);
	}
};
