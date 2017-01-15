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
			<form className="form-horizontal">
				<div className="row">
					<div className="form-group">
						<label htmlFor="inputUsername3" className="col-xs-3 control-label">Uporabniško ime</label>
						<div className="col-xs-8">
							<input type="text" className="form-control" id="inputUsername3" placeholder="Uporabniško ime" onChange={this.handleUsernameChange} />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="inputPassword3" className="col-xs-3 control-label">Geslo</label>
						<div className="col-xs-8">
							<input type="password" className="form-control" id="inputPassword3" placeholder="Geslo" onChange={this.handlePasswordChange}/>
						</div>
					</div>
					<div className="form-group">
						<div className="col-xs-12">
							<button type="submit" onClick={this.loginUser.bind(this)} className="btn btn-default">Vpiši me</button>
						</div>
					</div>
					{errText}
				</div>
			</form>
		);
	}

	loginUser(event) {
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
				return response.json();
			} else {
				return false;
			}
		})
		.then((userJson) => {
			console.log(userJson);
			if(typeof userJson !== 'object') {
				this.setState({wrongCredentials: true});
			} else {
				localStorage.setItem("user", JSON.stringify(userJson.user));
				this.props.history.push("menu");
			}
		});

		event.preventDefault();
	}

}

export default Login;
