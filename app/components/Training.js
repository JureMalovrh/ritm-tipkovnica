import React from 'react';
import Navbar from './Navbar'

class Training extends React.Component {
	render() {
		return (
			<div>
				<Navbar signedIn={true}/>
				<div className="col-md-offset-2 col-md-8 center">
					<Canvas />
				</div>
			</div>
		);
	}
}

let canvas = null;
let context = null;

let notes = [{
	time: 100,
	name: "A",
}, {
	time: 200,
	name: "B",
}, {
	time: 500,
	name: "C",
}, {
	time: 750,
	name: "D",
}];

let timer = 0;
let pressed = false;

class Canvas extends React.Component {
	componentDidMount() {
		canvas = this.refs.canvas;
		context = canvas.getContext("2d");
		canvas.focus();
		this.setup();
	}

	setup() {
		notes.forEach(function(note) {
			let x = 30 + note.time / 1000 * 600 - 15;
			let y = 250 - 45;

			context.fillRect(x, y, 30, 30);
		});

		// Timer bar.
		context.rect(30, 249, 600, 2);
		context.stroke();
		context.clearRect(30, 249, 600, 2);

		setInterval(this.tick, 1);
		setInterval(this.update, 25);
	}

	tick() {
		timer++;

		if(timer == 1000) {
			timer = 0;

			// Clear timer bar.
			context.rect(30, 249, 600, 2);
			context.stroke();
			context.clearRect(30, 249, 600, 2);

			// Clear marks.
			context.clearRect(30, 260, 600, 10);
		}
	}

	update() {
		context.fillRect(30, 249, timer / 1000 * 600, 2);
	}

	keyDown(event) {
		if(event.key != " " || pressed == true) {
			return;
		}

		pressed = true;

		context.fillRect(30 + timer / 1000 * 600 - 2, 250 + 15, 4, 4);
	}

	keyUp(event) {
		pressed = (event.key == " ") ? false : pressed;
	}

	render() {
		return (
			<canvas ref="canvas" width={660} height={500} tabIndex="0" onKeyDown={this.keyDown} onKeyUp={this.keyUp} />
		);
	}
}

export default Training;
