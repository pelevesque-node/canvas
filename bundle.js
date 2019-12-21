/* global event, Image */
'use strict'

const Canvas = function (id, options) {
  this.canvas = document.getElementById(id)
  this.context = this.canvas.getContext('2d')
  this.size = {
    initial: {
      width: this.canvas.width,
      height: this.canvas.height
    },
    current: {
      width: this.canvas.width,
      height: this.canvas.height
    }
  }
  this.images = {}
  this.setOptions(options)
}

Canvas.prototype.setOptions = function (options) {
  this.options = Object.assign({}, this._defaultOptions, this.options || {}, options)
  this.canvas.style.background = this.options.backgroundColor
  this._setBackgroundImage()
  this.canvas.style.border = this.options.border
  this.canvas.style.cursor = this.options.cursor
  this.context.globalCompositeOperation = this.options.globalCompositeOperationDefault
}

Canvas.prototype._setBackgroundImage = function (url = this.options.backgroundImage) {
  this.options.backgroundImage = url
  if (this.options.backgroundImage !== 'none') {
    this.canvas.style.background = "url('" + this.options.backgroundImage + "')"
  } else {
    this.canvas.style.background = this.options.backgroundColor
  }
}

Canvas.prototype.resize = function (width, height) {
  this.canvas.width = width
  this.canvas.height = height
  this.size.current.width = width
  this.size.current.height = height
}

Canvas.prototype.clear = function () {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
}

Canvas.prototype.loadImage = function (src) {
  if (!Object.prototype.hasOwnProperty.call(this.images, src)) {
    const image = new Image()
    image.src = src
    this.images[src] = image
  }
}

Canvas.prototype.loadImages = function (sources) {
  sources.forEach(src => this.loadImage(src))
}

Canvas.prototype._drawImage = function (
  image, sx, sy, swidth, sheight, x, y, width, height, globalCompositeOperation
) {
  if (globalCompositeOperation) {
    var globalCompositeOperationOriginal = this.context.globalCompositeOperation
    this.context.globalCompositeOperation = globalCompositeOperation
  }
  this.context.drawImage(image, sx, sy, swidth, sheight, x, y, width, height)
  if (globalCompositeOperation) {
    this.context.globalCompositeOperation = globalCompositeOperationOriginal
  }
}

Canvas.prototype._drawImageWhenLoaded = function (
  image, sx, sy, swidth, sheight, x, y, width, height, globalCompositeOperation
) {
  if (image.complete) {
    this._drawImage(image, sx, sy, swidth, sheight, x, y, width, height, globalCompositeOperation)
  } else {
    image.onload = () => {
      this._drawImage(image, sx, sy, swidth, sheight, x, y, width, height, globalCompositeOperation)
    }
  }
}

Canvas.prototype.image = function (src, x, y, globalCompositeOperation) {
  this.imageClipped(src, null, null, null, null, x, y, null, null, globalCompositeOperation)
}

Canvas.prototype.imageResized = function (src, x, y, width, height, globalCompositeOperation) {
  this.imageClipped(src, null, null, null, null, x, y, width, height, globalCompositeOperation)
}

Canvas.prototype.imageClipped = function (
  src, sx, sy, swidth, sheight, x, y, width, height, globalCompositeOperation
) {
  this.loadImage(src)
  const image = this.images[src]
  width = width || image.width
  height = height || image.height
  swidth = swidth || width
  sheight = sheight || height
  this._drawImageWhenLoaded(image, sx, sy, swidth, sheight, x, y, width, height, globalCompositeOperation)
}

Canvas.prototype.text = function (text, x, y, fillStyle, font, textAlign, textBaseline) {
  this.textCompressed(text, x, y, undefined, fillStyle, font, textAlign, textBaseline)
}

Canvas.prototype.textCompressed = function (
  text,
  x,
  y,
  maxWidth,
  fillStyle = this.options.color,
  font = this.options.font,
  textAlign = this.options.textAlign,
  textBaseline = this.options.textBaseline
) {
  this.context.fillStyle = fillStyle
  this.context.font = font
  this.context.textAlign = textAlign
  this.context.textBaseline = textBaseline
  this.context.fillText(text, x, y, maxWidth)
}

Canvas.prototype.line = function (x1, y1, x2, y2, strokeStyle, strokeWidth) {
  this.context.beginPath()
  this.context.moveTo(x1, y1)
  this.context.lineTo(x2, y2)
  this._stylizeStroke(strokeStyle, strokeWidth)
}

Canvas.prototype.lines = function (lines, strokeStyle, strokeWidth) {
  this.context.beginPath()
  lines.forEach(line => {
    this.context.moveTo(line[0], line[1])
    this.context.lineTo(line[2], line[3])
  })
  this._stylizeStroke(strokeStyle, strokeWidth)
}

Canvas.prototype.polyLine = function (coords, strokeStyle, strokeWidth) {
  this.context.beginPath()
  this.context.moveTo(coords[0][0], coords[0][1])
  for (let i = 1, len = coords.length; i < len; i++) {
    this.context.lineTo(coords[i][0], coords[i][1])
  }
  this._stylizeStroke(strokeStyle, strokeWidth)
}

Canvas.prototype.quadraticCurve = function (x1, y1, x2, y2, qx, qy, strokeStyle, strokeWidth) {
  this.context.beginPath()
  this.context.moveTo(x1, y1)
  this.context.quadraticCurveTo(qx, qy, x2, y2)
  this._stylizeStroke(strokeStyle, strokeWidth)
}

Canvas.prototype.polygon = function (coords, fillStyle, strokeStyle, strokeWidth) {
  this.context.beginPath()
  this.context.moveTo(coords[0][0], coords[0][1])
  coords.forEach(coord => {
    this.context.lineTo(coord[0], coord[1])
  })
  this._stylize(fillStyle, strokeStyle, strokeWidth)
}

Canvas.prototype.circle = function (cx, cy, r, fillStyle, strokeStyle, strokeWidth) {
  this.context.beginPath()
  this.context.arc(cx, cy, r, 0, 2 * Math.PI, false)
  this._stylize(fillStyle, strokeStyle, strokeWidth)
}

Canvas.prototype.rectangle = function (x, y, w, h, fillStyle, strokeStyle, strokeWidth) {
  this.context.beginPath()
  this.context.rect(x, y, w, h)
  this._stylize(fillStyle, strokeStyle, strokeWidth)
}

Canvas.prototype.square = function (x, y, w, fillStyle, strokeStyle, strokeWidth) {
  this.rectangle(x, y, w, w, fillStyle, strokeStyle, strokeWidth)
}

Canvas.prototype._stylizeFill = function (fillStyle = this.options.color) {
  this.context.fillStyle = fillStyle
  this.context.fill()
}

Canvas.prototype._stylizeStroke = function (strokeStyle = this.options.color, strokeWidth = '1') {
  this.context.strokeStyle = strokeStyle
  this.context.lineWidth = strokeWidth
  this.context.stroke()
}

Canvas.prototype._stylize = function (fillStyle = this.options.color, strokeStyle, strokeWidth) {
  this._stylizeFill(fillStyle)
  this._stylizeStroke(strokeStyle || fillStyle, strokeWidth)
}

Canvas.prototype.getMousePosition = function () {
  const rect = this.canvas.getBoundingClientRect()
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

Canvas.prototype._defaultOptions = {
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

window.Canvas = Canvas
