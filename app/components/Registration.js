import React from "react";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);

		this.state = {errorCreatingUser: false, errorText: ""};
	}

	handleUsernameChange(e) {
		this.setState({username: e.target.value});
	}

	handlePasswordChange(e) {
		this.setState({password: e.target.value});
	}

	handleFirstNameChange(e) {
		this.setState({firstName: e.target.value});
	}

	handleLastNameChange(e) {
		this.setState({lastName: e.target.value});
	}

	handleEmailChange(e) {
		this.setState({email: e.target.value});
	}

	render() {
		var errText = <h4></h4>
		if(this.state.errorCreatingUser) {
			errText = <h4 style={{"textAlign": "center", "color": "#ff0000"}}>  </h4>
		}
		return (
			<form className="form-horizontal">
				<div className="row">
					<div className="form-group">
						<label htmlFor="inputFirstName" className="col-xs-3 control-label">Ime</label>
						<div className="col-xs-8">
							<input type="email" className="form-control" id="inputFirstName" placeholder="Ime" onChange={this.handleFirstNameChange} />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="inputLastName" className="col-xs-3 control-label">Priimek</label>
						<div className="col-xs-8">
							<input type="email" className="form-control" id="inputLastName" placeholder="Priimek" onChange={this.handleLastNameChange} />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="inputEmail" className="col-xs-3 control-label">Email</label>
						<div className="col-xs-8">
							<input type="email" className="form-control" id="inputEmail" placeholder="Email" onChange={this.handleEmailChange} />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="inputUsername" className="col-xs-3 control-label">Uporabniško ime</label>
						<div className="col-xs-8">
							<input type="text" className="form-control" id="inputUsername" placeholder="Uporabniško ime" onChange={this.handleUsernameChange} />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="inputPassword" className="col-xs-3 control-label">Geslo</label>
						<div className="col-xs-8">
							<input type="password" className="form-control" id="inputPassword" placeholder="Geslo" onChange={this.handlePasswordChange} />
						</div>
					</div>
					<div className="form-group">
						<div className="col-xs-12">
							<button type="submit" onClick={this.registerUser.bind(this)} className="btn btn-default">Registracija</button>
						</div>
					</div>
					{errText}
				</div>
			</form>
		);
	}

	registerUser(event) {
		fetch('api/user/register', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    username: this.state.username,
		    password: this.state.password,
		    firstName: this.state.firstName,
		    lastName: this.state.lastName,
		    email: this.state.email
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
			if(userJson !== false) {
				localStorage.setItem("user", JSON.stringify(userJson.user));
				this.props.history.push("menu");
			} else {
				this.setState({errorCreatingUser:true});
			}
		});

		event.preventDefault();
	}

}

export default Login;
