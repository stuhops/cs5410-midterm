game.gameLoop = (function() {
  let lastTime = performance.now();
  let requestFrame = true;

  function processInput() {
    for(input in inputBuffer) {
    }
  }


  function update(elapsedTime) {
    if(!game.win) {
      domStats.update(elapsedTime);
      game.mouse.update(elapsedTime);
      for(let i = 0; i < game.tiles.length; i++) {
        for(let j = 0; j < game.tiles[i].length; j++) {
          if(!game.tiles[i][j].isBlank()) {
            game.tiles[i][j].update(elapsedTime);
          }
        }
      }
      if(game.isWin()) {
        document.getElementById('win-message').style = 'display: block';
        endGame(elapsedTime);
      }
    }
    else {
      gameOver();
    }
  }


  function render() {
    if(!game.win){
      context.clearRect(0, 0, canvas.width, canvas.height);
      for(let i = 0; i < game.tiles.length; i++) {
        for(let j = 0; j < game.tiles[i].length; j++) {
          if(!game.tiles[i][j].isBlank()) {
            game.tiles[i][j].render();
          }
        }
      }
    }
  }


  function gameLoop(time) {
    let elapsedTime = time - lastTime;
    lastTime = time;

    processInput();
    update(elapsedTime);
    render();

    if(!game.gameOver && requestFrame) {
      requestAnimationFrame(gameLoop);
    }
  }

  function startGameLoop() {
    game.gameOverTimer = 3000;
    game.gameLoopRunning = true;
    lastTime = performance.now();
    requestFrame = true;
    requestAnimationFrame(gameLoop);
  }

  function stopGameLoop() {
    requestFrame = false;
    game.gameLoopRunning = false;
  }

  function gameOver() {
    document.getElementById('my-prev-score').innerHTML = document.getElementById('my-score').innerHTML;
    manageHighScores(game.moves);
    requestFrame = false;
  }

  function endGame(elapsedTime) {
    game.endGameTimer -= elapsedTime;
    if(game.endGameTimer < 0) game.win = true;
  }

  return {
    start: startGameLoop,
    stop: stopGameLoop,
  }
})();