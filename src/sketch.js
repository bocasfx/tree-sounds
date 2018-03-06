
var angle = 0;
var slider;
var oscillators = [];
var trees = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  var root1 = createVector(width / 2, height);
  var root2 = createVector(width / 4, height);

  for (var i = 0; i < 10; i++) {

    var options = {
      length: random(50, 200),
      levels: parseInt(random(6, 12)),
      root: createVector(random(width), height),
      angle: PI / random(2, 6),
      colour: color(random(255), random(255), random(255), 100)
    };

    trees.push(new Tree(options));
  }
}

function draw() {
  background(50);
  trees.forEach(function(tree) {
    tree.draw();
  })
}
