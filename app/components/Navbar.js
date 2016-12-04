import React from "react";
import Login from "./Login";

class Navbar extends React.Component {
	render() {
		let signedIn = null;

		if(this.props.signedIn) {
			signedIn = <h4>Testni Uporabnik</h4>;
		} else {
			// TODO: Make it look nice.
			// signedIn = <Login />
		}

		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container-fluid">
					<a className="navbar-title" onClick={this.changeState.bind(this, "menu")}>RitmTipkovnica</a>
					<div className="navbar-user">
						<a onClick={this.changeState.bind(this, "/")}>{signedIn}</a>
					</div>
				</div>
			</nav>
		);
	}

	changeState(link) {
		this.props.history.push(link);
	}
}

export default Navbar;
