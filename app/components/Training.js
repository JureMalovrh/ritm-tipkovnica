import React from "react";
import Navbar from "./Navbar"

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
}, {
	name: "quarter_rest",
	duration: 0.25,
}, {
	name: "eighth_rest",
	duration: 0.125,
}];

let LENGTH = 1000;
let DURATION = 0.25;
let COUNT = 4;

let LEVEL = 1;
let SONG = null;
let GENERATE = true;

let NUM_PRESSES = 0;
let NUM_HITS = 0;
let SCORE = 0;

let MARGIN = 15;
let MARGIN_OK = 30;
let FIRST_NOTE = null;

let METRONOME = {
	mute: false,
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
let PHASE = 1;

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
			return (note.duration <= remaining) && (note.name != "eighth_rest");
		});

		let idx = Math.random() * validNotes.length;
		let note = validNotes[parseInt(idx)];

		notes.push({
			time: time / totalTime * LENGTH,
			name: note.name,
			hit: false,
		});

		if(note.duration == 0.125) {
			if(Math.random() < 0.5) {
				notes.push({
					time: (time + duration / 2) / totalTime * LENGTH,
					name: note.name,
					hit: false,
				});
			} else {
				notes.push({
					time: (time + duration / 2) / totalTime * LENGTH,
					name: "eighth_rest",
					hit: false,
				});
			}
		}

		time += Math.max(note.duration, duration);
	}

	return notes;
}

function clearScreen() {
	context.clearRect(0, CANVAS_HEIGHT / 2 - 50, CANVAS_WIDTH, 100);
	context.clearRect(0, CANVAS_HEIGHT - 20, CANVAS_WIDTH, 20);
}

function drawNotes() {
	if(GENERATE === true) {
		SONG = generateNotes(DURATION, COUNT);
		GENERATE = false;
	}

	let y = CANVAS_HEIGHT / 2 - 48;

	if(LEVEL == 1) {
		SONG.forEach((note) => {
			let x = 30 + note.time / LENGTH * BAR_WIDTH - 16;

			context.drawImage(images[note.name], x, y, 32, 32);
		});
	} else if(LEVEL == 2) {
		let x = CANVAS_WIDTH / 2 - SONG.length * 16 - 32;

		for(let note of SONG) {
			x += 32;
			context.drawImage(images[note.name], x, y, 32, 32);
		}
	}
}

