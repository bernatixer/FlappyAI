var birds = [];
var pipes = [];
var NUM_BIRDS = 10;

var last_birds = [];

function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < NUM_BIRDS; ++i) {
    birds[i] = new Bird(null);
  }
  pipes.push(new Pipe());
}

function draw() {
  background(10);
  if (!checkAll()) {
    console.log("NO HI HA VIUS!")
    birds = evolve(last_birds);
    console.log(birds);
    for (let b = 0; b < last_birds.length; ++b) {
      // console.log(last_birds[b].fitness);
      last_birds[b].fitness = 0;
    }
    pipes = [];
    last_birds = [];
  }

  var close_pipe;
  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    if (close_pipe == null || (pipes[i].x < close_pipe.x) && pipes[i].x > 64) {
      close_pipe = pipes[i];
    }

    for (let b = 0; b < birds.length; ++b) {
      if (birds[b] != null) {
        if (pipes[i].hits(birds[b])) {
          console.log("HIT");
          last_birds.push(birds[b]);
          birds[b] = null;
        }
      }
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  if (close_pipe != null) {
    close_pipe.highlight = true;

    var mid = close_pipe.top + close_pipe.spacing/2;
    for (let i = 0; i < birds.length; ++i) { 
      if (birds[i] != null) {
        stroke(birds[i].color);
        line(birds[i].x, birds[i].y, close_pipe.x + close_pipe.w/2, mid);
        birds[i].act(close_pipe.x - birds[i].x + close_pipe.w/2, mid - birds[i].y);
        if (birds[i] != null) {
          birds[i].update();
          birds[i].show();
        }
      }
    }
  }

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key == ' ') {
    for (let i = 0; i < birds.length; ++i) {
      if (birds[i] != null) {
        // if (Math.random() > 0.5) {
          birds[i].up();
        // }
      }
    }
  }
}

function checkAll() {
  let b = false;
  for (let i = 0; i < birds.length; ++i) {
    if (birds[i] != null) {
      b =  true;
    }
  }
  return b;
}
