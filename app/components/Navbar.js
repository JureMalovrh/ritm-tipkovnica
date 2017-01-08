import React from "react";
import Login from "./Login";

class Navbar extends React.Component {
	render() {
		let signedIn;
		if (typeof localStorage !== 'undefined') {
			let user = JSON.parse(localStorage.getItem('user'));
			if(user) {
				//console.log("User", user, user.displayName)
				signedIn = <h2>{user.displayName}</h2>;
				
			}
		}
		
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container-fluid">
					<div> 
						<a className="navbar-title" onClick={this.changeState.bind(this, "menu")}>RitmTipkovnica</a>
					</div>
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
