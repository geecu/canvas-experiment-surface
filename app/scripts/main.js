/*global fabric*/
'use strict';

(function() {
  var size = 20;
  var sizeWithPadding = size * 2.2;
  var circles = [];
  var animating = true;
  var Point = fabric.Point;
  var requestAnimFrame = fabric.util.requestAnimFrame;
  var lastPoint = new Point(0, 0);
  var directionX = 1;
  var directionY = 1;

  var canvasEl = document.getElementById('c');
  canvasEl.setAttribute('width', window.innerWidth);
  canvasEl.setAttribute('height', window.innerHeight);

  var strengthEl = document.getElementById('strength');
  var speedEl = document.getElementById('speed');

  var canvas = new fabric.Canvas('c');
  canvas.selection = false;

  var resizeAll = function(p) {
    var strength = strengthEl.value;
    canvas.forEachObject(function(obj) {
      var distX = Math.abs(p.x - obj.left),
        distY = Math.abs(p.y - obj.top),
        dist = Math.round(Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2)));

      var radius = size / (dist / strength);
      radius = Math.min(radius, size * 1.5);

      obj.set({radius: radius});
    });
    canvas.renderAll();
  };

  var animationPausedTimeout;
  canvas.on('mouse:move', function(o) {
    var p = canvas.getPointer(o.e);

    resizeAll(p);
    lastPoint = p;
    animating = false;
    clearTimeout(animationPausedTimeout);
    animationPausedTimeout = setTimeout(function(){
      animating = true;
    }, 500);
  });

  for (var i = 0; i < window.innerWidth / sizeWithPadding - 1; i++) {
    circles[i] = [];
    for (var j = 0; j < window.innerHeight / sizeWithPadding - 1; j++) {
      var circle = new fabric.Circle({
        originX: size / 2,
        originY: size / 2,
        top: (j + 1) * sizeWithPadding,
        left: (i + 1) * sizeWithPadding,
        radius: size,
        fill: '#B6D3DC'
      });
      circles[i].push(circle);
      circle.i = i;
      circle.j = j;
      canvas.add(circle);
    }
  }

  var tick = function() {
    requestAnimFrame(tick);

    if (!animating) {
      return;
    }

    var speed = speedEl.value;
    lastPoint.x += directionX * speed;
    lastPoint.y += directionY * speed;
    if (lastPoint.x > window.innerWidth || lastPoint.x < 0) {
      directionX *= -1;
    }
    if (lastPoint.y > window.innerHeight || lastPoint.y < 0) {
      directionY *= -1;
    }
    resizeAll(lastPoint);
  };

  tick();
})();
