import React from "react";
import Navbar from "./Navbar";

class Theory extends React.Component {
	constructor(props) {
		super(props);

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
			title = <span className="lecture-title">{this.state.lectureTitle}</span>;
		} else {
			title = <span className="lecture-title">Title placeholder</span>
		}

		let text = [];
		if(this.state.lectureText) {
			let lectureText = this.state.lectureText;
			if(this.state.page == 3) {
				let images = ['/img/quarter.png', '/img/eighth.png', '/img/half.png']
				lectureText.forEach((lt, index) => {
					text.push(
						<div>
							<img src= {images[index-1]} style={{"width":"50px"}} />
							<p key={lt}>
								{lt}
							</p>
						</div>
					);
				});
			} else {
				lectureText.forEach((lt) => {
					text.push(
						<p key={lt}>
							{lt}
						</p>
					);
				});

			}
		} else {
			text = <p> Text placeholder </p>
		}

		let quizAnswersT = [];
		if(this.state.quizAnswers) {
			let quizAnswers = this.state.quizAnswers;
			quizAnswers.forEach((qa, index) => {
				quizAnswersT.push(
					<div>
						<input id={"answer-" + (index + 1)} type="radio" name="answer" value={qa} onChange={this.handleOptionChange.bind(this)} /><label htmlFor={"answer-" + (index + 1)}>{qa}</label>
					</div>
				);
			});

		} else {
			quizAnswersT = <div>Answers placeholder</div>
		}

		let checkText;
		if(typeof (this.state.quizCheck) == "boolean") {
			console.log(this.state.quizCheck)
			if(this.state.quizCheck === true) {
				checkText = <p>Pravilen odgovor!</p>
			} else {
				checkText = <p>Napačen odgovor. Pravilen odgovor je {this.state.quizCorrectAnswer}.</p>
			}
		}

		let previousLecture;
		if((this.state.page-1) > 0) {
			previousLecture = <a onClick={this.changeState.bind(this, '/theory/'+(this.state.page-1), (this.state.page-1))}> Prejšnje poglavje </a>;
		}
		let nextLecture
		if((this.state.page+1) < 8) {
			nextLecture = <a onClick={this.changeState.bind(this, '/theory/'+(this.state.page+1), (this.state.page+1))}> Naslednje poglavje </a>
		}

		let quizCheckButton;

		if(this.state.quizAnswered && !(typeof (this.state.quizCheck) == "boolean")) {
			quizCheckButton = <button disabled type="submit" onClick={this.checkAnswer.bind(this)} className="btn btn-default">Preveri</button>
			if(this.state.quizUserAnswer === this.state.quizCorrectAnswer) {
				console.log("Quiz user answer ", this.state.quizUserAnswer);
				checkText = <p> Pravilno si odgovoril na vprašanje. Pravilen odgovor: {this.state.quizUserAnswer}.</p>
			} else {
				checkText = <p> Napačno si odgovoril na vprašanje. Pravilen odgovor: {this.state.quizCorrectAnswer}, tvoj odgovor: {this.state.quizUserAnswer} </p>
			}
		} else {
			quizCheckButton = <button type="submit" onClick={this.checkAnswer.bind(this)} className="btn btn-default">Preveri</button>
		}

		return (
			<div>
				<Navbar signedIn={true} history={this.props.history} />
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<div className="theory-navbar">
								<span className="previous-lecture">{previousLecture}</span>
								{title}
								<span className="next-lecture">{nextLecture}</span>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12 lecture-text">
							{text}
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<div className="lecture-quiz">
								<span className="quiz-question">{this.state.quizText}</span>
								<div className="quiz-answers">
									{quizAnswersT}
								</div>
								{quizCheckButton}
								{checkText}
							</div>
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
		});

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
		});
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
		});
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
		});
	}

	handleOptionChange(changeEvent) {
		console.log(changeEvent.target.value)
  		this.setState({
    		selectedAnswer: changeEvent.target.value
  		});
	}

	changeState(link, page) {
		this.props.history.push(link);

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
