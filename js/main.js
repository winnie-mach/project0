let playerOneisNext = true;
let marker;
let turn = 0;
let result;
let playerTurn = 'X'
let player1Score = 0;
let player2Score = 0;

const alreadyClicked = function (squareThatWasClicked) {
  if ($(squareThatWasClicked).text() !== "" ) {
    return true;
  }
};

const checkForDraw = function () {
  if(turn >= 9) {
    // and no winning condition is found <-- didn't do this because added checkDraw inside my checkForWinner function. Meaning that if it didn't find any winners then it would run the check for draw function.
    result = 'draw'
  }
};

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

      checkForDraw(); // this checkForDraw function will only run if niether player1 or player 2 has won. If either player wins, then the function is returned and therefore stopped.
};

const playTurn = function () {
  if (playerOneisNext === true) {
    marker = "x";
    playerOneisNext = false;
    logTurn(turn);
    turn = turn + 1;
  } else {
    marker = "o";
    playerOneisNext = true;
    logTurn(turn);
    turn = turn + 1;
    return turn;
  } // playerOneisNext = !playerOneisNext could write this instead of the two true + false statements
};

const logTurn = function(turn){
  if(turn % 2 !== 0) {
    playerTurn = 'X';
    $('#turnLog').text(`TURN: ${playerTurn}`);
  } else if(turn % 2 === 0) {
    playerTurn = 'O';
    $('#turnLog').text(`TURN: ${playerTurn}`);
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

const logScore = function(result) {
  if (result === 1) {
    player1Score = player1Score + 1;
    $('#scoreLogP1').html(`<p>PLAYER X SCORE: ${player1Score}</p>`);
    let styles1 = {
        margin: '0',
        padding: '-10px' //put css edits into an object, assigned variable.
    };
    $('#scoreLogP1').find('p').css(styles1); //then passed variable here because couldn't chain the html and css methods for some reason.
    return player1Score;
  } else if (result === 2) {
    player2Score = player2Score + 1;
    $('#scoreLogP2').html(`<p>PLAYER O SCORE:${player2Score}</p>`);
    let styles2 = {
        margin: '0',
        padding: '-10px'
    };
    $('#scoreLogP2').find('p').css(styles2);
    return player2Score;
  }
};

const disableGame = function () {
  if (result !== undefined) {
    $('.square').unbind('click'); //make squares unclickable
    $('#gameboard > div').removeClass('square').addClass('NoHover'); //when addressing a class in the remove/add class methods, do not add . in front of class name. Also, #gameboard > div is a DIRECT child selector, meaning it will only select the divs are that direct children of #gameboard and not the chidren of those divs (i.e. grandchildren of #gameboard).
    $('.playAgain').addClass('animated infinite flash'); //playAgain button flashes
  }
};

const resetGame = function () {
  $('.playAgain').on('click', function() {
    //location.reload(true); //reloads the page.
    playerOneisNext = true;
    marker = "";
    turn = 0;
    result;
    playerTurn = 'X'
    player1Score = 0;
    player2Score = 0;
    $('.square').text(marker);
    $('.player1Win').hide();
    $('.player2Win').hide();
    $('.noOneWin').hide();
    $('.square').bind('click');
    $('#gameboard > div').removeClass('NoHover').addClass('square');
    $('.playAgain').removeClass('animated infinite flash');
    logTurn(1);
// At the point game won't work unless I refresh the page. 
  })
};

$(document).ready(function() {
  logTurn(1);
  $('.square').on('click', function () {
    if (alreadyClicked(this) === true) {
      const $marker = $(this).find('div'); //adding the div inside 'this' (the .square user clicks on) into a variable. Because if not, 'this' will not work inside the setTimeout function below due to scope issues.
      $marker.addClass('animated shake');
      setTimeout(function () {
      $marker.removeClass('animated shake')
      }, 1200); //removing the animation class 1.2 secs after it gets added so that it can be readded and so the animation will go off again. Otherwise if it already has the animation class in it, readding it won't do anything.
    } else {
      playTurn();
      $(this).html(`<div>${marker}</div>`); //to make animation happen on the text inside of the .square, wrapped the text inside .square (the variable marker) in it's own div. Then add the animation class to that div.
      checkForWinner();
      winnerAlert();
      logScore(result);
      disableGame();
      resetGame();
      }

    });

});







// TODO:
//Draw: If all boxes are assigned a value and none of the winning conditions are met, result = draw. DONE!!
//Stop players from reclicking square: if square already has a value, make it unclickable/alert. DONE!!!
//If game already won, make all squares unclickable // DONE!!
//Display turns: which player is playing // DONE!!
//Scoring


//Test Cases:
//What if user clicks button again after it has previously been clicked by themselves or other player? // Added anim, stops user from clicking again.
//If user wins on the 9th move? The logic would mark it as a draw instead of a win. Fixed. Only checked for draw if there was no win recorded.
//What if user continues to click on empty squares after the game has been won? The squares will continue to be filled with symbols. And if the other player (the one who didn't win) managed to get 3 symbols in a row, then a win will show up twice.
