'use strict';

require('../lib/js/jquery-3.3.1.min')();
require('../lib/js/head.min')();
// require('../lib/js/JQuery-Snowfall/dist/snowfall.jquery.min');
require('../lib/js/pointer');
// require('../lib/js/pixi.min');
// require('../lib/js/pixi-filters');
// require('../lib/js/repo.min');
const WebFont = require('../lib/js/webfont');

/*
$(document).snowfall({
  flakeCount : 50,
  minSize : 5,
  maxSize : 10,
  shadow : true,
  flakeColor: "#b63739"
});
*/
// $('#repo').repo({ user: 'waricoma', name: 'slamoji' });

$('head').append($(`<link rel="stylesheet" type="text/css" href="${window.location.search.match( /print-pdf/gi ) ? 'css/print/pdf.css' : 'css/print/paper.css'}">`));

let logoLeft = 0;
$('.logo').each(function(){
  $(this).attr('style', `width: ${Math.floor(12+Math.random()*9)}%;left:${logoLeft+Math.floor(Math.random()*11)}%;`);
  $(this).css('animation-delay', `-${Math.floor(Math.random()*61)}s`);
  logoLeft+=20;
});

const fonts = [/*'851H-kktt_004',*/ /*'GLT-GonunneObsolete',*/ /*'GenEiAntique_v4',*/ /*'fontopoSunnyDay-Regular',*/ /*'PixelMplus10-Regular',*/ 'PixelMplus12-Regular', /*'nicokaku_v1'*/];
for(let font of fonts) $('#fontStatus').append(`<tr><td>${font}</td><td>in preparation</td></tr>`);
$('#fontStatus > tr').eq($('#fontStatus > tr').length-1).children('td').css('border-bottom', '0px');

const displayFontState = (font_family, msg) => { $('#fontStatus > tr').eq(fonts.indexOf(font_family)).children('td').eq(1).text(msg); };

WebFont.load({
  custom: { families: fonts, urls: ['css/main.css'] },
  fontloading: (font_family) => { displayFontState(font_family, 'Loading...') },
  fontactive: (font_family) => {
    displayFontState(font_family, 'Available!');
    $('#fontStatus > tr').eq(fonts.indexOf(font_family)).children('td').eq(1).css('font-family', `'${font_family}'`);
  },
  fontinactive: (font_family) => { displayFontState(font_family, 'Failed! please reload.'); }
});

Reveal.initialize({
  history: true,
  dependencies: [
    { src: 'plugin/markdown/marked.js' },
    { src: 'plugin/markdown/markdown.js' },
    { src: 'plugin/notes/notes.js', async: true },
    { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
  ]
});

const activeController = setInterval(() => {
  $('.controls').css('z-index', 500);
  if ($('.controls')[0]) {
    clearInterval(activeController);
  }
}, 500);

const currentWH = () => {
  if (window.innerHeight < window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      shuffle: false
    };
  } else {
    return {
      width: window.innerHeight,
      height: window.innerWidth,
      shuffle: true
    };
  }
};

const reStyling = () => {
  const currentWHObj = currentWH();

  $('#pixi').css('height', window.innerHeight);
  $('#pixi').css('width', window.innerWidth);

  if (currentWHObj.shuffle) {

  }
};

window.onresize = () => {
  reStyling();
};

reStyling();

/*
const pixiApp = new PIXI.Application({
  view: document.getElementById('pixi'),
  transparent: true,
  width: window.innerWidth,
  height: window.innerHeight,
  autoResize: 1
});
document.body.appendChild(pixiApp.view);

const textobj = new PIXI.Text('Hello World!', {font:'bold 60pt Arial', fill:'white'});
textobj.x = pixiApp.renderer.width / 2;
textobj.y = pixiApp.renderer.height / 2;
textobj.anchor.x = 0.5;
textobj.anchor.y = 0.5;

pixiApp.stage.addChild(textobj);

pixiApp.ticker.add(() => {
  textobj.rotation += 0.01;
});

const glitchFilter = new PIXI.filters.GlitchFilter({
  slices: 10,
  offset: 100,
  direction: 0,
  fillMode: 2,
  average: false,
  red: [2, 2],
  green: [-10, 4],
  blue: [10, -4],
  seed: 0.5
});

const pixiSprite = new PIXI.Sprite();

pixiSprite.alpha = 0;
pixiSprite.filters = [glitchFilter];

pixiApp.stage.addChild(pixiSprite);
*/
