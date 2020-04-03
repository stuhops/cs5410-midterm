let canvas = document.getElementById('canvas-main');
let context = canvas.getContext('2d');

let inputBuffer = {};
window.addEventListener('keydown', function(event) {
  inputBuffer[event.key] = event.key;
});
window.addEventListener('keyup', function(event) {
  delete inputBuffer[event.key];
});

let game = {
  route: 'main-menu',

  // ------------- Canvas --------------
  gameHeight: 1024,
  gameWidth: 1024,
  canvasHeight: 400,
  canvasWidth: 400,
  canvasDivHeight: 800,
  canvasDivWidth: 800,
  canvas: canvas,
  context: context,

  // ---------- Game State -------------
  level: 1,
  levels: 2,
  gameOver: false,
  score: 100,
  gameLoopRunning: false,

  // ---------- Game Vars --------------
  baseScore: 0,
  baseTimer: 0,
  moves: 0,
  gridWidth: 4,
  gridHeight: 4,
  win: false,

  // --------- High Scores -------------
  highScores: ['Unclaimed', 'Unclaimed', 'Unclaimed', 'Unclaimed', 'Unclaimed'],

  // ----------- Controls --------------
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  mouseCapture: false,

  // ------------ Audio ----------------

  // ------------ Images ---------------
};

if(JSON.parse(window.localStorage.getItem('midterm-high-scores')) !== null)
  game.highScores = JSON.parse(window.localStorage.getItem('midterm-high-scores'));
manageHighScores();

if(JSON.parse(window.localStorage.getItem('midterm-controls')) !== null) {
  game.up = JSON.parse(window.localStorage.getItem('midterm-controls')).up;
  game.down = JSON.parse(window.localStorage.getItem('midterm-controls')).down;
  game.left = JSON.parse(window.localStorage.getItem('midterm-controls')).left;
  game.right = JSON.parse(window.localStorage.getItem('midterm-controls')).right;
}

document.getElementById('control-up').innerHTML = game.up;
document.getElementById('control-down').innerHTML = game.down;
document.getElementById('control-left').innerHTML = game.left;
document.getElementById('control-right').innerHTML = game.right;

function newGame() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  domStats.initialize();

  game.tiles = game.getNewTiles(game.level);
  game.shuffleTiles(20);
  game.win = false;
  game.moves = 0;

  game.gameLoop.start();
}
