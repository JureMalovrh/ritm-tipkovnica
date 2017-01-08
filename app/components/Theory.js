import React from "react";
import Navbar from "./Navbar";

class Theory extends React.Component {
	
	constructor(props) {
		super(props);
		//console.log(this.props.params.page);
		let page;
		if(this.props.params.page) {
			page = parseInt(this.props.params.page); 
		} else {
			page = 1;
		}


		this.state = {page: page, lectureTitle: undefined, lectureText: undefined};

		if (typeof localStorage !== 'undefined') {
			let user = JSON.parse(localStorage.getItem('user'));
			if(!user) {
				this.props.history.push("/");
			}
		}
	}
	render() {
		let title;
		if(this.state.lectureTitle) {
			title = <h2> {this.state.lectureTitle} </h2>;
		} else {
			title = <h2> Title placeholder </h2>
		}

		let text = [];
		if(this.state.lectureText) {
			let lectureText = this.state.lectureText;
			lectureText.forEach((lt) => {
				text.push(
					<p>
						{lt}
					</p>
				);
			});
		} else {
			text = <p> Text placeholder </p>
		}
		//<a key={link.route} onClick={this.changeState.bind(this, link.route)}>
		//			<div className="menu">{link.name}</div>
		//		</a>
		let previousLecture;
		if((this.state.page-1) > 0) {
			previousLecture = <a onClick={this.changeState.bind(this, '/theory/'+(this.state.page-1), (this.state.page-1))}> Prejšnje poglavje </a>;
		}

		let nextLecture = <a onClick={this.changeState.bind(this, '/theory/'+(this.state.page+1), (this.state.page+1))}> Naslednje poglavje </a>
		return (
			<div>
				<Navbar signedIn={true} history={this.props.history} />
				<div className="col-md-offset-2 col-md-8 placeholder">
					<div className="theory-navbar">
						<h3 className="alignleft"> {previousLecture}</h3>
						{title}
						<h3 className="alignright"> {nextLecture} </h3>
					</div>
					<hr/>
					<div>
						{text}
					</div>
				</div>
			</div>
		);
	}
	/*
	<div className="alignleft">
		<p className="question"> Kaj sestavlja noto? </p>
		<ul className="answers">
			<input type="radio" name="q1" value="a" id="q1a"> Glava<br/> </input>
			<input type="radio" name="q1" value="b" id="q1b">Barva in višina<br/> </input>
			<input type="radio" name="q1" value="c" id="q1c">Glavica in vrat<br/> </input>
			</ul> 
	</div>
	*/

	componentDidMount() {
		//console.log(this.state);
		this.callApis();
	}

	callApis() {
		console.log(this.state.page);
		fetch('/api/lectures/'+this.state.page, {
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
		.then((lectureJson) => {
			if(!(lectureJson === false)) {
				this.setState({"lectureTitle": lectureJson.message.title});
				this.setState({"lectureText": lectureJson.message.text});
			}
		})
		.catch((error) => { console.error("ERROR", error); });
	}

	changeState(link, page) {
		this.props.history.push(link);
		console.log(page);
		this.setState({"page": page}, () => {
			this.callApis();
		});
	}
}

export default Theory;
