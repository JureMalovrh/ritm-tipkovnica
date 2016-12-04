import React from "react";
import Navbar from "./Navbar";

class Achievements extends React.Component {
	render() {
		return (
			<div>
				<Navbar signedIn={true}/>
				<div className="col-md-offset-4 col-md-4">
					Achievements view
				</div>
			</div>
		);
	}
}

export default Achievements;
