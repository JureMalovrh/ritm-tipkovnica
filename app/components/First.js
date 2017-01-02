import React from "react";
import Navbar from "./Navbar";
import Login from "./Login";

class First extends React.Component {
	render() {
		return (
			<div >
				<Navbar history={this.props.history} />

				<h3 style={{"textAlign": "center"}}> Dobrodošli na strani RitmTipkovnica, ki vam bo pomagala pri učenju ritma. </h3>
				<h3 style={{"textAlign": "center"}}> V kolikor se še niste registrirali lahko to storite zdaj, ... </h3>

				<h1 style={{"textAlign": "center"}}> Registracija </h1>
				<form className="form-horizontal col-md-offset-4 col-md-4">
					
					<div className="form-group">
						<label htmlFor="inputFirstName" className="col-sm-2 control-label">Ime</label>
						<div className="col-sm-10">
							<input type="email" className="form-control" id="inputFirstName" placeholder="Ime" />
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="inputLastName" className="col-sm-2 control-label">Priimek</label>
						<div className="col-sm-10">
							<input type="email" className="form-control" id="inputLastName" placeholder="Priimek" />
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
						<div className="col-sm-10">
							<input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="inputUsername3" className="col-sm-2 control-label">Uporabniško ime</label>
						<div className="col-sm-10">
							<input type="text" className="form-control" id="inputUsername3" placeholder="Uporabniško ime" />
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="inputPassword3" className="col-sm-2 control-label">Geslo</label>
						<div className="col-sm-10">
							<input type="password" className="form-control" id="inputPassword3" placeholder="Geslo" />
						</div>
					</div>

					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button type="submit" onClick={this.loginUser.bind(this)} className="btn btn-default">Registracija</button>
						</div>
					</div>

				</form>


				<h3 style={{"textAlign": "center", "clear": "both"}}> ..., lahko pa se vpišete </h3>

				<Login history={this.props.history}/>

			</div>
		);
	}

	loginUser() {
		// TODO: Add request, axios or something.
		this.props.history.push("menu");
	}
}

export default First;
