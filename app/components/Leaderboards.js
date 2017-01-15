import React from "react";
import Navbar from "./Navbar";

class Leaderboards extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
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
						<div className="col-xs-12">
							<h3>Dosezki</h3>
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

export default Leaderboards;
