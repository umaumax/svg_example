#!/usr/bin/env node

// NOTE: for svg.js v2.5
const window = require('svgdom')
const SVG = require('svg.js')(window)
const document = window.document
const draw = SVG(document.documentElement)

// ----
var exshape = require('./exshape');
// ----

var text = draw.text('grid of image\nstep 1. calc xxx\nstep 2. calc yyy\nstep3. calc zzz')
text.move(100, 50)

var text = draw.text('pt.A (prev impl)')
text.font({
    family: 'Helvetica',
    size: 32,
    anchor: 'middle',
    leading: '1.5em'
})
text.move(150, 5)

var rect = exshape.grid_rect(draw, {
    x: 50,
    y: 150,
    width: 200,
    access_line_fill_color: '#00f',
})

// ----

var text = draw.text('pt.B (new impl)')
text.font({
    family: 'Helvetica',
    size: 32,
    anchor: 'middle',
    leading: '1.5em'
})
text.move(150, 375)

var text = draw.text('whole image\nstep 1. calc xxx\nstep 2. calc yyy')
text.move(100, 425)

var rect_opt = {
    x: 50,
    y: text.y() + 75,
    width: 200,
    height: 200,
    x_grid_num: 1,
    y_grid_num: 1,
    access_line: false,
}
var rect = exshape.grid_rect(draw, rect_opt)

var arrow_path = exshape.arrow(draw)
arrow_path.fill('none').stroke({
    width: 8,
    color: '#333'
}).move(300, rect_opt.y + rect_opt.height / 2)

var text = draw.text('grid of image\nstep 3. calc zzz')
text.move(450, 425)

var rect = exshape.grid_rect(draw, {
    x: 400,
    y: text.y() + 75,
    width: 200,
    height: 200,
    access_line_fill_color: '#00f',
})

// ----
console.log(draw.svg())
