import React from "react";
import Login from "./Login";

import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

class Navbar extends React.Component {
	render() {
		let signedIn;
		if (typeof localStorage !== 'undefined') {
			let user = JSON.parse(localStorage.getItem('user'));
			if(user) {
				signedIn = <DropdownButton title={user.displayName}>
					<MenuItem onClick={this.logout.bind(this)}>Odjava</MenuItem>
				</DropdownButton>;
			}
		}

		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container-fluid">
					<a className="navbar-title" onClick={this.changeState.bind(this, "/menu")}>RitmTipkovnica</a>
					{signedIn}
				</div>
			</nav>
		);
	}

	changeState(link) {
		this.props.history.push(link);
	}

	logout() {
		if(typeof localStorage !== "undefined") {
			localStorage.removeItem("user");
			this.changeState("/");
		}
	}
}

export default Navbar;