function drawTimerBar() {
	if(LEVEL != 1) {
		return;
	}

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
		let temp = setInterval(() => {}, 1000);

		for(let i = 0; i <= temp; i++) {
			clearInterval(i);
		}

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
			PHASE++;

			if(PHASE == 5) {
				clearInterval(INTERVALS.tick);
			} else {
				TIMER = 0;

				for(let note of SONG) {
					note.hit = false;
				}

				clearScreen();
				drawNotes();
				drawTimerBar();
			}
		}
	}

	update() {
		context.font = "32px Arial";

		if(LEVEL == 1) {
			context.fillRect(30, CANVAS_HEIGHT / 2, TIMER / LENGTH * BAR_WIDTH, 2);
		}

		context.clearRect(0, CANVAS_HEIGHT / 2 + 20, CANVAS_WIDTH, CANVAS_HEIGHT);

		let metronome = parseInt(TIMER / (LENGTH / COUNT)) + 1;

		if(PHASE == 1) {
			context.fillText((5 - metronome) + "...", CANVAS_WIDTH / 2 - 8, CANVAS_HEIGHT / 2 + 60);
		} else if(PHASE > 1 && PHASE < 5) {
			let x = CANVAS_WIDTH / 2 - SONG.length * 16 - 32;

			for(let note of SONG) {
				x += 32;

				if(note.name == "quarter_rest" || note.name == "eighth_rest" || TIMER < note.time) {
					continue;
				}

				if(note.hit === false && TIMER > note.time + 3.75 * MARGIN_OK) {
					if(LEVEL == 2) {
						context.fillStyle = "#FF0000";
						context.fillRect(x + 16 - 2, 250, 4, 4);
						context.fillStyle = "#000000";
					}

					note.hit = true;
					NUM_PRESSES++;
					break;
				}
			}

			if(FIRST_NOTE !== null) {
				let timing = 1000 - FIRST_NOTE;

				for(let note of SONG) {
					if(note.time == 0) {
						note.hit = true;
						break;
					}
				}

				if(timing <= MARGIN_OK && timing > MARGIN) {
					context.fillStyle = "#FFA500";
				} else if(timing < MARGIN) {
					context.fillStyle = "#00FF00";
				}

				if(LEVEL == 1) {
					context.fillRect(30 + (0 - timing) / LENGTH * BAR_WIDTH - 2, 250 + 16, 4, 4);
				} else if(LEVEL == 2) {
					let x = CANVAS_WIDTH / 2 - SONG.length * 16;
					context.fillRect(x + 16 - 2, 250, 4, 4);
				}

				context.fillStyle = "#000000";
				FIRST_NOTE = null;
			}

			context.fillText(metronome, CANVAS_WIDTH / 2 - 8, CANVAS_HEIGHT / 2 + 60);
		} else if(PHASE == 5) {
			context.font = "16px Arial";
			context.fillText("r - Ponovi", CANVAS_WIDTH - 90, CANVAS_HEIGHT - 100);
			context.fillText("n - Naprej", CANVAS_WIDTH - 90, CANVAS_HEIGHT - 75);
			context.fillText("u - Težje", CANVAS_WIDTH - 90, CANVAS_HEIGHT - 50);
			context.fillText("d - Lažje", CANVAS_WIDTH - 90, CANVAS_HEIGHT - 25);
		}

		context.font = "24px Arial";
		context.fillText("Rezultat: " + SCORE, 15, CANVAS_HEIGHT - 50);
		context.fillText("Natančnost: " + NUM_HITS + "/" + NUM_PRESSES, 15, CANVAS_HEIGHT - 20);
	}

	keyDown(event) {
		if(PHASE == 1) {
			return;
		}

		if(PHASE == 5) {
			if(event.key != "r" && event.key != "n" && event.key != "u" && event.key != "d") {
				return;
			}

			GENERATE = true;

			if(event.key == "r") {
				GENERATE = false;
			}

			if(event.key == "u") {
				LEVEL++;
			} else if(event.key == "d") {
				LEVEL--;
			}

			NUM_PRESSES = 0;
			NUM_HITS = 0;

			TIMER = 0;
			PHASE = 1;

			INTERVALS.tick = setInterval(this.tick, 1);

			clearScreen();
			drawNotes();
			drawTimerBar();

			return;
		}

		if(event.key != " " || PRESSED == true) {
			return;
		}

		PRESSED = true;
		NUM_PRESSES++;
		context.fillStyle = "#FF0000";

		if(LEVEL == 1) {
			for(let note of SONG) {
				if(note.name == "quarter_rest" || note.name == "eighth_rest") {
					continue;
				}

				if(note.time - MARGIN <= TIMER && TIMER <= note.time + MARGIN) {
					note.hit = true;
					SCORE += 1;
					NUM_HITS++;
					context.fillStyle = "#00FF00";
					break;
				} else if(note.time + MARGIN < TIMER && TIMER <= note.time + MARGIN_OK) {
					note.hit = true;
					SCORE += 0.5;
					NUM_HITS++;
					context.fillStyle = "#FFA500";
					break;
				} else if(note.time - MARGIN_OK < TIMER && TIMER <= note.time - MARGIN) {
					note.hit = true;
					SCORE += 0.5;
					NUM_HITS++;
					context.fillStyle = "#FFA500";
					break;
				} else if(note.time == 0 && TIMER >= 1000 - MARGIN_OK) {
					FIRST_NOTE = TIMER;
					NUM_HITS++;
					break;
				}
			}

			context.fillRect(30 + TIMER / LENGTH * BAR_WIDTH - 2, 250 + 16, 4, 4);
		} else if(LEVEL == 2) {
			let x = CANVAS_WIDTH / 2 - SONG.length * 16 - 32;

			for(let note of SONG) {
				x += 32;

				if(note.name == "quarter_rest" || note.name == "eighth_rest") {
					continue;
				}

				if(note.time - MARGIN <= TIMER && TIMER <= note.time + MARGIN) {
					note.hit = true;
					SCORE += 1;
					NUM_HITS++;
					context.fillStyle = "#00FF00";
					context.fillRect(x + 16 - 2, 250, 4, 4);
					break;
				} else if(note.time + MARGIN < TIMER && TIMER <= note.time + MARGIN_OK) {
					note.hit = true;
					SCORE += 0.5;
					NUM_HITS++;
					context.fillStyle = "#FFA500";
					context.fillRect(x + 16 - 2, 250, 4, 4);
					break;
				} else if(note.time - MARGIN_OK < TIMER && TIMER <= note.time - MARGIN) {
					note.hit = true;
					SCORE += 0.5;
					NUM_HITS++;
					context.fillStyle = "#FFA500";
					context.fillRect(x + 16 - 2, 250, 4, 4);
					break;
				} else if(note.time == 0 && TIMER >= 1000 - MARGIN_OK) {
					FIRST_NOTE = TIMER;
					NUM_HITS++;
					break;
				}
			}
		}

		context.fillStyle = "#000000";
	}

	keyUp(event) {
		PRESSED = (event.key == " ") ? false : PRESSED;
	}

	render() {
		return (
			<canvas ref="canvas" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} tabIndex="0" onKeyDown={this.keyDown.bind(this)} onKeyUp={this.keyUp} />
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
