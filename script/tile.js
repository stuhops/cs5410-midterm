game.createTile = function (imgSrc, x, y, width, height, deltaX, deltaY, xHome, yHome) {
  // ---------------------- CREATE TILE OBJECT ---------------------------
  let tile = {};
  if(!imgSrc) {
    tile.type = 'blank';
  }
  else {
    tile = loadImage(imgSrc);
    tile.type = 'image';
  }

  tile.pos = { x, y };
  if(xHome && yHome) { tile.home = { x: xHome, y: yHome, } }
  else { tile.home = { x, y } }
  tile.width = width;
  tile.height = height;
  tile.offset = { x: deltaX, y: deltaY }

  // ---------------------- MAIN FUNCTIONS -------------------------------
  function update(elapsedTime) {
    // if home update particles
    updateCenter();

  }

  function render() {
    // if home render particles
    if(tile.type !== 'blank') {
      renderImage(tile, game.context);
    }
  }

  // ---------------------- HELPER FUNCTIONS -----------------------------

  let isHome = () => tile.pos === tile.home;
  let isBlank = () => tile.type === 'blank';

  let getPos = () => tile.pos;
  let getHome = () => tile.home;

  let updateCenter = () => {
    tile.center = {
      x: tile.pos.x * tile.offset.x + tile.width / 2,
      y: tile.pos.y * tile.offset.y + tile.height / 2
    }
  };
  updateCenter();

  let setPos = (x, y) => tile.pos = { x, y };



  return {
    update,
    render,

    isHome,
    isBlank,

    getPos,
    getHome,

    setPos,
  }
};


game.getNewTiles = function(level) {
  let tiles = [];
  if(level === 1) {
    game.gridWidth = 4;
    game.gridHeight = 4;
    let width = game.gameWidth / game.gridWidth;
    let height = game.gameHeight / game.gridWidth;
    for(let i = 0; i < game.gridHeight; i++) {
      let row = [];
      for(let j = 0; j < game.gridWidth; j++) {
        if(i*4 + j !== game.gridWidth * game.gridHeight - 1) {
          row.push(game.createTile(`./assets/Tile128-${i*4 + j}.png`, j, i, width - 5, height - 5, width, height));
        }
        else {
          row.push(game.createTile(null, j, i, width - 5, height - 5, width, height));
          game.emptyPos = { x: i, y: j };
        }
      }
      tiles.push(row);
    }
  }
  else if(level === 2) {
    console.log('Level 2 is not ready to be played yet (tile.js)')
  }
  
  return tiles;
};

game.shuffleTiles = function(moves) {
  let move;
  for(let i = 0; i < moves; i++) {
    move = Number((Math.random() * game.gridWidth - 1).toFixed(0));
    if(move === 0){
      // left
      if(game.emptyPos.x - 1 >= 0) {
        let tile = game.tiles[game.emptyPos.y][game.emptyPos.x - 1];
        tile.setPos(game.emptyPos.x, game.emptyPos.y);
        game.tiles[game.emptyPos.y][game.emptyPos.x].setPos(game.emptyPos.x - 1, game.emptyPos.y);

        game.tiles[game.emptyPos.y][game.emptyPos.x - 1] = game.tiles[game.emptyPos.y][game.emptyPos.x];
        game.tiles[game.emptyPos.y][game.emptyPos.x] = tile;

        game.emptyPos.x = game.emptyPos.x - 1;
        console.log('switch left');
      }
    }
    else if(move === 1){
      // up 
      if(game.emptyPos.y - 1 >= 0) {
        let tile = game.tiles[game.emptyPos.y - 1][game.emptyPos.x];
        tile.setPos(game.emptyPos.x, game.emptyPos.y);
        game.tiles[game.emptyPos.y][game.emptyPos.x].setPos(game.emptyPos.x, game.emptyPos.y - 1);

        game.tiles[game.emptyPos.y - 1][game.emptyPos.x] = game.tiles[game.emptyPos.y][game.emptyPos.x];
        game.tiles[game.emptyPos.y][game.emptyPos.x] = tile;

        game.emptyPos.y = game.emptyPos.y - 1;
        console.log('switch up');
      }
    }
    else if(move === 2){
      // right
      if(game.emptyPos.x + 1 < game.gridWidth) {
        let tile = game.tiles[game.emptyPos.y][game.emptyPos.x + 1];
        tile.setPos(game.emptyPos.x, game.emptyPos.y);
        game.tiles[game.emptyPos.y][game.emptyPos.x].setPos(game.emptyPos.x + 1, game.emptyPos.y);

        game.tiles[game.emptyPos.y][game.emptyPos.x + 1] = game.tiles[game.emptyPos.y][game.emptyPos.x];
        game.tiles[game.emptyPos.y][game.emptyPos.x] = tile;

        game.emptyPos.x = game.emptyPos.x + 1;
        console.log('switch right');
      }
    }
    else if(move === 3){
      // down
      if(game.emptyPos.y + 1 < game.gridHeight) {
        let tile = game.tiles[game.emptyPos.y + 1][game.emptyPos.x];
        tile.setPos(game.emptyPos.x, game.emptyPos.y);
        game.tiles[game.emptyPos.y][game.emptyPos.x].setPos(game.emptyPos.x, game.emptyPos.y + 1);

        game.tiles[game.emptyPos.y + 1][game.emptyPos.x] = game.tiles[game.emptyPos.y][game.emptyPos.x];
        game.tiles[game.emptyPos.y][game.emptyPos.x] = tile;

        game.emptyPos.y = game.emptyPos.y + 1
        console.log('switch down');
      }
    }
  }
}

