import React from "react";
import Navbar from "./Navbar";

class Leaderboards extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			lastLeaderboards: undefined,
		};

		if (typeof localStorage !== 'undefined') {
			let user = JSON.parse(localStorage.getItem('user'));
			if(!user) {
				this.props.history.push("/");
			}
		}
	}

	render() {
		let leaderboards = [];
		if(this.state.lastLeaderboards) {
			if(this.state.lastLeaderboards.length > 0) {
				this.state.lastLeaderboards.forEach((leaderboard, idx) => {
					leaderboards.push(
						<tr key={leaderboard._id}>
							<td>{idx + 1}</td>
							<td>{leaderboard.user.displayName}</td>
							<td>{leaderboard.points} / {leaderboard.allPoints}</td>
							<td>{leaderboard.level}</td>
							<td>{moment(leaderboard.date).format("YYYY-MM-DD HH:mm")}</td>
						</tr>
					);
				});
			} else {
				leaderboards = <tr><td colSpan={5}>Trenutno ni še nihče igral.</td></tr>
			}
		}

		return (
			<div>
				<Navbar signedIn={true} history={this.props.history} />
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<h3>Lestvica</h3>
							<table className="table">
								<thead>
									<tr>
										<th>#</th>
										<th>Ime</th>
										<th>Točke</th>
										<th>Stopnja</th>
										<th>Datum</th>
									</tr>
								</thead>
								<tbody>
									{leaderboards}
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

		fetch("/api/leaderboards", {
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
		.then((leaderboardsJson) => {
			console.log(leaderboardsJson);
			if(!(leaderboardsJson === false)) {
				this.setState({"lastLeaderboards": leaderboardsJson.message});
			}
		});
	}
}

export default Leaderboards;
