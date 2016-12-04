import React from "react";
import Login from "./Login";

class Navbar extends React.Component {
	render() {
		let signedIn = null;

		if(this.props.signedIn) {
			signedIn = <h4>Signed in as Testni Uporabnik</h4>;
		} else {
			signedIn = <Login />
		}

		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-right">
						{signedIn}
					</div>
					<div className="nav-bar">
						<a href="/menu">
							RitmTipkovnica
						</a>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
