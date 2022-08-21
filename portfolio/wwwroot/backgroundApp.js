
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
class Canvas {
    constructor(width, height, step = 1) {
        this.baseLineWidth = 3;
        this.element = document.createElement('CANVAS');
        this.element.style.width = '100%';
        this.element.style.height = '100%';
        this.ctx = this.element.getContext('2d', { alpha: false });
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
        this.setSize(width, height);
        this.colors = new ListRoulette("#00ff04", "#00ff80", "#00eaff", "#00a6ff", "#0026ff", "#7300ff", "#ff00f2", "#ff0062", "#ff0000", "#ff8c00", "#fffb00", "#a6ff00");
        this.groups = new Array();
        this.step = step;
    }
    resizeCanvas(width, height) {
        this.setSize(width, height);
        this.groups.forEach(group => {
            group.maxRadius = this.calculateDistanceToFurthestCorner(group.largesCircle.x, group.largesCircle.y);
        });
    }
    setSize(width, height) {
        const pixelSize = width * height;
        if (pixelSize > 1728000) {
            const proportion = 1728000 / pixelSize;
            const proportion_sqrt = Math.sqrt(proportion);
            this.width = Math.floor(width * proportion_sqrt);
            this.height = Math.floor(height * proportion_sqrt);
            this.lineWidth = Math.ceil(this.baseLineWidth * proportion_sqrt);
        }
        else {
            this.width = width;
            this.height = height;
            this.lineWidth = this.baseLineWidth;
        }
        this.ctx.lineWidth = this.lineWidth;
        this.halfWidth = Math.floor(this.width / 2);
        this.halfHeight = Math.floor(this.height / 2);
        this.diagonal = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
        this.element.width = this.width;
        this.element.height = this.height;
    }
    calculateNextState() {
        this.groups = this.groups.filter(group => {
            return group.maxRadius > group.largesCircle.radius + this.step;
        });
        this.groups.forEach(group => {
            group.circles.forEach(circle => {
                circle.radius += this.step;
            });
        });
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    drawFrame() {
        this.ctx.lineWidth = this.lineWidth;
        this.calculateNextState();
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

class ListRoulette{
    constructor(...items) {
        this.items = items;
        this.lenght = items.length;
        this.current = -1;
    }
    get() {
        this.current++;
        if (this.current >= this.lenght) {
            this.current = 0;
        }
        return this.items[this.current];
    }
}

class ModuloCounter {
    constructor(modulo) {
        this.modulo = modulo;
        this.current = 0;
    }
    nextDidLoop() {
        this.current++;
        if (this.current >= this.modulo) {
            this.current = 0;
            return true;
        }
        return false;
    }
}



function randn_bm() {
    var rand = 0;
    for (var i = 0; i < 3; i += 1) {
        rand += Math.random();
    }
    return rand / 3;
}
export function createBackgroundApp(element) {
    return new BackgroundApp(element);
}
export class BackgroundApp {
    constructor(element) {
        window.addEventListener('resize', () => { this.onWindowsResize(); });
        this.moduloCounters = this.getDefaultModuloCounters();
        this.element = element;
        this.canvas = new Canvas(this.element.clientWidth, this.element.clientHeight, 2, 50);
        this.element.appendChild(this.canvas.element);
        this.isRunning = false;
        this.start();
    }
    getDefaultModuloCounters() {
        return [
            new ModuloCounter(41),
            new ModuloCounter(199),
            new ModuloCounter(257),
        ];
    }
    start() {
        if (this.isRunning) { return; }
        this.isRunning = true;

        this.previousTimestam = 0;
        window.requestAnimationFrame((stmp) => { this.step(stmp); });
    }
    stop() {
        this.isRunning = false;
    }
    step(timestamp) {
        if (!this.isRunning) { return; }

        const elapse = timestamp - this.previousTimestam;
        if (elapse > 33) {

            this.moduloCounters.forEach(
                mc => {
                    if (mc.nextDidLoop()) {
                        this.addNewRandomCircle();
                    }
                }
            );
            
            this.canvas.drawFrame();
            this.previousTimestam = timestamp;
        }
        window.requestAnimationFrame((stmp) => { this.step(stmp); });
    }
    addNewRandomCircle() {
        this.canvas.addCircle(Math.floor((randn_bm() * this.canvas.width)), Math.floor((randn_bm() * this.canvas.height)));
    }
    onWindowsResize() {
        this.canvas.resizeCanvas(this.element.clientWidth, this.element.clientHeight);
    }
}