let playerOneisNext = true;
let marker;
let turn = 0;
let result;

const alreadyClicked = function () {
  if ($(this).text() === marker) {}
}
const checkForWinner = function () {
  if($('#square1').text() === 'x' && $('#square2').text() === 'x' &&    $('#square3').text() === 'x' ||
     $('#square4').text() === 'x' && $('#square5').text() === 'x' && $('#square6').text() === 'x' ||
     $('#square7').text() === 'x' && $('#square8').text() === 'x' && $('#square9').text() === 'x' ||
     $('#square1').text() === 'x' && $('#square4').text() === 'x' && $('#square7').text() === 'x' ||
     $('#square2').text() === 'x' && $('#square5').text() === 'x' && $('#square8').text() === 'x' ||
     $('#square3').text() === 'x' && $('#square6').text() === 'x' && $('#square9').text() === 'x' ||
     $('#square1').text() === 'x' && $('#square5').text() === 'x' && $('#square9').text() === 'x' ||
     $('#square3').text() === 'x' && $('#square5').text() === 'x' && $('#square7').text() === 'x') {
       result = 1;
       return result;
      }
  if($('#square1').text() === 'o' && $('#square2').text() === 'o' && $('#square3').text() === 'o' ||
     $('#square4').text() === 'o' && $('#square5').text() === 'o' && $('#square6').text() === 'o' ||
     $('#square7').text() === 'o' && $('#square8').text() === 'o' && $('#square9').text() === 'o' ||
     $('#square1').text() === 'o' && $('#square4').text() === 'o' && $('#square7').text() === 'o' ||
     $('#square2').text() === 'o' && $('#square5').text() === 'o' && $('#square8').text() === 'o' ||
     $('#square3').text() === 'o' && $('#square6').text() === 'o' && $('#square9').text() === 'o' ||
     $('#square1').text() === 'o' && $('#square5').text() === 'o' && $('#square9').text() === 'o' ||
     $('#square3').text() === 'o' && $('#square5').text() === 'o' && $('#square7').text() === 'o') {
       result = 2;
       return result;
      }
};

const playTurn = function () {
  if (playerOneisNext === true) {
    marker = "x";
    playerOneisNext = false;
    turn = turn + 1;
    console.log(turn);
  } else {
    marker = "o";
    playerOneisNext = true;
    turn = turn + 1;
    console.log(turn);
  } // playerOneisNext = !playerOneisNext could write this instead of the two true + false statements

};

const checkDraw = function () {
  if(turn >= 9) {
    // and no winning condition is found
    result = 'draw'
  }
};

const winnerAlert = function() {
  if(result === 1) {
    $('.player1Win').show();
  } else if(result === 2) {
    $('.player2Win').show();
  } else if(result === 'draw') {
    $('.noOneWin').show();
  }
};

const resetGame = function () {
  $('.playAgain').on('click', function() {
    location.reload(true); //reloads the page.
  })
};

$('.square').on('click', function () {
  playTurn();
  $(this).text(marker);
  checkForWinner();
  checkDraw();
  winnerAlert();
  resetGame();
});







// TODO:
//Draw: If all boxes are assigned a value and none of the winning conditions are met, result = draw.
//Reset button
//Stop players from reclicking square: if square already has a value, make it unclickable/alert.
//If game already won, make all squares unclickable
//Scoring.
