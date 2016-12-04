import React from "react";
import Navbar from "./Navbar";

class First extends React.Component {
	render() {
		return (
			<div>
				<Navbar history={this.props.history} />
				<h1 style={{"textAlign": "center"}}> Register </h1>
				<form className="form-horizontal col-md-offset-4 col-md-4">
					<div className="form-group">
						<label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
						<div className="col-sm-10">
							<input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="inputUsername3" className="col-sm-2 control-label">Username</label>
						<div className="col-sm-10">
							<input type="text" className="form-control" id="inputUsername3" placeholder="Username" />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
						<div className="col-sm-10">
							<input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button type="submit" onClick={this.loginUser.bind(this)} className="btn btn-default">Register</button>
						</div>
					</div>
				</form>
			</div>
		);
	}

	loginUser() {
		// TODO: Add request, axios or something.
		this.props.history.push("menu");
	}
}

export default First;
