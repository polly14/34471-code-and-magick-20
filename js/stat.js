'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var barHeight = 150;
var textColor = '#000';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomColor = function (ctx, player) {
  var random = Math.random();
  if (random < 0.1) {
    random += 0.1;
  } else if (random > 0.9) {
    random -= 0.1;
  }
  if (player === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = ['hsl(240,', (100 * random).toFixed(0), '%', ', 50%)'].join('');
  }
};

var drawRect = function (ctx, time, i, times) {
  var maxTime = getMaxElement(times);
  ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - BAR_WIDTH, BAR_WIDTH, -(barHeight * time) / maxTime);
};

var drawText = function (ctx, time, i, times, player) {
  var maxTime = getMaxElement(times);
  ctx.fillStyle = textColor;
  ctx.fillText(player, CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 2);
  ctx.fillText(Math.round(time), CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - (barHeight * time) / maxTime - BAR_GAP - GAP);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = textColor;
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 120, 25);
  ctx.fillText('Список результатов:', 120, 45);
  for (var i = 0; i < players.length; i++) {
    drawText(ctx, times[i], i, times, players[i]);
    getRandomColor(ctx, players[i]);
    drawRect(ctx, times[i], i, times);
  }
};
