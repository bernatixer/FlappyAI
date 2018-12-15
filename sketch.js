var birds = [];
var pipes = [];
var NUM_BIRDS = 2;

function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < NUM_BIRDS; ++i) {
    birds[i] = new Bird();
  }
  pipes.push(new Pipe());
}

function draw() {
  background(0);

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    for (let b = 0; b < NUM_BIRDS; ++b) {
      if (pipes[i].hits(birds[b])) {
        console.log("HIT");
      }
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  for (let i = 0; i < NUM_BIRDS; ++i) { 
    birds[i].update();
    birds[i].show();
  }

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key == ' ') {
    for (let i = 0; i < NUM_BIRDS; ++i) {
      if (Math.random() > 0.5) {
        birds[i].up();
      }
    }
  }
}
