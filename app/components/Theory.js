import React from "react";
import Navbar from "./Navbar";

class Theory extends React.Component {
	render() {
		return (
			<div>
				<Navbar signedIn={true} history={this.props.history} />
				<div className="col-md-offset-2 col-md-8 placeholder">
					<div>
						<p>previous</p>
						<p>Chapter 1</p>
						<p>next</p>
					</div>
					<div>
						Text for the theory
					</div>
					<div>
						Quiz for the theory
					</div>
				</div>
			</div>
		);
	}
}

export default Theory;
