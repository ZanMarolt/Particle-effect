// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

var $ = require('jquery');

var creator = false;
var xPos = Math.floor(Math.random() * -100) + 0;
var yPos = Math.floor(Math.random() * -100) + 0;

$(function() {

  var canvas, context, width, height;
  var particles = [];

  function init() {
    canvas = document.getElementById('main');
    context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.globalCompositeOperation = 'lighten';

    drawCanvas();

    for (var i = 0; i < 50; i++) {
      generateParticle();
    }

    draw();
  }

  function drawCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'hsla(199, 54%, 7%, 1)';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  function draw() {

    drawCanvas();

    for (var i = 0; i < particles.length; i++) {

      if(particles[i].dead)
        particles.splice(i, 1);

      context.globalCompositeOperation = "lighter";
      context.beginPath();

      var gradient = context.createRadialGradient(particles[i].x, particles[i].y, 0, particles[i].x, particles[i].y, particles[i].size);
      gradient.addColorStop(1, 'transparent');
      gradient.addColorStop(0, particles[i].color);

      context.fillStyle = gradient;
      context.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();

      //Do gravity stuff.
      particles[i].x += particles[i].Hvelocity;
      particles[i].y += particles[i].Vvelocity;

      if(particles[i].x - particles[i].size > canvas.width || particles[i].y - particles[i].size > canvas.height)
        particles[i].dead = true;
    }

    if (particles.length < 1000)
      for (var i = 0; i < 10; i++)
        generateParticle();

    requestAnimationFrame(draw);
  }

  function generateParticle() {

    var colors = [
      'rgba(41, 114, 34, 0.24)',
      'rgba(41, 128, 185, 0.3)'
    ];

    var color = Math.floor(Math.random() * colors.length) + 0;

    var particle = {
      size: Math.floor(Math.random() * 150) + 30,
      color: colors[color],
      Hvelocity: Math.floor(Math.random() * 9) + 1,
      Vvelocity: Math.floor(Math.random() * 9) + 1,
      dead: false
    };

    if(creator){
      if(isNaN(xPos) || isNaN(yPos)){
        particle.x = Math.floor(Math.random() * -100) + 0;
        particle.y = Math.floor(Math.random() * -100) + 0;
      }else{
        particle.x = Math.floor(xPos);
        particle.y = Math.floor(yPos);
      }


    }else{
      particle.x = Math.floor(Math.random() * -100) + 0;
      particle.y = Math.floor(Math.random() * -100) + 0;

    }

    particles.push(particle);
  }

  setTimeout(function() {
    init();
  }, 500);

});

$("canvas").mousemove(function(event) {
  xPos = event.clientX;
  yPos = event.clientY;

});

$(".creator").click(function(){
  if(creator){
    creator = false;
    $(".creator").fadeOut();
    setTimeout(function() {
      $("#c-text").text("I want to be the creator.");
      $(".creator").fadeIn();
    }, 3000);
  }else{
    creator = true;
    $(".creator").fadeOut();
    setTimeout(function() {
      $("#c-text").text("Being a creator is boring. I want to observe the nature.");
      $(".creator").fadeIn();
    }, 3000);
  }
});

$(window).resize(function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
