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

				<h3 style={{"textAlign": "center"}}> Dobrodošli na strani RitmTipkovnica, ki vam bo pomagala pri učenju ritma. </h3>
				<h3 style={{"textAlign": "center"}}> V kolikor se še niste registrirali lahko to storite zdaj, ... </h3>

				<h1 style={{"textAlign": "center"}}> Registracija </h1>
				<Registration history={this.props.history} />

				<h3 style={{"textAlign": "center", "clear": "both"}}> ..., lahko pa se vpišete </h3>

				<Login history={this.props.history}/>

			</div>
		);
	}
}

export default First;
