let playerOneisNext = true;
let marker;
let turn = 0;
let result;

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
    turn = turn + 1;
    console.log(turn);
  } else {
    marker = "o";
    playerOneisNext = true;
    turn = turn + 1;
    console.log(turn);
  } // playerOneisNext = !playerOneisNext could write this instead of the two true + false statements

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

const disableGame = function () {
  if (result !== undefined) {
    $('.square').unbind('click'); //make squares unclickable
    $('#gameboard > div').removeClass('square').addClass('NoHover'); //when addressing a class in the remove/add class methods, do not add . in front of class name. Also, #gameboard > div is a DIRECT child selector, meaning it will only select the divs are that direct children of #gameboard and not the chidren of those divs (i.e. grandchildren of #gameboard).
    $('.playAgain').addClass('animated infinite flash'); //playAgain button flashes
  }
};

const resetGame = function () {
  $('.playAgain').on('click', function() {
    location.reload(true); //reloads the page.
  })
};

$(document).ready(function() {
$('.square').on('click', function () {
  if (alreadyClicked(this) === true) {
    //console.log('Already been clicked');
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
  disableGame();
  resetGame();
}

});

});







// TODO:
//Draw: If all boxes are assigned a value and none of the winning conditions are met, result = draw. DONE!!
//Stop players from reclicking square: if square already has a value, make it unclickable/alert. DONE!!!
//If game already won, make all squares unclickable // DONE!!
//Display turns: which player is playing
//Scoring


//Test Cases:
//What if user clicks button again? // Added anim, stops user from clicking again.
//What if user continues to click on empty squares after the game has been won? -- need to fix. Nothing will happen but what if other play wins? Will show up twice.
