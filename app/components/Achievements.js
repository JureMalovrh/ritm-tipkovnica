import React from "react";
import Navbar from "./Navbar";

class Achievements extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			last10lvl1games: undefined,
			last10lvl2games: undefined,
			last10lvl3games: undefined,
			lastAchievements: undefined,
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
							<td>{idx + 1}</td>
							<td>{lastGame.points}</td>
							<td>{lastGame.allPoints}</td>
							<td>{moment(lastGame.date).format("YYYY-MM-DD HH:mm")}</td>
						</tr>
					);
				});
			} else {
				lvl1Games = <tr><td colSpan={4}>Nisi odigral še nobenih iger.</td></tr>
			}
		}

		let lvl2Games = [];
		if(this.state.last10lvl2games) {
			if(this.state.last10lvl2games.length > 0) {
				this.state.last10lvl2games.forEach((lastGame, idx) => {
					lvl2Games.push(
						<tr key={lastGame._id}>
							<td>{idx + 1}</td>
							<td>{lastGame.points}</td>
							<td>{lastGame.allPoints}</td>
							<td>{moment(lastGame.date).format("YYYY-MM-DD HH:mm")}</td>
						</tr>
					);
				});
			} else {
				lvl2Games = <tr><td colSpan={4}>Nisi odigral še nobenih iger.</td></tr>
			}
		}

		let lvl3Games = [];
		if(this.state.last10lvl3games) {
			let last10lvl3games = this.state.last10lvl3games;

			if(last10lvl3games.length > 0) {
				last10lvl3games.forEach((lastGame, idx) => {
					lvl3Games.push(
						<tr key={lastGame._id}>
							<td>{idx + 1}</td>
							<td>{lastGame.points}</td>
							<td>{lastGame.allPoints}</td>
							<td>{moment(lastGame.date).format("YYYY-MM-DD HH:mm")}</td>
						</tr>
					);
				});
			} else {
				lvl3Games = <tr><td colSpan={4}>Nisi odigral še nobenih iger.</td></tr>
			}
		}

		let achievements = [];
		if(this.state.lastAchievements) {
			if(this.state.lastAchievements.length > 0) {
				this.state.lastAchievements.forEach((achievement, idx) => {
					achievements.push(
						<tr key={achievement._id}>
							<td>{achievement.text}</td>
							<td>{achievement.description}</td>
							<td>{moment(achievement.date).format("YYYY-MM-DD HH:mm")}</td>
						</tr>
					);
				});
			} else {
				achievements = <tr><td colSpan={3}>Trenutno nimaš nobenih dosežkov.</td></tr>
			}
		}

		return (
			<div>
				<Navbar signedIn={true} history={this.props.history} />
				<div className="container">
					<div className="row">
						<div className="col-sm-4">
							<h3 className="text-center">Prva stopnja</h3>
							<br />
							<table className="table">
								<thead>
									<tr>
										<th>#</th>
										<th>Točke</th>
										<th>Skupaj</th>
										<th>Datum</th>
									</tr>
								</thead>
								<tbody>
									{lvl1Games}
								</tbody>
							</table>
						</div>
						<div className="col-sm-4">
							<h3 className="text-center">Druga stopnja</h3>
							<br />
							<table className="table">
								<thead>
									<tr>
										<th>#</th>
										<th>Točke</th>
										<th>Skupaj</th>
										<th>Datum</th>
									</tr>
								</thead>
								<tbody>
									{lvl2Games}
								</tbody>
							</table>
						</div>
						<div className="col-sm-4">
							<h3 className="text-center">Tretja stopnja</h3>
							<br />
							<table className="table">
								<thead>
									<tr>
										<th>#</th>
										<th>Točke</th>
										<th>Skupaj</th>
										<th>Datum</th>
									</tr>
								</thead>
								<tbody>
									{lvl3Games}
								</tbody>
							</table>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<h3>Dosežki</h3>
							<table className="table">
								<thead>
									<tr>
										<th>Ime</th>
										<th>Opis</th>
										<th>Datum</th>
									</tr>
								</thead>
								<tbody>
									{achievements}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
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
			if(!(gamesJson === false)) {
				this.setState({"last10lvl1games": gamesJson.message});
			}
		});

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
			if(!(gamesJson === false)) {
				this.setState({"last10lvl2games": gamesJson.message});
			}
		});

		fetch('/api/games/'+user._id+'?sort=date&level=3', {
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
			if(!(gamesJson === false)) {
				this.setState({"last10lvl3games": gamesJson.message});
			}
		});

		fetch('/api/achievements/'+user._id+'?sort=date', {
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
		.then((achievementsJson) => {
			if(!(achievementsJson === false)) {
				this.setState({"lastAchievements": achievementsJson.message});
			}
		});
	}
}

export default Achievements;
