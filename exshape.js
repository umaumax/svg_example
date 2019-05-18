const arrow_path = 'M52 34 L52 38 L60 32 L52 26 L52 30 L4 30 L4 34 Z'

// NOTE: draw: SVG(document.documentElement)
exports.arrow = function(draw) {
    var path = draw.path(arrow_path)
    return path
}

exports.grid_rect = function(draw, opt = {}) {
    const default_opt = {
        x: 100,
        y: 100,
        fill_color: '#eee',
        edge_color: '#000',
        access_line: true,
        access_line_fill_color: '#f06',
        access_line_reverse_access: false,
        access_line_blocking: false,
        access_line_blocking_fill_color: '#703',
        access_line_blocking_reverse_access: false,
        width: 200,
        height: 200,
        x_grid_num: 4,
        y_grid_num: 4,
        stroke_width: 1,
    }
    opt = Object.assign(default_opt, opt)

    var width = opt.width
    var height = opt.height
    var x_grid_num = opt.x_grid_num
    var y_grid_num = opt.y_grid_num

    var x_stride = width / x_grid_num
    var y_stride = height / y_grid_num
    var stroke_width = opt.stroke_width

    var pattern = draw.pattern(x_stride, y_stride, function(add) {
        // NOTE: grid pattern
        add.rect(x_stride - stroke_width, y_stride - stroke_width).fill(opt.edge_color)
        // NOTE: move(at relative posision of previous posision)
        add.rect(x_stride - (stroke_width + 3), y_stride - (stroke_width + 3)).fill(opt.fill_color).move(stroke_width + 1, stroke_width + 1)
    })

    var rect = draw.rect(width, height)
    rect.fill(pattern)
    // NOTE: position must be multiple of grid size
    // so, use translate not move
    rect.move(0, 0)
    rect.translate(opt.x, opt.y)

    // NOTE: deep copy
    // FYI: [What is the most efficient way to deep clone an object in JavaScript? \- Stack Overflow]( https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript )
    var tmp_opt = JSON.parse(JSON.stringify(opt));
    if (opt.access_line) {
        var line = exports.grid_rect_access_arrow(draw, Object.assign(tmp_opt, {
            reverse: opt.access_line_reverse_access,
            stroke_width: 2,
            fill_color: opt.access_line_fill_color
        }))
    }
    // NOTE: for blocking loop access
    if (opt.access_line_blocking) {
        for (var j = 0; j < y_grid_num; j++) {
            for (var i = 0; i < x_grid_num; i++) {
                var x = opt.x + i * x_stride
                var y = opt.y + j * y_stride
                var line = exports.grid_rect_access_arrow(draw, Object.assign(tmp_opt, {
                    x: x,
                    y: y,
                    width: x_stride,
                    height: y_stride,
                    // NOTE: for simple display
                    x_grid_num: 2,
                    y_grid_num: 2,
                    reverse: opt.access_line_blocking_reverse_access,
                    stroke_width: 1,
                    fill_color: opt.access_line_blocking_fill_color
                }))
            }
        }
    }
    return rect
}

exports.grid_rect_access_arrow = function(draw, opt = {}) {
    const default_opt = {
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        x_grid_num: 4,
        y_grid_num: 4,
        stroke_width: 1,
        reverse_access: false,

        fill_color: '#f06',
    }
    opt = Object.assign(default_opt, opt)

    var width = opt.width
    var height = opt.height
    var x_grid_num = opt.x_grid_num
    var y_grid_num = opt.y_grid_num

    var x_stride = width / x_grid_num
    var y_stride = height / y_grid_num
    var stroke_width = opt.stroke_width

    // NOTE: gridの計算順番(x -> y)
    var access_line_pos = []
    if (opt.reverse_access == false) {
        for (var j = 0; j < y_grid_num; j++) {
            for (var i = 0; i < x_grid_num; i++) {
                var x = i * x_stride
                var y = j * y_stride
                access_line_pos.push([x, y])
            }
        }
    } else {
        for (var i = 0; i < x_grid_num; i++) {
            for (var j = 0; j < y_grid_num; j++) {
                var x = i * x_stride
                var y = j * y_stride
                access_line_pos.push([x, y])
            }
        }
    }
    var line = draw.polyline(access_line_pos).fill('none').stroke({
        color: opt.fill_color,
        width: stroke_width,
        linecap: 'rect'
    })
    line.marker('start', 10, 10, function(add) {
        add.circle(6).move(2, 2).fill(opt.fill_color)
    })
    line.marker('end', 10, 10, function(add) {
        add.path('M0 0 L10 5 L0 10 Z').fill(opt.fill_color)
    })
    line.translate(opt.x + x_stride / 2, opt.y + y_stride / 2)
    return line
}
