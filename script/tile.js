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
  tile.move = { timer: 0 }
  if(xHome && yHome) { tile.home = { x: xHome, y: yHome, } }
  else { tile.home = { x, y } }
  tile.width = width;
  tile.height = height;
  tile.offset = { x: deltaX, y: deltaY }

  tile.celebration = {
    bool: false,
    timer: 0,
  };


  // ---------------------- MAIN FUNCTIONS -------------------------------
  function update(elapsedTime) {
    if(tile.move.timer > 0) {
      tile.move.timer -= elapsedTime;
      let distX = tile.move.x - tile.pos.x;
      let distY = tile.move.y - tile.pos.y;      tile.center = {
        x: tile.pos.x * tile.offset.x + tile.width / 2,
        y: tile.pos.y * tile.offset.y + tile.height / 2
      }

      tile.move.x = tile.pos.x - distX / 2;
      tile.move.y = tile.pos.y - distY / 2;
      updateCenter(tile.move.x, tile.move.y);
    }
    else {
      updateCenter();
    }
    if(tile.celebration.timer > 0) {
      tile.celebration.timer -= elapsedTime;
      tile.celebration.vis.update(elapsedTime)
    }

  }

  function render() {
    // if home render particles
    if(tile.type !== 'blank') {
      if(tile.celebration.timer > 0) {
        tile.celebration.vis.render();
      }
      renderImage(tile, game.context);
    }
  }

  // ---------------------- HELPER FUNCTIONS -----------------------------

  function startHomeCel() {
    tile.celebration.timer = 2000
    updateCenter();
    tile.celebration.vis = ParticleSystemCircular(game.graphics, {
      image: './assets/fire.png',
      center: tile.center,
      size: {mean: 25, stdev: 10},
      speed: { mean: 0, stdev: 0.2},
      lifetime: { mean: 2000, stdev: 500}
    });
  }

  let isHome = (display=true) => {
    if(tile.pos.x === tile.home.x && tile.pos.y === tile.home.y && display) {
      startHomeCel();
    }
    return tile.pos.x === tile.home.x && tile.pos.y === tile.home.y;
  }
  let isBlank = () => tile.type === 'blank';

  let getPos = () => tile.pos;
  let getHome = () => tile.home;

  let updateCenter = (x, y) => {
    if(x) {
      tile.center = {
        x: tile.move.x * tile.offset.x + tile.width / 2,
        y: tile.move.y * tile.offset.y + tile.height / 2
      }
    }
    else {
      tile.center = {
        x: tile.pos.x * tile.offset.x + tile.width / 2,
        y: tile.pos.y * tile.offset.y + tile.height / 2
      }
    }
  };
  updateCenter();

  let setPos = (x, y, animate=false) => {
    if(animate) {
      tile.move = {
        timer: 2000,
        x: tile.pos.x,
        y: tile.pos.y
      }
    }

    tile.pos = { x, y };
  }



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
    game.gridWidth = 8;
    game.gridHeight = 8;
    let width = game.gameWidth / game.gridWidth;
    let height = game.gameHeight / game.gridWidth;
    for(let i = 0; i < game.gridHeight; i++) {
      let row = [];
      for(let j = 0; j < game.gridWidth; j++) {
        if(i*game.gridWidth + j !== game.gridWidth * game.gridHeight - 1) {
          row.push(game.createTile(`./assets/Tile64-${i*game.gridWidth + j}.png`, j, i, width - 5, height - 5, width, height));
        }
        else {
          row.push(game.createTile(null, j, i, width - 5, height - 5, width, height));
          game.emptyPos = { x: i, y: j };
        }
      }
      tiles.push(row);
    }
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

game.isWin = function() {
  for(let i = 0; i < game.gridHeight; i++) {
    let row = [];
    for(let j = 0; j < game.gridWidth; j++) {
      if(j === game.emptyPos.x && i == game.emptyPos.y){ }
      else if(!game.tiles[j][i].isHome(false)) {
        return false;
      }
    }
  }
  return true;
}

