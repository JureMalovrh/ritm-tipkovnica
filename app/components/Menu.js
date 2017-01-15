import React from "react";
import Navbar from "./Navbar";

let links = [{
	name: "Trening",
	route: "training",
}, {
	name: "Teorija",
	route: "theory/1",
}, {
	name: "Dosežki",
	route: "achievements",
}, {
	name: "Lestvica",
	route: "leaderboards",
}, {
	name: "Nastavitve",
	route: "settings",
}];

// TODO: make buttons take all the view possible (whole div).
class Menu extends React.Component {
	constructor(props) {
		super(props);
		if (typeof localStorage !== 'undefined') {
			let user = JSON.parse(localStorage.getItem('user'));
			if(!user) {
				this.props.history.push("/");
			}
		}

		let temp = setInterval(() => {}, 1000);
		for(let i = 0; i <= temp; i++) {
			clearInterval(i);
		}
	}

	render() {
		let menu = [];

		links.forEach((link) => {
			menu.push(
				<a key={link.route} onClick={this.changeState.bind(this, link.route)}>
					<div className="menu">{link.name}</div>
				</a>
			);
		});

		return (
			<div>
				<Navbar signedIn={true} history={this.props.history} />
				<div className="col-md-offset-4 col-md-4">
					{menu}
				</div>
			</div>
		);
	}

	changeState(link) {
		this.props.history.push(link);
	}
}

export default Menu;
