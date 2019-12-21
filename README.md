[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# canvas

A simple object to draw on an HTML canvas.

## Node Repository

https://www.npmjs.com/package/@pelevesque/canvas

## Example

@see index.html

## Installation

`npm install @pelevesque/canvas`

## Tests

### Standard Style

`npm test`

## Methods

- `setOptions` sets options
- `resize` resizes the canvas
- `clear` clears the canvas
- `loadImage` loads an image
- `loadImages` loads multiple images
- `image` draws an image
- `imageResized` draws an image with resizing
- `imageClipped` draws an image with clipping
- `text` draws text
- `textCompressed` draws text with a max width
- `line` draws a line
- `lines` draws multiple lines
- `polyline` draws a line with many segments
- `quadraticCurve` draws a quadratic curve
- `polygon` draws a polygon
- `circle` draws a circle
- `rectangle` draws a rectangle
- `square` draws a square
- `getMousePosition` gets the mouse position

## Usage

### Initialization

When initializing canvas, you must provide it with the HTML `id` of the
canvas you wish to use. Optionally, you may also override some default `params`
by passing an object as the second argument.

```js
// Initialize canvas without params.
const canvas = new Canvas(id)
```

```js
// Initialize canvas with overriding some params.
const canvas = new Canvas(id, {
  backgroundColor: '#555555',
  color: '#ffffff'
})
```

```js
// List of default params.
defaultParams = {
  globalCompositeOperationDefault: 'source-over',
  backgroundColor: 'none',
  backgroundImage: 'none',
  color: '#000000',
  border: 'none',
  font: '16px Arial',
  textAlign: 'center',
  textBaseline: 'middle',
  cursor: 'default'
}
```

### Set Options

Sets options.

```js
const options = {
  backgroundColor: '#336600',
  border: '1px solid #006600',
}
canvas.setOptions(options)
```

### Resize

Resizes the canvas.

```js
const width = 500
const height = 200
canvas.resize(width, height)
```

### Clear

Clears the canvas.

```js
canvas.clear()
```

### Load Image

Loads an image.

```js
canvas.loadImage(src)
```

### Load Images

Loads multiple images.

```js
canvas.loadImages(sources)
```

### Image

Draws an image.

#### required params

```js
canvas.image(src, x, y)
```

#### with optional params

```js
canvas.image(src, x, y, globalCompositeOperation)
```

### Image Resized

Draws an image with resizing.

#### required params

```js
canvas.imageResized(src, x, y, width, height)
```

#### with optional params

```js
canvas.imageResized(src, x, y, width, height, globalCompositeOperation)
```

### Image Resized

Draws an image with clipping.

#### required params

```js
canvas.imageClipped(src, sx, sy, swidth, sheight, x, y, width, height)
```

#### with optional params

```js
canvas.imageClipped(src, sx, sy, swidth, sheight, x, y, width, height, globalCompositeOperation)
```

### Text

Draws text.

`fillStyle`, `font`, `textAlign`, and `textBaseline` are optional.

```js
const text = 'hello cruel world!'
const x = 10
const y = 10
const fillStyle = '#444444'
const font = '24px Helvetica'
const textAlign = 'left'
const textBaseline = 'bottom'
canvas.text(text, x, y, fillStyle, font, textAlign, textBaseline)
```

### Text Compressed

Draws text with a max width.

`fillStyle`, `font`, `textAlign`, and `textBaseline` are optional.

```js
const text = 'hello cruel world!'
const x = 10
const y = 10
const maxWidth = 30
const fillStyle = '#444444'
const font = '24px Helvetica'
const textAlign = 'left'
const textBaseline = 'bottom'
canvas.textCompressed(text, x, y, maxWidth, fillStyle, font, textAlign, textBaseline)
```

### Line

Draws a line.

`strokeStyle` and `strokeWidth` are optional.

```js
const x1 = 10
const y1 = 10
const x2 = 100
const y2 = 120
const strokeStyle = '#666666'
const strokeWidth = '2'
canvas.line(x1, y1, x2, y2, strokeStyle, strokeWidth)
```

### Lines

Draws multiple lines.

`strokeStyle` and `strokeWidth` are optional.

```js
const lines = [
  [10, 10, 100, 100],
  [25, 25, 200, 120],
  [30, 30, 400, 300]  
]
const strokeStyle = '#666666'
const strokeWidth = '2'
canvas.lines(lines, strokeStyle, strokeWidth)
```

### Polyline

Draws a line with many segments.

`strokeStyle` and `strokeWidth` are optional.

```js
const lines = [
  [10, 10],
  [25, 25],
  [200, 150],
  [120, 50]
]
const strokeStyle = '#666666'
const strokeWidth = '2'
canvas.polyline(lines, strokeStyle, strokeWidth)
```

### Quadratic Curve

Draws a quadratic curve.

`strokeStyle` and `strokeWidth` are optional.

```js
const x1 = 10
const y1 = 10
const x2 = 100
const y2 = 120
const qx = 50
const qy = 100
const strokeStyle = '#666666'
const strokeWidth = '2'
canvas.quadraticCurve(x1, y1, x2, y2, qx, qy, strokeStyle, strokeWidth)
```

### Polygon

Draws a polygon.

`fillStyle`, `strokeStyle`, and `strokeWidth` are optional.

```js
const coords = [
  [10, 10],
  [200, 20],
  [130, 100],
  [45, 70]
]
const fillStyle = '#ff0000'
const strokeStyle = '#666666'
const strokeWidth = '2'
canvas.polygon(coords, fillStyle, strokeStyle, strokeWidth)
```

### Circle

Draws a circle.

`fillStyle`, `strokeStyle`, and `strokeWidth` are optional.

```js
const cx = 10
const cy = 10
const radius = 40
const fillStyle = '#ff0000'
const strokeStyle = '#666666'
const strokeWidth = '2'
canvas.circle(cx, cy, radius, fillStyle, strokeStyle, strokeWidth)
```

### Rectangle

Draws a rectangle.

`fillStyle`, `strokeStyle`, and `strokeWidth` are optional.

```js
const x = 15
const y = 15
const w = 100
const h = 200
const fillStyle = '#ff0000'
const strokeStyle = '#666666'
const strokeWidth = '2'
canvas.rectangle(x, y, w, h, fillStyle, strokeStyle, strokeWidth)
```

### Square

Draws a square.

`fillStyle`, `strokeStyle`, and `strokeWidth` are optional.

```js
const x = 25
const y = 300
const w = 100
const fillStyle = '#ff0000'
const strokeStyle = '#666666'
const strokeWidth = '2'
canvas.square(x, y, w, fillStyle, strokeStyle, strokeWidth)
```

### Get Mouse Position

Gets the mouse position.

```js
const mousePosition = canvas.getMousePosition()
const x = mousePosition.x
const y = mousePosition.y
```
