'use strict';

let logoLeft = -15;
$('.logo').each(function () {
  const logoCss = `width: ${Math.floor(35 + Math.random() * 9)}%;left:${logoLeft + Math.floor(Math.random() * 11)}%;`;
  $(this).attr('style', logoCss);
  $(this).children('img').attr('style', logoCss);
  $(this).css('animation-delay', `-${Math.floor(Math.random() * 61)}s`);
  logoLeft += 20;
});

$('.title').glitch({
  maxint: 0.6,
  minint: 0.4,
  hshift: 25,
  vshift: 25
});

/*
$('.slider').slick({
  centerMode: true
});
*/

$(window).resize(() => {
  $('#nicoscreen').width(window.innerWidth);
  $('#nicoscreen').height(window.innerHeight);
});

nicoscreen.set({
  base: {
    color: '#95a5a6',
    speed: 'normal',
    interval: 'normal',
    font_size: '50px',
    loop: true
  },
  comments: []
});
nicoscreen.start();

const socket = io.connect();

socket.on('connect', () => {
  nicoscreen.add('connected');
});

socket.on('message', (msg) => {
  nicoscreen.add(msg);
});

const firstWhSize = window.innerWidth;

setInterval(() => {
  for (const comment of $('#nicoscreen div')) {
    if (firstWhSize === parseFloat($(comment).css('left').replace(/-|px/g, ''))) {
      $(comment).remove();
    }
  }
}, 5000);
