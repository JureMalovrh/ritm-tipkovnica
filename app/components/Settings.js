import React from "react";
import Navbar from "./Navbar";

class Settings extends React.Component {
	constructor(props) {
		super(props);
		if (typeof localStorage !== 'undefined') {
			let user = JSON.parse(localStorage.getItem('user'));
			if(!user) {
				this.props.history.push("/");
			}
		}

		this.KEYS = {
			hit: " ",
			retry: "r",
			next: "n",
			harder: "u",
			easier: "d",
		};

		if(typeof localStorage !== "undefined") {
			let keys = JSON.parse(localStorage.getItem("keys"));

			if(keys) {
				this.KEYS.hit = keys.hit;
				this.KEYS.retry = keys.retry;
				this.KEYS.next = keys.next;
				this.KEYS.harder = keys.harder;
				this.KEYS.easier = keys.easier;
			}
		}
	}

	render() {
		return (
			<div>
				<Navbar signedIn={true} history={this.props.history} />
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<h2>Nastavitve</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<h4>Tipke</h4>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-2">
							<div className="form-group">
								<label htmlFor="inputHit" className="control-label">Udarec</label>
								<input ref="hit" type="text" className="form-control" id="inputHit" placeholder=" " defaultValue={this.KEYS.hit} maxLength={1} />
							</div>
						</div>
						<div className="col-xs-2">
							<div className="form-group">
								<label htmlFor="inputRetry" className="control-label">Ponovi</label>
								<input ref="retry" type="text" className="form-control" id="inputRetry" placeholder="r" defaultValue={this.KEYS.retry} maxLength={1} />
							</div>
						</div>
						<div className="col-xs-2">
							<div className="form-group">
								<label htmlFor="inputNext" className="control-label">Naprej</label>
								<input ref="next" type="text" className="form-control" id="inputNext" placeholder="n" defaultValue={this.KEYS.next} maxLength={1} />
							</div>
						</div>
						<div className="col-xs-2">
							<div className="form-group">
								<label htmlFor="inputHarder" className="control-label">Težje</label>
								<input ref="harder" type="text" className="form-control" id="inputHarder" placeholder="u" defaultValue={this.KEYS.harder} maxLength={1} />
							</div>
						</div>
						<div className="col-xs-2">
							<div className="form-group">
								<label htmlFor="inputEasier" className="control-label">Lažje</label>
								<input ref="easier" type="text" className="form-control" id="inputEasier" placeholder="d" defaultValue={this.KEYS.easier} maxLength={1} />
							</div>
						</div>
					</div>
					<button className="btn btn-default" onClick={this.saveKeys.bind(this)}>Shrani</button>
				</div>
			</div>
		);
	}

	saveKeys() {
		console.log(this.refs.hit.value);
		localStorage.setItem("keys", JSON.stringify({
			hit: this.refs.hit.value,
			retry: this.refs.retry.value,
			next: this.refs.next.value,
			harder: this.refs.harder.value,
			easier: this.refs.easier.value,
		}));
	}
}

export default Settings;
