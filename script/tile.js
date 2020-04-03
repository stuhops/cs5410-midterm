game.createTile = function (imgSrc, x, y, width, height, deltaX, deltaY, xHome, yHome) {
  // ---------------------- CREATE TILE OBJECT ---------------------------
  let tile = loadImage(imgSrc);

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
    renderImage(tile, game.context);
  }

  // ---------------------- HELPER FUNCTIONS -----------------------------

  let isHome = () => tile.pos === tile.home;

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

    getPos,
    getHome,

    setPos,
  }
};


game.getNewTiles = function(level) {
  let tiles = [];
  if(level === 1) {
    let width = game.gameWidth / 4;
    let height = game.gameHeight / 4;
    for(let i = 0; i < 4; i++) {
      let row = [];
      for(let j = 0; j < 4; j++) {
        if(i*4 + j !== 15) {
          row.push(game.createTile(`./assets/Tile128-${i*4 + j}.png`, j, i, width - 5, height - 5, width, height));
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
  for(let i = 0; i < moves; i++) {

  }
}