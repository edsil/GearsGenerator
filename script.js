let canvas, ctx;
let divInfo1, divInfo2, divInfo3, divInfo4;
let elbgcolor, elfbcolor;
let eldents, elproport;
let elradius, elcircles, elcircradius;
let h, w;
let mouse = { x: 0, y: 0 };
let initTime = Date.now();
let lastUpdateTime = initTime;
let frames = 0;
let fps;
const bgImg = new Image();
bgImg.src = "./blueprint-clean-background.png";
const backgroundColor = "#0000";
const drawing = "#FFFFFF";

const lineWidth = 1;
var choosenGear = 6;
var gears = new Array(7);
var sp = 0.0;
var proport = 0.25;

window.onload = function () {
  initDomElements();
  initListeners();
  setGears();
  resize();
  setGears();

  animate();
};

function initDomElements() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  divInfo1 = document.getElementById("info1");
  divInfo1.innerHTML = "Mouse";
  divInfo2 = document.getElementById("info2");
  divInfo3 = document.getElementById("info3");
  divInfo3.innerHTML = "Key";
  divInfo4 = document.getElementById("info4");
  elbgcolor = document.getElementById("bgcolor");
  elfbcolor = document.getElementById("fbcolor");
  eldents = document.getElementById("dents");
  elproport = document.getElementById("proport");
  elradius = new Array(9);
  for (var i = 0; i < 9; i++) {
    elradius[i] = document.getElementById("r" + i);
  }
  elcircles = document.getElementById("circles");
  elcircradius = document.getElementById("circlesRadius");
}

function initListeners() {
  //window.onresize = resize;
  window.onkeydown = keyDown;
  window.onkeyup = keyUp;
  window.onmousedown = mouseDown;
  window.onmouseup = mouseUp;
  window.onmousemove = mouseMove;
}

function resize() {

  /*
  w = canvas.width = window.innerWidth - canvas.offsetLeft * 2;
  h = canvas.height = window.innerHeight - canvas.offsetTop - 47;
  if (w / 16 > h / 9) {
    w = h * (16 / 9);
  } else {
    h = w * (9 / 16);
  }
  ctx.scale(1920/w, 1080/h);
  */
  w = h = gears[choosenGear][4][0] * 2+lineWidth+1;
  canvas.width = w;
  canvas.height = h;
  //w=1920;
  //h=1080;
  
  divInfo2.innerHTML = "Width: " + w + "<br>Height: " + h;
}

function keyDown(e) {
  divInfo3.innerHTML = "KeyDown: " + e.key + "<br>Code: " + e.code;
}

function keyUp(e) {
  divInfo3.innerHTML = "KeyUp: " + e.key + "<br>Code: " + e.code;
}

function mouseDown(e) {
  mouse.x = e.clientX - canvas.offsetLeft;
  mouse.y = e.clientY - canvas.offsetTop;
  divInfo1.innerHTML =
    "Mouse: Down" +
    (e.buttons == 0 ? "" : " - " + e.buttons) +
    "<br>X: " +
    e.clientX +
    "<br>Y: " +
    e.clientY;
}

function mouseUp(e) {
  mouse.x = e.clientX - canvas.offsetLeft;
  mouse.y = e.clientY - canvas.offsetTop;
  divInfo1.innerHTML =
    "Mouse: Up" +
    (e.buttons == 0 ? "" : " - " + e.buttons) +
    "<br>Mouse X: " +
    mouse.x +
    "<br>Mouse Y: " +
    mouse.y;
}

function mouseMove(e) {
  mouse.x = e.clientX - canvas.offsetLeft;
  mouse.y = e.clientY - canvas.offsetTop;
  divInfo1.innerHTML =
    "Mouse" +
    (e.buttons == 0 ? "" : " - " + e.buttons) +
    "<br>Mouse X: " +
    mouse.x +
    "<br>Mouse Y: " +
    mouse.y;
}

function animate(ts) {
  frames++;
  lastUpdateTime = Date.now();
  fps = Math.round(frames / ((lastUpdateTime - initTime) / 1000));
  draw(ts);
  requestAnimationFrame(animate);
}

function readUserAndDraw(){
  w = h = elradius[0].value * 2 + lineWidth + 1;
  let dents = eldents.value * 1;
  
  gears[7] = [w/2,h/2,dents,proport,[240,224,128,112,56,32,16,16],8,0.9,0,0];
}

function setGears(){
gears[0] = [w/2,h/2,32,proport,[240,224,128,112,56,32,16,16],8,0.9,0,0];
gears[1] = [w/2,h/2,28,proport,[210,194,112,98,64,32,32,32],7,0.9,0,0];
gears[2] = [w/2,h/2,24,proport,[180,164,96,84,64,32,32,32],6,0.9,0,0];
gears[3] = [w/2,h/2,20,proport,[150,134,80,70,16,16,16,16],5,0.9,0,0];
gears[4] = [w/2,h/2,16,proport,[120,104,64,56,24,24,24,24],4,0.9,0,0];
gears[5] = [w/2,h/2,12,proport,[90,74,48,42,32,8,8,8],3,0.9,0,0];
gears[6] = [w/2,h/2,8,proport,[60,44,32,28,16,16,16,16],2,0.9,0,0];
}

function draw(ts) {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, w, h);
  //ctx.drawImage(bgImg, 0, 0);
  ctx.strokeStyle = drawing;
  ctx.lineWidth = lineWidth;
  for (var i = choosenGear; i < choosenGear+1; i++) {
    var g = gears[i];
    var angleOffset = ((g[7]*ts / 1000) % (Math.PI * 2));
    drawGear(g[0], g[1], g[2], g[3], g[4], g[5], g[6], angleOffset + g[8]);
  }
}

function drawGear(
  x,
  y,
  dentCount,
  proportion,
  r,
  numCircles,
  circlesRadius,
  angleOffset = 0
) {
  var bend = 0.3;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angleOffset);

  x = 0;
  y = 0;
  ctx.beginPath();
  let outerAngle = (proportion * (Math.PI * 2)) / dentCount;
  let innerAngle = ((1 - proportion) * (Math.PI * 2)) / dentCount;
  for (let i = 0; i < dentCount; i++) {
    let angleStart0 = (i * Math.PI * 2) / dentCount;
    let angleEnd0 = angleStart0 + outerAngle;
    let angleStart1 = angleEnd0 + innerAngle * bend;
    let angleEnd1 = angleStart1 + innerAngle * (1 - 2 * bend);

    ctx.arc(x, y, r[0], angleStart0, angleEnd0, false);
    ctx.arc(x, y, r[1], angleStart1, angleEnd1, false);
  }
  ctx.lineTo(x + r[0], y);
  ctx.stroke();

  for (let i = 2; i < r.length; i++) {
    ctx.beginPath();
    ctx.arc(x, y, r[i], 0, 2 * Math.PI);
    ctx.stroke();
  }
  var maxRadius = (r[3] - r[4]) / 2;
  var centerRadius = r[4] + maxRadius;
  var radius = maxRadius * circlesRadius;
  for (let i = 0; i < numCircles; i++) {
    let angle = (i * Math.PI * 2) / numCircles;
    let circleX = x + Math.cos(angle) * centerRadius;
    let circleY = y + Math.sin(angle) * centerRadius;
    ctx.beginPath();
    ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}
