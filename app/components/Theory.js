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
			quizUserAnswer: undefined,
			selectedAnswer: undefined,
			quizAnswered: undefined
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

		var disabled = this.state.quizAnswered ? 'disabled' : ''

		let quizCheckButton;

		if(this.state.quizAnswered) {
			quizCheckButton = <button disabled type="submit" onClick={this.checkAnswer.bind(this)} className="btn btn-default">Preveri</button>
			if(this.state.quizUserAnswer === this.state.quizCorrectAnswer) {
				console.log("Quiz user answer ", this.state.quizUserAnswer);
				checkText = <p> Pravilno si odgovoril na vprašanje. Pravilen odgovor: {this.state.quizUserAnswer}</p>
			} else {
				checkText = <p> Napačno si odgovoril na vprašanje. Pravilen odgovor: {this.state.quizCorrectAnswer}, tvoj odgovor: {this.state.quizUserAnswer} </p>
			}
		} else {
			quizCheckButton = <button type="submit" onClick={this.checkAnswer.bind(this)} className="btn btn-default">Preveri</button>
		}

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
							{quizCheckButton}
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
		let user;
		if (typeof localStorage !== 'undefined') {
			user = JSON.parse(localStorage.getItem('user'));
		}

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
				this.checkIfQuizAnswered(quizJson.message._id, user._id);
			}
		})
		.catch((error) => { console.error("ERROR", error); });
	}

	checkIfQuizAnswered(quizId, userId) {
		console.log("Checking if quiz answered")
		fetch('/api/quizzes/check/'+quizId+'?user='+userId, {
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
		.then((solvingJson) => {
			if(!(solvingJson === false) && solvingJson != undefined) {
				console.log(solvingJson);
				console.log(solvingJson.answer)
				this.setState({"quizUserAnswer": solvingJson.message.answer});
				this.setState({"quizCorrectAnswer": solvingJson.message.correctAnswer});
				this.setState({"quizAnswered": true});
			}
		})
		.catch((error) => { console.error("ERROR", error); });
	}

	checkAnswer() {
		let user;
		if (typeof localStorage !== 'undefined') {
			user = JSON.parse(localStorage.getItem('user'));
		}
		fetch('/api/quizzes/check/'+this.state.quizId, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
		  	answer: this.state.selectedAnswer,
		  	user: user._id
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
			if(checkJson !== false) {
				console.log("Checkjson message", checkJson);
				this.setState({"quizCheck": checkJson.check});
				this.setState({"quizCorrectAnswer": checkJson.correctAnswer});
				this.setState({"quizAnswered": true});
				
			}
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
			this.setDefaultValues();
			this.callApis();
		});
	}

	setDefaultValues(){
		this.setState({lectureTitle: undefined})
		this.setState({lectureText: undefined})
		this.setState({quizText: undefined})
		this.setState({quizAnswers: undefined})
		this.setState({quizId: undefined})
		this.setState({quizCheck: undefined})
		this.setState({quizCorrectAnswer: undefined})
		this.setState({quizUserAnswer: undefined})
		this.setState({selectedAnswer: undefined})
		this.setState({quizAnswered: undefined})
	}
}

export default Theory;
