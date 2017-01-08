import React from "react";
import Navbar from "./Navbar";

class Achievements extends React.Component {
	constructor(props) {
		super(props);
		if (typeof localStorage !== 'undefined') {
			let user = JSON.parse(localStorage.getItem('user'));
			if(!user) {
				this.props.history.push("/");
			}
		}
	}
	
	render() {
		return (
			<div>
				<Navbar signedIn={true} history={this.props.history} />
				<div className="col-md-offset-4 col-md-4">
					Achievements
				</div>
			</div>
		);
	}
}

export default Achievements;
