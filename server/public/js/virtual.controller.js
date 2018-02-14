// Create a Paper.js Path to draw a line into it:


var children = new Array()
settings = {x: 500, y: 500, width: 20}


for (y = 0; y < settings.x; y += settings.width) {
    for (x = 0;  x < settings.y; x += settings.width) {
        children.push(place(new Point(x, y), settings.width))
    }
}
var eclipse = new Rectangle()
eclipse.center = new Point(settings.x/2, settings.y/2)
eclipse.width = settings.width
eclipse.height = settings.width
eclipse.fillColor = 'Black'
var mask = CompoundPath({
    children: [new Shape.Ellipse(eclipse)],
    fillColor: 'black',
    selected: true
})
mask.fillColor= 'red'
var group = new Group(mask, children)
group.clipped = true



function place(point, size) {
    var rect = new Path.Rectangle(point, size)
    rect.fillColor = 'white'
    rect.strokeColor = 'black'
    return rect
}