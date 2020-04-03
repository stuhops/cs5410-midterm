let domStats = (function () {
  function initialize() {
    document.getElementById('time-left').innerHTML = game.baseTimer;
    document.getElementById('my-score').innerHTML = game.baseScore;
  }

  function update(elapsedTime) {
    updateTime(elapsedTime);  
    updateScore(elapsedTime);
    updateHighScore();
  }

  function updateTime(elapsedTime) {
    document.getElementById('time-left').innerHTML = (Number(document.getElementById('time-left').innerHTML) - (.001 * elapsedTime)).toFixed(2);
  }
  
  function updateScore(elapsedTime) {
    let currScore = Number(document.getElementById('my-score').innerHTML);
    console.log(currScore);
    currScore -= .5 * (elapsedTime * .001);
    if(currScore <= 0) {
      document.getElementById('my-score').innerHTML = 0;
    }
    else {
      document.getElementById('my-score').innerHTML = currScore.toFixed(2);
    }
  }

  function updateHighScore() {
    for(let i = 0; i < 2; i++) {
      document.getElementsByName('high-score')[i] = document.getElementById('high-score-1');
    }
  }

  return {
    initialize,
    update,
  }
})();


function manageHighScores (newScore) {
  if(newScore) {
    for(let i = 0; i < game.highScores.length; i++) {
      if(game.highScores[i] === 'Unclaimed' || newScore > game.highScores[i]) {
        game.highScores.splice(i, 0, newScore);
        game.highScores.pop();
        window.localStorage.setItem('midterm-high-scores', JSON.stringify(game.highScores));
        break;
      }
    }
  }
  for(let i = 0; i < game.highScores.length; i++) {
    for(let j = 0; j < document.getElementsByName(`high-score-${i+1}`).length; j++) {
      document.getElementsByName(`high-score-${i+1}`)[j].innerHTML = game.highScores[i];
    }
  }
}
