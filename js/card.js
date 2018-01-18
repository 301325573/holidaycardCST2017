var canvas;
var canvasContext;
var bigFlake;
var flakes = [];
var flakesNum = 300;
var windX = 0.2;
var dropY = 2;

function rotate() {
    let slider = $("#slider")[0];
    let elements = $(".rotating");

    let trans = {};
    trans['transform'] = "rotateY(-" + slider.value + "deg)";

    
    for (var i = elements.length - 1; i >= 0; i--) {
        $(elements[i]).css(trans);
    }
}
function initCard() {
    canvas = $("#card-front")[0];
    canvas.width = 300;
    canvas.height = 400;
    canvasContext = canvas.getContext('2d');
    bigFlake = $("#bigFlake")[0];
    //console.log(canvas, canvasContext);
    //rotate();
    animateFront();
}

function newFlake(width) {
    return new flake(Math.random() * width,0);
}
function animateFront() {
    //console.log("animated");
    //dropY = Math.random() + 1;
    windX += ((Math.random() * 2) - 1) * 0.1;
    let width = canvas.width;
    let height = canvas.height;
    let tau = 2 * Math.PI;

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.drawImage(bigFlake,0,75,300,300);

    canvasContext.fillStyle = "white";

    if (flakes.length < flakesNum) {
        flakes.push(newFlake(width));
    }

    for (var i = flakes.length - 1; i >= 0; i--) {
        let flake = flakes[i];
        //flake.yM += dropY;
        flake.xM = windX * Math.random();
        flake.update();

        if (flake.y > height) {
            flakes[i] = flake = newFlake(width);
        } else if (flake.x > width) {
            flake.x -= width;
        } else if (flake.x < 0) {
            flake.x += width;
        }
        canvasContext.beginPath();
        canvasContext.arc(flake.x,flake.y,flake.size,0,tau);
        canvasContext.fill();
        //canvasContext.closePath();

    }
    requestAnimationFrame(animateFront);
}
function openCard() {
    let clas = "opened";
    let card = $("#holiday-card")[0];
    let text;
    if(!$(card).hasClass(clas)) {
        text = "Close Card";
    }
    else {
        text = "Open Card";
    }
    $("#opener").html(text);
    $("#holiday-card").toggleClass(clas);
}
class flake {
    constructor(x, y, size) {
        this.x = (x) ? x : 0;
        this.y = (y) ? y : 0;
        this.xM = 0;
        this.yM = 3;
        this.size = (size) ? size : Math.random() * 3;
      }
      update() {
        let rand = Math.random();
        this.x += this.xM * rand;
        this.y += this.yM * rand;
      }
}

$(initCard);