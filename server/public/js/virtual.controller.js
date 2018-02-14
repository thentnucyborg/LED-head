// Create a Paper.js Path to draw a line into it:
var path = new Path();
// Give the stroke a color
path.strokeColor = 'black';
let grid = []
let stride = 10
for (let y = 5; y < 1000; y += stride) {
    let line = []
    for (let x = 5; x < 1000; x += stride) {
        line.push(new Rectangle(x, y, stride, stride))
    }
    grid.push(line)
}

var start = new Point(0,0);
// Move to start and draw a line from there
path.moveTo(start);

// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
path.lineTo(start + [ 100, 200 ]);