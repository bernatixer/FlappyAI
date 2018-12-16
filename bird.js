// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

function Bird(nn) {
  this.y = height/2;
  this.x = 64;
  this.brain = new synaptic.Architect.Perceptron(2, 6, 1);
  if (nn != null) {
    this.brain = synaptic.Network.fromJSON(nn);
  }

  this.gravity = 0.7;
  this.lift = -12;
  this.velocity = 0;
  this.fitness = 0;
  this.color = [255*Math.random(), 255*Math.random(), 255*Math.random()];

  this.show = function() {
    fill(this.color);
    ellipse(this.x, this.y, 32, 32);
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.fitness += 1;
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }

  this.act = function(distance, height) {
    var output = this.brain.activate([distance, height]);
    if (output > 0.5) {
      this.up();
    }
  }

}
