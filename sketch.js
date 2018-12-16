var birds = [];
var pipes = [];
var NUM_BIRDS = 3;

function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < NUM_BIRDS; ++i) {
    birds[i] = new Bird();
  }
  pipes.push(new Pipe());
}

function draw() {
  background(0);
  if (!checkAll()) {
    console.log("NO HI HA VIUS!")
  }

  var close_pipe;
  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    if (close_pipe == null || (pipes[i].x < close_pipe.x) && pipes[i].x > 64) {
      close_pipe = pipes[i];
    }

    for (let b = 0; b < NUM_BIRDS; ++b) {
      if (birds[b] != null) {
        if (pipes[i].hits(birds[b])) {
          console.log("HIT");
          birds[b] = null;
        }
      }
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
  close_pipe.highlight = true;

  var mid = close_pipe.top + close_pipe.spacing/2;
  for (let i = 0; i < NUM_BIRDS; ++i) { 
    if (birds[i] != null) {
      stroke(153+i*5);
      line(birds[i].x, birds[i].y, close_pipe.x + close_pipe.w/2, mid);
      birds[i].act(close_pipe.x - birds[i].x + close_pipe.w/2, mid - birds[i].y);
      if (birds[i] != null) {
        birds[i].update();
        birds[i].show();
      }
    }
  }

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key == ' ') {
    for (let i = 0; i < NUM_BIRDS; ++i) {
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
  for (let i = 0; i < NUM_BIRDS; ++i) {
    if (birds[i] != null) {
      b =  true;
    }
  }
  return b;
}
