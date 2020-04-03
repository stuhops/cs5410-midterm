game.mouse = (function() {
    'use strict';

    let that = {
            mouseDown : [],
            mouseUp : [],
            mouseMove : [],
            handlersDown : [],
            handlersUp : [],
            handlersMove : []
        };

    function mouseDown(e) {
        // console.log('mousedown - x: ' + e.clientX + ', y: ' + e.clientY);
        that.mouseDown.push(e);
    }

    function mouseUp(e) {
        // console.log('mouseup -   x: ' + e.clientX + ', y: ' + e.clientY);
        that.mouseUp.push(e);
    }

    function mouseMove(e) {
        // console.log('mousemove - x: ' + e.clientX + ', y: ' + e.clientY);
        that.mouseMove.push(e);
    }

    that.update = function(elapsedTime) {
        //
        // Process the mouse events for each of the different kinds of handlers
        for (let event = 0; event < that.mouseDown.length; event++) {
            for (let handler = 0; handler < that.handlersDown.length; handler++) {
                that.handlersDown[handler](that.mouseDown[event], elapsedTime);
            }
        }

        for (let event = 0; event < that.mouseUp.length; event++) {
            for (let handler = 0; handler < that.handlersUp.length; handler++) {
                that.handlersUp[handler](that.mouseUp[event], elapsedTime);
            }
        }

        for (let event = 0; event < that.mouseMove.length; event++) {
            for (let handler = 0; handler < that.handlersMove.length; handler++) {
                that.handlersMove[handler](that.mouseMove[event], elapsedTime);
            }
        }

        //
        // Now that we have processed all the inputs, reset everything back to the empty state
        that.mouseDown.length = 0;
        that.mouseUp.length = 0;
        that.mouseMove.length = 0;
    };

    that.register = function(type, handler) {
        if (type === 'mousedown') {
            that.handlersDown.push(handler);
        }
        else if (type === 'mouseup') {
            that.handlersUp.push(handler);
        }
        else if (type === 'mousemove') {
            that.handlersMove.push(handler);
        }
    };

    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);
    canvas.addEventListener('mousemove', mouseMove);

    return that;
})();

game.mouse.register('mousedown', function(e, elapsedTime) {
    game.mouseCapture = true;
    console.log('mousedown');
});

game.mouse.register('mouseup', function(e, elapsedTime) {
    game.mouseCapture = false;
    let cell = {
        x: parseInt((e.clientX - canvas.offsetLeft) / (game.canvasDivWidth / game.gridWidth)),
        y: parseInt((e.clientY - canvas.offsetTop) / (game.canvasDivHeight / game.gridHeight))
    };

    if(
        game.gameLoopRunning && (
            ((game.emptyPos.x === cell.x - 1 || game.emptyPos.x === cell.x + 1) && (game.emptyPos.y === cell.y)) ||
            ((game.emptyPos.x === cell.x) && (game.emptyPos.y === cell.y - 1 || game.emptyPos.y === cell.y + 1))
        ) && !(
            !((game.emptyPos.x === cell.x - 1 || game.emptyPos.x === cell.x + 1) && (game.emptyPos.y === cell.y)) &&
            !((game.emptyPos.x === cell.x) && (game.emptyPos.y === cell.y - 1 || game.emptyPos.y === cell.y + 1))
        )
    ) {
        let tile = game.tiles[cell.y][cell.x];
        let blank = game.tiles[game.emptyPos.y][game.emptyPos.x];

        tile.setPos(game.emptyPos.x, game.emptyPos.y, true);
        blank.setPos(cell.x, cell.y);

        game.tiles[cell.y][cell.x] = blank;
        game.tiles[game.emptyPos.y][game.emptyPos.x] = tile;

        game.emptyPos.x = cell.x;
        game.emptyPos.y = cell.y;
        game.moves++;
        console.log(tile.isHome());
        console.log('switch');
    }
    console.log(cell);
});