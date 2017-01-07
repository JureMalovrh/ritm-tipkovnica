import React from 'react';
import Navbar from './Navbar'

// TODO: Higher resolution.
const CANVAS_WIDTH = 660;
const CANVAS_HEIGHT = 500;
const BAR_WIDTH = 600;

let canvas = null;
let context = null;

let images = {};
let numLoaded = 0;

let NOTES = [{
	name: "eighth",
	duration: 0.125,
}, {
	name: "quarter",
	duration: 0.25,
}, {
	name: "half",
	duration: 0.5,
}];

let LENGTH = 1000;
let DURATION = 0.25;
let COUNT = 4;

let SONG = generateNotes(DURATION, COUNT);

let METRONOME = {
	mute: true,
	sound: "/audio/tick.wav",
	buffer: [],
};

for(let i = 0; i < COUNT; i++) {
	let time = i * LENGTH / COUNT;

	if(typeof Audio !== "undefined") {
		METRONOME.buffer.push({
			audio: new Audio(METRONOME.sound),
			start: time - 1,
			end: time + 1,
		});
	}
}

let TIMER = 0;
let PRESSED = false;
let PLAYED = false;

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

function generateNotes(duration, count) {
	let notes = [];
	let time = 0;
	let totalTime = duration * count;

	while(time < totalTime) {
		let remaining = totalTime - time;

		let validNotes = NOTES.filter((note) => {
			return note.duration <= remaining;
		}).concat(null);

		let idx = Math.random() * validNotes.length;
		let note = validNotes[parseInt(idx)];

		if(note === null) {
			time += duration;
			continue;
		}

		let position = duration / 2;

		if(note.duration == 0.125) {
			position = duration / 4;
		}

		// TODO
		// if(note.duration < duration && duration % note.duration == 0) {
		// 	console.log(...generateNotes(note.duration, duration / note.duration - 1));
		// }

		notes.push({
			time: (time + position) / totalTime * LENGTH,
			name: note.name,
		});

		if(note.duration == 0.125 && Math.random() < 0.5) {
			notes.push({
				time: (time + 3 * position) / totalTime * LENGTH,
				name: note.name,
			});
		}

		time += Math.max(note.duration, duration);
	}

	return notes;
}

function clearScreen() {
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawNotes() {
	if(PLAYED === true) {
		SONG = generateNotes(DURATION, COUNT);
		PLAYED = false;
	}

	SONG.forEach((note) => {
		let x = 30 + note.time / LENGTH * BAR_WIDTH - 16;
		let y = CANVAS_HEIGHT / 2 - 48;

		context.drawImage(images[note.name], x, y, 32, 32);
	});
}

function drawTimerBar() {
	context.rect(30, CANVAS_HEIGHT / 2, BAR_WIDTH, 2);
	context.stroke();
	context.clearRect(30, CANVAS_HEIGHT / 2, BAR_WIDTH, 2);

	for(let i = 1; i < COUNT; i++) {
		context.fillRect(30 + (i * BAR_WIDTH / COUNT), CANVAS_HEIGHT / 2 - 5, 2, 12);
	}
}

class Canvas extends React.Component {
	componentDidMount() {
		canvas = this.refs.canvas;
		context = canvas.getContext("2d");

		TIMER = 0;
		PRESSED = false;

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
				if(TIMER >= tick.start && TIMER <= tick.end) {
					tick.audio.play();
				}
			}
		}

		TIMER += 1.1;

		if(TIMER >= LENGTH) {
			TIMER = 0;

			clearScreen();
			drawNotes();
			drawTimerBar();
		}
	}

	update() {
		context.fillRect(30, CANVAS_HEIGHT / 2, TIMER / LENGTH * BAR_WIDTH, 2);

		let metronome = parseInt(TIMER / (LENGTH / COUNT)) + 1;
		context.clearRect(0, CANVAS_HEIGHT / 2 + 20, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.fillText(metronome, CANVAS_WIDTH / 2 - 8, CANVAS_HEIGHT / 2 + 60);
	}

	keyDown(event) {
		if(event.key == " ") {
			PLAYED = true;
		}

		if(event.key != " " || PRESSED == true) {
			return;
		}

		PRESSED = true;
		context.fillRect(30 + TIMER / LENGTH * BAR_WIDTH - 2, 250 + 16, 4, 4);
	}

	keyUp(event) {
		PRESSED = (event.key == " ") ? false : PRESSED;
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
				<div>
				<button onClick={() => { METRONOME.mute = !METRONOME.mute; }}>Mute</button>
				</div>
				</div>
		);
	}
}

export default Training;
