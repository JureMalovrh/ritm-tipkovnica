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


		this.state = {
			page: page, 
			lectureTitle: undefined, 
			lectureText: undefined, 
			quizText: undefined,
			quizAnswers: undefined,
			quizId: undefined,
			quizCheck: undefined,
			quizCorrectAnswer: undefined,
			selectedAnswer: undefined
		};

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
			title = <h2 style={{"textAlign": "center"}}> {this.state.lectureTitle} </h2>;
		} else {
			title = <h2> Title placeholder </h2>
		}

		let text = [];
		if(this.state.lectureText) {
			let lectureText = this.state.lectureText;
			lectureText.forEach((lt) => {
				text.push(
					<p key={lt}>
						{lt}
					</p>
				);
			});
		} else {
			text = <p> Text placeholder </p>
		}

		let quizT;
		if(this.state.quizText) {
			quizT = <h2 style={{"textAlign": "center"}}> {this.state.quizText} </h2>;
		} else {
			quizT = <h2> Quiz placeholder </h2>
		}
		let quizAnswersT = [];
		if(this.state.quizAnswers) {
			let quizAnswers = this.state.quizAnswers;
			quizAnswers.forEach((qa, index) => {
				//console.log(qa)
				quizAnswersT.push(
					<p key={index}> <input key={index} type="radio" name="q1" value={qa} id={index} onChange={this.handleOptionChange.bind(this)} ></input> {qa} </p>
				);
			});

		} else {	
			quizAnswersT = <div> Answers placeholder </div>
		}
		
		let checkText;
		if(typeof (this.state.quizCheck) == "boolean") {
			console.log(this.state.quizCheck)
			if(this.state.quizCheck === true) {
				checkText = <p> Pravilen odgovor </p>
			} else {
				checkText = <p> Napačen odgovor. Pravilen odgovor je {this.state.quizCorrectAnswer} </p>
			}
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
					<br/>
					<br/>
					<div>
						{quizT}
						<div className="alignleft">
							<ul className="answers">
								{quizAnswersT}
							</ul>
							<button type="submit" onClick={this.checkAnswer.bind(this)} className="btn btn-default">Preveri</button>
							{checkText}
						</div>
					</div>
				</div>
			</div>
		);
	}

	
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

		console.log(this.state.page);
		fetch('/api/quizzes/'+this.state.page, {
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
		.then((quizJson) => {
			if(!(quizJson === false)) {
				//console.log(quizJson);
				this.setState({"quizText": quizJson.message.text});
				this.setState({"quizAnswers": quizJson.message.mixedAnswers});
				this.setState({"quizId": quizJson.message._id});
				
			}
		})
		.catch((error) => { console.error("ERROR", error); });
	}

	checkAnswer() {
		fetch('/api/quizzes/check/'+this.state.quizId, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
		  	answer: this.state.selectedAnswer
		  })
		})
		.then((response) => {
			if(response.ok) {
				return response.json();
			} else {
				return false;
			}
		})
		.then((checkJson) => {
			console.log("Checkjson message", checkJson);
			this.setState({"quizCheck": checkJson.check});
			this.setState({"quizCorrectAnswer": checkJson.correctAnswer});
		})
		.catch((error) => { console.error("ERROR", error); });
	}

	handleOptionChange(changeEvent) {
		console.log(changeEvent.target.value)
  		this.setState({
    		selectedAnswer: changeEvent.target.value
  		});
	}

	changeState(link, page) {
		this.props.history.push(link);
		//console.log(page);
		this.setState({"page": page}, () => {
			this.callApis();
		});
	}
}

export default Theory;
