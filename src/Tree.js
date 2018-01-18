var Leaf = function(position, colour) {

  this.position = position;
  this.colour = colour;
  this.size = random(5, 10);
}

Leaf.prototype = {
  draw: function() {
    noStroke();
    fill(this.colour);
    ellipse(this.position.x, this.position.y, this.size, random(this.size));
  }
}

// ------------------------------------------------------------------

var Branch = function(start, end) {

  this.start = start;
  this.end = end;
  this.finished = false;
}

Branch.prototype = {
  draw: function() {
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}

// ------------------------------------------------------------------

var Tree = function(options) {

  this.angle = options.angle;
  this.branches = [];
  this.leaves = [];
  this.maxLevels = options.levels;
  this.colour = options.colour;

  var end = createVector(options.root.x, options.root.y - options.length);

  this.branches.push(new Branch(options.root, end));

  var freq = 200;

  var time = 0;
  var delay = 200;

  for (var i = 0; i < options.levels; i++) {
    setTimeout(function(level) {
      this.createBranches(level);
      this.createOscillator(freq);
      freq *= random(1, 1.5);
    }.bind(this, i), time);
    time += delay;
  }
}

Tree.prototype = {

  createOscillator: function(freq) {
    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(freq);
    osc.amp(0);
    osc.start();
    osc.amp(0.01, 0.2);
  },

  createBranches: function(currentLevel) {

    for (var i = this.branches.length - 1; i >= 0; i--) {

      if (!this.branches[i].finished) {

        var left = p5.Vector.sub(this.branches[i].end, this.branches[i].start);
        left.rotate(random(-this.angle, this.angle));
        left.mult(0.67);
        var newEndL = p5.Vector.add(this.branches[i].end, left);

        var right = p5.Vector.sub(this.branches[i].end, this.branches[i].start);
        right.rotate(random(-this.angle, this.angle));
        right.mult(0.67);
        var newEndR = p5.Vector.add(this.branches[i].end, right);

        if (currentLevel === this.maxLevels - 1) {
          var l = new Leaf(this.branches[i].end, this.colour);
          var r = new Leaf(this.branches[i].end, this.colour);
          this.leaves.push(l);
          this.leaves.push(r);
        } else {
          var l = new Branch(this.branches[i].end, newEndL);
          var r = new Branch(this.branches[i].end, newEndR);
          this.branches.push(l);
          this.branches.push(r);
        }
      }
      this.branches[i].finished = true;
    }
  },

  draw: function() {
    for (var i = this.branches.length - 1; i >= 0; i--) {
      stroke(100);
      this.branches[i].draw();
    }

    for (var i = this.leaves.length - 1; i >= 0; i--) {
      this.leaves[i].draw();
    }
  }
}
