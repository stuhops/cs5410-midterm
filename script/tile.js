game.createTile = function (imgSrc, x, y, width, height, xHome, yHome) {
  // ---------------------- CREATE TILE OBJECT ---------------------------
  let tile = loadImage(imgSrc);

  tile.pos = { x, y };
  if(xHome && yHome) { tile.home = { x: xHome, y: yHome, } }
  else { tile.home = { x, y } }
  tile.width = width;
  tile.height = height;

  // ---------------------- MAIN FUNCTIONS -------------------------------
  function update(elapsedTime) {
    // if home update particles
    updateCenter();

  }

  function render() {
    // if home render particles
    renderImage(tile, game.context);
  }

  // ---------------------- HELPER FUNCTIONS -----------------------------

  let isHome = () => tile.pos === tile.home;

  let getPos = () => tile.pos;
  let getHome = () => tile.home;

  let updateCenter = () => {
    tile.center = {
      x: tile.pos.x + tile.width / 2,
      y: tile.pos.y + tile.height / 2
    }
  };
  updateCenter();

  let setPos = (x, y) => tile.pos = { x, y };



  return {
    update,
    render,

    isHome,

    getPos,
    getHome,

    setPos,
  }
};


game.getNewTiles = function(level) {
  let tiles = [];
  if(level === 1) {
    let width = game.canvasWidth / 4;
    let height = game.canvasHeight / 4;
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 4; j++) {
        if(i*4 + j !== 15) {
          tiles.push(game.createTile(`./assets/Tile128-${i*4 + j}.png`, j * width, i * height, width - 5, height - 5));
        }
      }
    }
  }
  else if(level === 2) {
    console.log('Level 2 is not ready to be played yet (tile.js)')
  }
  
  return tiles;
};