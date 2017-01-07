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
	"quarter",
	"half",
];

let METRONOME = {
	sound: "/audio/tick.wav",
	buffer: [],
};

for(let i = 0; i < 4; i++) {
	let time = i * 1000 / 4;

	METRONOME.buffer.push({
		audio: new Audio(METRONOME.sound),
		start: time - 1,
		end: time + 1,
	});
}

let random = false;
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

function generateNotes(num, min, max) {
	let notes = [];

	for(let i = 0; i < num; i++) {
		notes.push({
			time: Math.random() * (max - min) + min,
			name: "eighth",
		});
	}

	return notes;
}

function clearScreen() {
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawNotes() {
	let song = null;

	if(random === true) {
		song = generateNotes(4, 150, 950);
	} else {
		song = notes[Math.floor(Math.random() * 3)];
	}

	song.forEach((note) => {
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
		for(let tick of METRONOME.buffer) {
			if(timer >= tick.start && timer <= tick.end) {
				tick.audio.play();
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
		context.clearRect(0, CANVAS_HEIGHT / 2 + 10, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.fillText(metronome, CANVAS_WIDTH / 2 - 8, CANVAS_HEIGHT / 2 + 60);
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
					<Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
				</div>
				<button onClick={() => { random = !random; }}>Random</button>
			</div>
		);
	}
}

export default Training;
