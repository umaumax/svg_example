# svg.js

[SVG\.js v2\.7 \| Home]( https://svgjs.com/docs/2.7/ )

## how to install
[svgdotjs/svgdom: Straightforward DOM implementation to make SVG\.js run headless on Node\.js]( https://github.com/svgdotjs/svgdom )

```
# svg.js v2.5
npm install svg.js svgdom

## svg.js v3.0
# npm install @svgdotjs/svg.js svgdom
```

## ISSUE
* svg.js v3.0とsvgdomの組み合わせでは`newLine()`によって，改行されない問題があるが，`y()`を利用すれば強制的に改行をすることは可能(`dy()`が無効のよう)

## NOTE
* 日本語も問題なく表示可能
* [jsdom \- Is there a way to make svg\.js work with node\.js \- Stack Overflow]( https://stackoverflow.com/questions/36133657/is-there-a-way-to-make-svg-js-work-with-node-js )
  * [SVG\.js v2\.7 \| FAQ]( https://svgjs.com/docs/2.7/faq/#can-svg-js-run-on-node-js )

> Here is the working example usage of svg.js inside nodejs project, svgdom is the suggested library from svg.js official website

## example

<img src="./example.svg" width="800px" height="800px"/>

### text
```
# single line
var text = draw.plain('calc xxx')
text.move(500, 100)

# multi line
var text = draw.text('step 1. calc xxx\nstep 2. calc yyy')
text.move(500, 100)
```

### arrow
```
var arrow_path = exshape.arrow(draw)
arrow_path.fill('none').stroke({
    width: 8,
    color: '#ccc'
}).move(300, 250)
// arrow_path.rotate(45)
```

### grid box
```
var rect = exshape.grid_rect(draw, {
    x: 50,
    y: 150,
    width: 200,
    access_line_fill_color: '#00f',
})
```

### for blocking box
```
var rect = exshape.grid_rect(draw, {
    x: 50,
    y: 150,
    width: 200,
    access_line_blocking: true,
    access_line_blocking_fill_color: '#00f',
})
```

## FYI
### csv online generator
* [Paths]( http://jxnblk.com/paths/?d=M8%2048%20L56%2048%20L32%2012%20Z )
* [Clip Path Generator \- CSS Plant]( http://www.cssplant.com/clip-path-generator )
* [Vector Paint \- SVG Editor]( http://vectorpaint.yaks.co.nz/ )
* [Poly Maker]( http://lab.aerotwist.com/canvas/poly-maker/ )
  * 幾何学のロゴ限定
