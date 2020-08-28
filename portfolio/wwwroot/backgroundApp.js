class Circle {
    constructor(radius, maxRadius, x, y) {
        this.radius = radius;
        this.maxRadius = maxRadius;
        this.x = x;
        this.y = y;
    }
    pointInside(x, y) {
        let xDistance = Math.abs(this.x - x);
        if (xDistance > this.radius) {
            return false;
        }
        let yDistance = Math.abs(this.y - y);
        if (yDistance > this.radius) {
            return false;
        }
        let distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        return distance <= this.radius;
    }
}

const PI2 = Math.PI * 2;
class CircleGroup {
    constructor(firstCircle, canvasWidh, canvasHeight) {
        this.canvas = document.createElement('CANVAS');
        this.canvas.width = canvasWidh;
        this.canvas.height = canvasHeight;
        this._ctx = this.canvas.getContext('2d');
        this.circles = new Array();
        this.circles.push(firstCircle);
        this.largesCircle = firstCircle;
    }
    get ctx() {
        return this._ctx;
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
    getImage() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = 'source-over';
        this.circles.forEach(circle => {
            this.ctx.beginPath();
            this.ctx.arc(circle.x, circle.y, circle.radius, 0, PI2);
            this.ctx.closePath();
            this.ctx.stroke();
        });
        this.ctx.globalCompositeOperation = 'destination-out';
        this.circles.forEach(circle => {
            this.ctx.beginPath();
            this.ctx.arc(circle.x, circle.y, circle.radius, 0, PI2);
            this.ctx.closePath();
            this.ctx.fill();
        });
        return this.canvas;
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
class Canvas {
    static dividor = 4;

    constructor(width, height, step = 1, wavelenght = 100) {
        this.element = document.createElement('CANVAS');
        this.setSize(width, height);
        this.ctx = this.element.getContext('2d');
        this.gradient = this.ctx.createLinearGradient(0, 0, this.diagonal, this.diagonal);
        this.gradient.addColorStop(0.0, '#ff5500');
        this.gradient.addColorStop(0.5, "#ffee00");
        this.gradient.addColorStop(1.0, "#ff5500");
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
        this.width = width;
        this.height = height;
        this.halfWidth = Math.floor(this.width / 2);
        this.halfHeight = Math.floor(this.height / 2);
        this.diagonal = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
        this.element.width = width;
        this.element.height = height;
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    drawFrame() {
        this.groups.forEach(group => {
            this.ctx.drawImage(group.getImage(), 0, 0);
        });
    }
    addCircle(x, y) {
        let maxRadius = this.calculateDistanceToFurthestCorner(x, y);
        let newCircle = new Circle(1, maxRadius, x, y);
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].pointInside(x, y)) {
                continue;
            }
            this.groups[i].add(newCircle);
            return;
        }
        let newCircleGroup = new CircleGroup(newCircle, this.width, this.height);
        newCircleGroup.ctx.strokeStyle = this.gradient;
        newCircleGroup.ctx.lineWidth = 5;
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
        if (this.interval) {
            return;
        }
        this.ctx.globalCompositeOperation = 'source-over';
        this.interval = setInterval(() => {
            this.groups.forEach(group => {
                group.circles.forEach(circle => {
                    circle.radius += this.step;
                });
            });
            if (this.groups.length > 0) {
                let firstCircle = this.groups[0].circles[0];
                if (firstCircle.radius >= firstCircle.maxRadius) {
                    this.groups.shift();
                }
            }
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

function randn_bm() {
    var rand = 0;
    for (var i = 0; i < 3; i += 1) {
        rand += Math.random();
    }
    return rand / 3;
}
class BackgroundApp {
    constructor(container) {
        this.container = container;
        document.onvisibilitychange = () => { this.onVisibilityChange(); };
        window.onresize = () => { this.onWindowsResize(); };
        this.intervals = new Array();
        this.canvas = new Canvas(this.container.clientWidth, this.container.clientHeight, 2, 50);
        this.container.appendChild(this.canvas.element);
        this.start();
    }
    start() {
        this.intervals.push(setInterval(() => {
            this.canvas.addCircle(Math.floor((randn_bm() * this.canvas.width)), Math.floor((randn_bm() * this.canvas.height)));
        }, 2333));
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
        this.canvas.resizeCanvas(this.container.clientWidth, this.container.clientHeight);
        this.start();
    }
}