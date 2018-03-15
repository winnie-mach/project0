const players = 0;
const currentPlayer;
const turn; //what turn it is
const player1pnts = 0;
const player2pnts = 0;

const player1 = [];
const player2 = [];

const size = 3; //gameboard 3 x 3


const drawBoard = function() {
  let parent = $(.gameboard);
  let counter = 1;
  while (parent.hasChildNotes()) {
    parent.removeChild(parent.firstChild);
  };
  for (var i = 0; i < 3; i++) {
      let row = $(<tr>)

}


// function: creates a board where when I click on it it will show a x or o.

//function: reset board. Set currentPlayer = 0,
// const player1 = new Array(); resets array without clearing previous values.
//const player2 = new Array();

//function: const loadAnswer = loads up 8 possibilities of winning.

// const winner = [];
winner.push([1, 2, 3]);
winner.push([4, 5, 6]);
winner.push([7, 8, 9]);
winner.push([1, 4, 7]);
winner.push([2, 5, 8]);
winner.push([3, 6, 9]);
winner.push([1, 5, 9]);
winner.push([3, 5, 7]);

//function: const checkWinner =
let win = false;
let playerSelection = [];
if (currentPlayer === 0) {
  playerSelection = player1;
} else {
  playerSelection = player2;
}

if (playerSelection.length >= size) {
  for (var i = 0; i < winner.length; i++) {
    let sets = winner[i];
    let found = true;
    for (var j = 0; j < sets.length; j++) {
      found = false;
      for (var k = 0; k < playerSelection.length; k++) {
        if (sets(j) === playerSelection[k]) {
          found = true;
          break;
        }

      }
    }
    if (!found) {
      found = false;
      break;
    }
  }
  if (found) {
    win = true;
    break;
  }
  return win;
}
