import React from "react";
import Navbar from "./Navbar";

class Settings extends React.Component {
	render() {
		return (
			<div>
				<Navbar signedIn={true} history={this.props.history} />
				<div className="col-md-offset-4 col-md-4">
					Settings
				</div>
			</div>
		);
	}
}

export default Settings;
