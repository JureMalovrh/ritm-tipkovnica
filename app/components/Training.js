import React from 'react';
import Navbar from './Navbar'

const CANVAS_WIDTH = 660;
const CANVAS_HEIGHT = 500;
const BAR_WIDTH = 600;

let canvas = null;
let context = null;

let images = {};
let numLoaded = 0;

let NOTES = [{
	name: "eighth",
	size: 8,
}, {
	name: "quarter",
	size: 4,
}, {
	name: "half",
	size: 2,
}];

let SONG = generateNotes(4, 4);

let METRONOME = {
	mute: false,
	sound: "/audio/tick.wav",
	buffer: [],
};

for(let i = 0; i < 4; i++) {
	let time = i * 1000 / 4;

	if(typeof Audio !== "undefined") {
		METRONOME.buffer.push({
			audio: new Audio(METRONOME.sound),
			start: time - 1,
			end: time + 1,
		});
	}
}

let timer = 0;
let pressed = false;
let played = false;

let INTERVALS = {
	update: null,
	tick: null,
};

function loadImage(list, name, url) {
	list[name] = new Image();
	list[name].src = url;
	list[name].onload = () => {
		console.info("Loaded \"" + name + ".png\"");
		numLoaded++;
	};
}

function generateNotes(size, num) {
	let notes = new Array(num);

	for(let i = 0; i < num; i++) {
		let time = (i + 0.5) * 1000 / num;

		let note = null;

		while(note === null) {
			note = NOTES[parseInt(Math.random() * NOTES.length)];

			if(note.size > size) {
				note = null;
			}
		}

		i += size / note.size - 1;

		notes[i] = {
			time: time,
			name: note.name,
		};
	}

	return notes;
}

function clearScreen() {
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawNotes() {
	if(played === true) {
		SONG = generateNotes(4, 4);
		played = false;
	}

	SONG.forEach((note) => {
		if(note === null) {
			return;
		}

		let x = 30 + note.time / 1000 * BAR_WIDTH - 16;
		let y = CANVAS_HEIGHT / 2 - 48;

		context.drawImage(images[note.name], x, y, 32, 32);
	});
}

function drawTimerBar() {
	context.rect(30, CANVAS_HEIGHT / 2, BAR_WIDTH, 2);
	context.stroke();
	context.clearRect(30, CANVAS_HEIGHT / 2, BAR_WIDTH, 2);
	context.fillRect(30 + (BAR_WIDTH / 4), CANVAS_HEIGHT / 2 - 5, 2, 12);
	context.fillRect(30 + (BAR_WIDTH / 2), CANVAS_HEIGHT / 2 - 5, 2, 12);
	context.fillRect(30 + (3 * BAR_WIDTH / 4), CANVAS_HEIGHT / 2 - 5, 2, 12);
}

class Canvas extends React.Component {
	componentDidMount() {
		canvas = this.refs.canvas;
		context = canvas.getContext("2d");

		timer = 0;
		pressed = false;

		clearInterval(INTERVALS.tick);
		clearInterval(INTERVALS.update);

		context.font = "32px Arial";
		context.fillText("Nalaganje...", 250, CANVAS_HEIGHT / 2 - 20);
		this.load();

		setTimeout(() => {
			this.init();
			canvas.focus();
		}, 250);
	}

	load() {
		NOTES.forEach((note) => {
			loadImage(images, note.name, "/img/" + note.name + ".png");
		});
	}

	init() {
		clearScreen();
		drawNotes();
		drawTimerBar();

		INTERVALS.update = setInterval(this.update, 25);
		INTERVALS.tick = setInterval(this.tick, 1);
	}

	tick() {
		if(METRONOME.mute === false) {
			for(let tick of METRONOME.buffer) {
				if(timer >= tick.start && timer <= tick.end) {
					tick.audio.play();
				}
			}
		}

		timer += 1.1;

		if(timer >= 1000) {
			timer = 0;

			clearScreen();
			drawNotes();
			drawTimerBar();
		}
	}

	update() {
		context.fillRect(30, CANVAS_HEIGHT / 2, timer / 1000 * BAR_WIDTH, 2);

		let metronome = parseInt(timer / 250) + 1;
		context.clearRect(0, CANVAS_HEIGHT / 2 + 20, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.fillText(metronome, CANVAS_WIDTH / 2 - 8, CANVAS_HEIGHT / 2 + 60);
	}

	keyDown(event) {
		if(event.key == " ") {
			played = true;
		}

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
					<Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
				</div>
				<Controls />
			</div>
		);
	}
}

class Controls extends React.Component {
	render() {
		return (
			<div>
				<button onClick={() => { METRONOME.mute = !METRONOME.mute; }}>Mute</button>
			</div>
		);
	}
}

export default Training;
