import React from "react";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.state = {wrongCredentials: false};
	}

	handleUsernameChange(e) {
	   this.setState({username: e.target.value});
	}
	
	handlePasswordChange(e) {
	   this.setState({password: e.target.value});
	}

	render() {
		var errText = <h4></h4>
		if(this.state.wrongCredentials) {
			errText = <h4 style={{"textAlign": "center", "color": "#ff0000"}}> Napačno uporabniško ime ali geslo </h4>
		}
		return (
			<form className="form-horizontal col-md-offset-4 col-md-4">
				<div className="form-group">
					<label htmlFor="inputUsername3" className="col-sm-2 control-label">Uporabniško ime</label>
					<div className="col-sm-10">
						<input type="text" className="form-control" id="inputUsername3" placeholder="Uporabniško ime" onChange={this.handleUsernameChange} />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="inputPassword3" className="col-sm-2 control-label">Geslo</label>
					<div className="col-sm-10">
						<input type="password" className="form-control" id="inputPassword3" placeholder="Geslo" onChange={this.handlePasswordChange}/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-sm-offset-2 col-sm-10">
						<button type="submit" onClick={this.loginUser.bind(this)} className="btn btn-default">Vpiši me</button>
					</div>
				</div>
				{errText}
			</form>
		);
	}

	loginUser(event) {
		// TODO: Add request, axios or something.
		console.log("EMail: " + this.state.username);
		console.log("Password: " + this.state.password);

		fetch('api/user/signin', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    username: this.state.username,
		    password: this.state.password
		  })
		})
		.then((response) => {
			if(response.ok) {
				this.props.history.push("menu");		
			} else {
				console.log(response);
				this.setState({wrongCredentials:true});
			}
		})
		.catch((error) => { console.error("ERROR", error); });
		event.preventDefault();
	}

}

export default Login;
