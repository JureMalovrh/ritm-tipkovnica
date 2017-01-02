import React from "react";
import Navbar from "./Navbar";

let links = [{
	name: "Trening",
	route: "training",
}, {
	name: "Teorija",
	route: "theory",
}, {
	name: "Dosežki",
	route: "achievements",
}, {
	name: "Nastavitve",
	route: "Settings",
}];

// TODO: make buttons take all the view possible (whole div), translate menu values.
class Menu extends React.Component {

	constructor(props) {
		super(props);
		//console.log(this.state);
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
