// Create a Paper.js Path to draw a line into it:


var children = new Array()
var settings = {x: 500, y: 500, width: 20}

for (y = 0; y < settings.x; y += settings.width) {
    for (x = 0; x < settings.y; x += settings.width) {
        children.push(place(new Point(x, y), settings.width))
        children[children.length-1].identifier = y*settings.width + x
        children[children.length-1].onFrame = function(event) {
            // Every frame, rotate the path by 3 degrees:
            if (event.count % children.length === this.identifier) {
                this.fillColor = 'red'
            }
        }
    }
}

// var mask = new Rectangle()
// mask.center = new Point(settings.x / 2, settings.y / 2)
// mask.width = settings.width
// mask.height = settings.width
// mask.fillColor = 'Black'
// var group = new Group(mask, children)
// group.clipped = true

function place(point, size) {
    var rect = new Path.Rectangle(point, size)
    rect.fillColor = 'white'
    rect.strokeColor = 'black'
    return rect
}
