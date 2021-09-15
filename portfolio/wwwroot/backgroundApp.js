
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
class Canvas {
    constructor(width, height, step = 1, wavelenght = 100) {
        this.baseLineWidth = 5;
        this.element = document.createElement('CANVAS');
        this.element.style.width = '100%';
        this.element.style.height = '100%';
        this.setSize(width, height);
        this.ctx = this.element.getContext('2d');
        this.ctx.lineWidth = this.lineWidth;
        this.colors = new ListRoulette("#00ff04", "#00ff80", "#00eaff", "#00a6ff", "#0026ff", "#7300ff", "#ff00f2", "#ff0062", "#ff0000", "#ff8c00", "#fffb00", "#a6ff00");
        this.groups = new Array();
        this.step = step;
        this.wavelenght = wavelenght;
    }
    resizeCanvas(width, height) {
        this.stopDrawing();
        this.setSize(width, height);
        this.groups = new Array();
        this.startDrawing();
    }
    setSize(width, height) {
        const pixelSize = width * height;
        if (pixelSize > 1728000) {
            const proportion = 1728000 / pixelSize;
            const proportion_sqrt = Math.sqrt(proportion);
            this.width = Math.floor(width * proportion_sqrt);
            this.height = Math.floor(height * proportion_sqrt);
            this.lineWidth = this.baseLineWidth * proportion_sqrt;
        }
        else {
            this.width = width;
            this.height = height;
            this.lineWidth = this.baseLineWidth;
        }
        this.halfWidth = Math.floor(this.width / 2);
        this.halfHeight = Math.floor(this.height / 2);
        this.diagonal = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
        this.element.width = this.width;
        this.element.height = this.height;
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    drawFrame() {
        this.groups.forEach(group => {
            group.draw(this.ctx);
        });
    }
    addCircle(x, y) {
        const newCircle = new Circle(1, x, y, this.lineWidth);
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].pointInside(x, y)) {
                continue;
            }
            this.groups[i].add(newCircle);
            return;
        }
        const maxRadius = this.calculateDistanceToFurthestCorner(x, y);
        const newCircleGroup = new CircleGroup(newCircle, this.colors.get(), maxRadius);
        this.groups.push(newCircleGroup);
    }
    calculateDistanceToFurthestCorner(x, y) {
        if (x < this.halfWidth) {
            if (y < this.halfHeight) {
                return distance(x, y, this.width, this.height);
            }
            else {
                return distance(x, y, this.width, 0);
            }
        }
        else {
            if (y < this.halfHeight) {
                return distance(x, y, 0, this.height);
            }
            else {
                return distance(x, y, 0, 0);
            }
        }
    }
    startDrawing() {
        this.ctx.lineWidth = this.lineWidth;
        if (this.interval) {
            return;
        }
        this.interval = setInterval(() => {
            this.groups = this.groups.filter(group => {
                return group.maxRadius > group.largesCircle.radius + this.step;
            });
            this.groups.forEach(group => {
                group.circles.forEach(circle => {
                    circle.radius += this.step;
                });
            });
            this.clearCanvas();
            this.drawFrame();
        }, this.wavelenght);
    }
    stopDrawing() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}


class Circle {
    constructor(radius, x, y, lineWidth) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.lineWidth = lineWidth;
    }
    pointInside(x, y) {
        const xDistance = this.x - x;
        const yDistance = this.y - y;
        const rad_minus_line = this.radius - this.lineWidth;
        return xDistance * xDistance + yDistance * yDistance <= rad_minus_line * rad_minus_line;
    }
    stroke(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
    }
    fill(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}


const PI2 = Math.PI * 2;
class CircleGroup {
    constructor(firstCircle, color, maxRadius) {
        this.circles = [firstCircle];
        this.largesCircle = firstCircle;
        this.color = color;
        this.maxRadius = maxRadius;
    }
    pointInside(x, y) {
        for (let i = 0; i < this.circles.length; i++) {
            if (this.circles[i].pointInside(x, y)) {
                return true;
            }
        }
        return false;
    }
    add(circle) {
        this.circles.push(circle);
    }
    draw(ctx) {
        ctx.strokeStyle = this.color;
        this.circles.forEach(circle => {
            circle.stroke(ctx);
        });
        this.circles.forEach(circle => {
            circle.fill(ctx);
        });
    }
}

class ListRoulette extends Array {
    constructor(...items) {
        super(...items);
    }
    get() {
        const tmp = this.shift();
        this.push(tmp);
        return tmp;
    }
}

function randn_bm() {
    var rand = 0;
    for (var i = 0; i < 3; i += 1) {
        rand += Math.random();
    }
    return rand / 3;
}
class BackgroundApp {
    constructor(element) {
        document.onvisibilitychange = () => { this.onVisibilityChange(); };
        window.onresize = () => { this.onWindowsResize(); };
        this.intervals = new Array();
        this.element = element;
        this.canvas = new Canvas(window.innerWidth, window.innerHeight, 2, 50);
        this.element.appendChild(this.canvas.element);
        this.start();
    }
    start() {
        this.intervals.push(setInterval(() => {
            this.canvas.addCircle(Math.floor((randn_bm() * this.canvas.width)), Math.floor((randn_bm() * this.canvas.height)));
        }, 1333));
        this.intervals.push(setInterval(() => {
            this.canvas.addCircle(Math.floor((randn_bm() * this.canvas.width)), Math.floor((randn_bm() * this.canvas.height)));
        }, 8888));
        this.intervals.push(setInterval(() => {
            this.canvas.addCircle(Math.floor((randn_bm() * this.canvas.width)), Math.floor((randn_bm() * this.canvas.height)));
        }, 6666));
        this.canvas.startDrawing();
    }
    stop() {
        while (this.intervals.length > 0) {
            clearInterval(this.intervals.pop());
        }
        this.canvas.stopDrawing();
    }
    onVisibilityChange() {
        if (document.visibilityState == "visible") {
            this.start();
        }
        else {
            this.stop();
        }
    }
    onWindowsResize() {
        this.stop();
        this.canvas.resizeCanvas(window.innerWidth, window.innerHeight);
        this.start();
    }
}