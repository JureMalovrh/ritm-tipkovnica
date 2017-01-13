import React from "react";
import Navbar from "./Navbar";

class Achievements extends React.Component {
		constructor(props) {

			super(props);

			this.state = {
				last10lvl1games: undefined,
				last10lvl2games: undefined
			};

			if (typeof localStorage !== 'undefined') {
				let user = JSON.parse(localStorage.getItem('user'));
				if(!user) {
					this.props.history.push("/");
				}
			}

		}

		render() {

			let lvl1Games = [];
			if(this.state.last10lvl1games) {
				let last10lvl1games = this.state.last10lvl1games;
				if(last10lvl1games.length > 0) {
					last10lvl1games.forEach((lastGame, idx) => {
						lvl1Games.push(
							<tr key={lastGame._id}>
								<td> idx</td>
								<td> lastGame.points</td>
								<td> lastGame.allPoints</td>
								<td> lastGame.date</td>
							</tr>
						);
					});
				} else {
					lvl1Games = <p> Nisi odigral še nobenih iger </p>
				}
			}

			let lvl2Games = [];
			if(this.state.last10lvl2games) {
				let last10lvl2games = this.state.last10lvl2games;
				if(last10lvl2games.length > 0) {
					last10lvl2games.forEach((lastGame, idx) => {
						lvl2Games.push(
							<tr key={lastGame._id}>
								<td> idx</td>
								<td> lastGame.points</td>
								<td> lastGame.allPoints</td>
								<td> lastGame.date</td>
							</tr>
						);
					});
				} else {
					lvl2Games = <p> Nisi odigral še nobenih iger </p>
				}
			}

			return (
				<div>
					<Navbar signedIn={true} history={this.props.history} />
					<div className="col-md-offset-2 col-md-8 placeholder">
						<h2> Zadnjih 10 iger stopnje 1</h2>
						<table>
							<tr>
								<th> Igra </th>
								<th> Dobljeno število točk </th>
								<th> Vseh točk </th>
								<th> Datum igre </th>
							</tr>
							{lvl1Games}
						</table>
						<h2> Zadnjih 10 iger stopnje 2</h2>
						<table>
							<tr>
								<th> Igra </th>
								<th> Dobljeno število točk </th>
								<th> Vseh točk </th>
								<th> Datum igre </th>
							</tr>
							{lvl2Games}
						</table>
					</div>
				</div>
			);
		}

		componentDidMount() {
			//console.log(this.state);
			this.callApis();
		}

		callApis() {
			let user;
			if (typeof localStorage !== 'undefined') {
				user = JSON.parse(localStorage.getItem('user'));
			}

			fetch('/api/games/'+user._id+'?sort=date&level=1', {
			  method: 'GET',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  }
			})
			.then((response) => {
				if(response.ok) {
					return response.json();
				} else {
					return false;
				}
			})
			.then((gamesJson) => {
				console.log(gamesJson)
				if(!(gamesJson === false)) {
					this.setState({"last10lvl1games": gamesJson.message});
				}
			})
			.catch((error) => { console.error("ERROR", error); });

			fetch('/api/games/'+user._id+'?sort=date&level=2', {
			  method: 'GET',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  }
			})
			.then((response) => {
				if(response.ok) {
					return response.json();
				} else {
					return false;
				}
			})
			.then((gamesJson) => {
				console.log(gamesJson)
				if(!(gamesJson === false)) {
					this.setState({"last10lvl2games": gamesJson.message});
				}
			})
			.catch((error) => { console.error("ERROR", error); });
		}
	}

export default Achievements;
