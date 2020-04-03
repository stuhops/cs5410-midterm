game.gameLoop = (function() {
  let lastTime = performance.now();
  let requestFrame = true;

  function processInput() {
    for(input in inputBuffer) {
    }
  }


  function update(elapsedTime) {
    domStats.update(elapsedTime);
    game.mouse.update(elapsedTime);
    for(let i = 0; i < game.tiles.length; i++) {
      for(let j = 0; j < game.tiles[i].length; j++) {
        if(!game.tiles[i][j].isBlank()) {
          game.tiles[i][j].update(elapsedTime);
        }
      }
    }
  }


  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < game.tiles.length; i++) {
      for(let j = 0; j < game.tiles[i].length; j++) {
        if(!game.tiles[i][j].isBlank()) {
          game.tiles[i][j].render();
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
    else {
      gameOver(elapsedTime);
    }
  }

  function startGameLoop() {
    game.gameOverTimer = 3000;
    lastTime = performance.now();
    requestFrame = true;
    requestAnimationFrame(gameLoop);
  }

  function stopGameLoop() {
    requestFrame = false;
  }

  function gameOver(elapsedTime) {
    game.gameOverTimer -= elapsedTime;
    document.getElementById('my-prev-score').innerHTML = document.getElementById('my-score').innerHTML;
    document.getElementById('my-score').innerHTML = '100';

    if(game.won) {
      if(game.gameOverTimer < 0) {
        game.level++;
        navigate('game-play')
      }
      else if(game.level == game.levels) {
        navigate('game-over');
      }
    }
    else {
      navigate('game-over');
    }
  }

  return {
    start: startGameLoop,
    stop: stopGameLoop,
  }
})();