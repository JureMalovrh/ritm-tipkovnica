import React from "react";
import Navbar from "./Navbar";

class Settings extends React.Component {
	render() {
		return (
			<div>
				<Navbar signedIn={true}/>
				<div className="col-md-offset-4 col-md-4">
					Settings view
				</div>
			</div>
		);
	}
}

export default Settings;
