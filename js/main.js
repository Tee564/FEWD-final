function confettia(){
  (function() {
  var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, i, range, resizeWindow, xpos;

  NUM_CONFETTI = 350;

  COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];

  PI_2 = 2 * Math.PI;

  canvas = document.getElementById("world");

  context = canvas.getContext("2d");

  window.w = 0;

  window.h = 0;

 resizeWindow = function() {
    window.w = canvas.width = window.innerWidth;
    return window.h = canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resizeWindow, false);

  window.onload = function() {
    return setTimeout(resizeWindow,10);
  };

  range = function(a, b) {
    return (b - a) * Math.random() + a;
  };

  drawCircle = function(x, y, r, style) {
    context.beginPath();
    context.arc(x, y, r, 0, PI_2, false);
    context.fillStyle = style;
    return context.fill();
  };

  xpos = 0.5;

  document.onmousemove = function(e) {
    return xpos = e.pageX / w;
  };

  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  })();

  Confetti = (function() {
    function Confetti() {
      this.style = COLORS[~~range(0, 5)];
      this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
      this.r = ~~range(2, 6);
      this.r2 = 2 * this.r;
      this.replace();
    }

    Confetti.prototype.replace = function() {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = range(0, 2) + 8 * xpos - 5;
      return this.vy = 0.7 * this.r + range(-1, 1);
    };

    Confetti.prototype.draw = function() {
      var _ref;
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;
      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
      }
      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
      }
      if (!((0 < (_ref = this.x) && _ref < this.xmax))) {
        this.x = (this.x + this.xmax) % this.xmax;
      }
      return drawCircle(~~this.x, ~~this.y, this.r, "" + this.rgb + "," + this.opacity + ")");
    };

    return Confetti;

  })();

  confetti = (function() {
    var _i, _results;
    _results = [];
    for (i = _i = 1; 1 <= NUM_CONFETTI ? _i <= NUM_CONFETTI : _i >= NUM_CONFETTI; i = 1 <= NUM_CONFETTI ? ++_i : --_i) {
      _results.push(new Confetti);
    }
    return _results;
  })();

  window.step = function() {
    var c, _i, _len, _results;
    requestAnimationFrame(step);
    context.clearRect(0, 0, w, h);
    _results = [];
    for (_i = 0, _len = confetti.length; _i < _len; _i++) {
      c = confetti[_i];
      _results.push(c.draw());
    }
    return _results;
  };

  step();

}).call(this);

}




var done = false

var solution = ['B', 'A', 'L', 'M', 'E', 'R', 'S',
                'P', 'E', 'A', 'K'];

var images = ['.noose', '.head', '.body', '.left-arm', '.right-arm', '.left-leg', '.right-leg', '.left-eye', '.right-eye', '.mouth', '.win'];

var mistakes = 0;

var wordLetters = $('.letter');

$('.keyboard').on('click', '.key', function(event) {
  if(done){
    return;
  }
  var key = $(event.target)
  var letter = key.text();
  var failed = true;

  for (var i = 0; i < solution.length; i++) {
    if (letter == solution[i]) {
      wordLetters.eq(i).text(letter);
      failed = false;
      wordLetters.eq(i).addClass('correct');
    }
  }

  key.html("&nbsp;")
  key.addClass("disabled_key")
  key.removeClass("key")

  if (failed) {

    var image = images[mistakes];

    mistakes++;

    $('.image').css('display', 'none');
    $(image).css('display', 'block');

    if (mistakes==images.length-1){
      done = true;
      }
  }

var numCorrect = 0

wordLetters.each(function(){
  if ($(this).hasClass('correct')){
    numCorrect++
  }
})

if (numCorrect==solution.length){
  $('.image').css('display', 'none');
  $('.win').css('display', 'block')
  done = true
  key.html("&nbsp;")
  key.addClass("disabled_key")
  key.removeClass("key")
  confettia();
}

$('.restart-button').click(function() {
    location.reload();
});

});