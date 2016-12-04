import React from 'react';
import Navbar from './Navbar'

const CANVAS_WIDTH = 660;
const CANVAS_HEIGHT = 500;
const BAR_WIDTH = 600;

let canvas = null;
let context = null;

let images = {};
let numLoaded = 0;
let names = [
	"eighth",
];

let notes = [
    [{
        time: 100,
        name: "eighth",
    }, {
        time: 200,
        name: "eighth",
    }, {
        time: 450,
        name: "eighth",
    }, {
        time: 750,
        name: "eighth",
    }],
    [{
        time: 200,
        name: "eighth",
    }, {
        time: 300,
        name: "eighth",
    }, {
        time: 700,
        name: "eighth",
    }, {
        time: 800,
        name: "eighth",
    }],
    [{
        time: 250,
        name: "eighth",
    }, {
        time: 500,
        name: "eighth",
    }, {
        time: 750,
        name: "eighth",
    }],
];

let timer = 0;
let pressed = false;

let intervals = [];

function loadImage(list, name, url) {
	list[name] = new Image();
	list[name].src = url;
	list[name].onload = () => {
		console.info("Loaded \"" + name + ".png\"");
		numLoaded++;
	};
}

function clearScreen() {
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawNotes() {
	let idx = Math.floor(Math.random() * 3);

	notes[idx].forEach((note) => {
		let x = 30 + note.time / 1000 * BAR_WIDTH - 16;
		let y = CANVAS_HEIGHT / 2 - 48;

		context.drawImage(images[note.name], x, y, 32, 32);
	});
}

function drawTimerBar() {
	context.rect(30, CANVAS_HEIGHT / 2, BAR_WIDTH, 2);
	context.stroke();
	context.clearRect(30, CANVAS_HEIGHT / 2, BAR_WIDTH, 2);
}

class Canvas extends React.Component {
	componentDidMount() {
		canvas = this.refs.canvas;
		context = canvas.getContext("2d");

		timer = 0;
		pressed = false;

		intervals.forEach((interval) => {
			clearInterval(interval);
		});

		context.font = "32px Arial";
		context.fillText("Nalaganje...", 250, CANVAS_HEIGHT / 2 - 20);
		this.load();

		setTimeout(() => {
			this.init();
			canvas.focus();
		}, 250);
	}

	load() {
		names.forEach((name) => {
			loadImage(images, name, "/img/" + name + ".png");
		});
	}

	init() {
		clearScreen();
		drawNotes();
		drawTimerBar();

		intervals.push(setInterval(this.tick, 1));
		intervals.push(setInterval(this.update, 25));
	}

	tick() {
		timer++;

		if(timer == 1000) {
			timer = 0;

			clearScreen();
			drawNotes();
			drawTimerBar();
		}
	}

	update() {
		context.fillRect(30, CANVAS_HEIGHT / 2, timer / 1000 * BAR_WIDTH, 2);
	}

	keyDown(event) {
		if(event.key != " " || pressed == true) {
			return;
		}

		pressed = true;
		context.fillRect(30 + timer / 1000 * BAR_WIDTH - 2, 250 + 16, 4, 4);
	}

	keyUp(event) {
		pressed = (event.key == " ") ? false : pressed;
	}

	render() {
		return (
			<canvas ref="canvas" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} tabIndex="0" onKeyDown={this.keyDown} onKeyUp={this.keyUp} />
		);
	}
}

class Training extends React.Component {
	render() {
		return (
			<div>
				<Navbar signedIn={true} history={this.props.history} />
				<div className="col-md-offset-2 col-md-8 center">
					<Canvas />
				</div>
			</div>
		);
	}
}

export default Training;
