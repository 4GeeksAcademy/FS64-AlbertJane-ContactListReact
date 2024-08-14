import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
	const location = useLocation();
	return (
		<nav className="navbar navbar-light bg-light mb-3 mx-5">
			<Link to="/">
				<span className="navbar-brand mb-0 h1"> Contact List</span>
			</Link>
			<div className="ml-auto">

				{
					location.pathname === '/' && 
					<Link to="/add-contact">
						<button className="btn btn-success">Add Contact</button>
					</Link>
				}
				{
					location.pathname === '/add-contact' &&
					<Link to="/">
						<button className="btn btn-success">Contact List</button>
					</Link>
				}
				
			</div>
		</nav>
	);
};
