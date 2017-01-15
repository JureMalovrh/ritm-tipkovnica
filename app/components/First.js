import React from "react";
import Navbar from "./Navbar";
import Login from "./Login";
import Registration from "./Registration";

class First extends React.Component {
	constructor(props) {
		super(props);
		if (typeof localStorage !== 'undefined') {
			let user = JSON.parse(localStorage.getItem('user'));
			if(user) {
				this.props.history.push("menu");
			}
		}
	}

	render() {
		return (
			<div >
				<Navbar history={this.props.history} />
				<div className="container">
					<div className="row">
						<div className="col-xs-12" style={{"textAlign": "center", "marginBottom": "20px"}}>
							<h4>Dobrodošli na strani RitmTipkovnica, ki vam bo pomagala pri učenju ritma.</h4>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6" style={{"textAlign": "center"}}>
							<h3>Registracija</h3>
							<Registration history={this.props.history} />
						</div>
						<div className="col-sm-6" style={{"textAlign": "center"}}>
							<h3>Prijava</h3>
							<Login history={this.props.history} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default First;
