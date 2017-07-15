function startGame() {
  document.humanPlayerIsWinner = null;
  document.computerPlayerIsWinner = null;
}

//This is where the story begins... The player gets to chose if she or he wants to be  X or O..
//The "player" function and the "playero" function make the this possible.
// NOTE: At the bottom of the Javascript file is the jquery that makes the magic happen.

function player(id) {
  document.turn = "X";
  document.AI = "O";
  getMsg(document.turn + " get to start");
}

function playero(id) {
  document.turn = "O";
  document.AI = "X";
  getMsg(document.turn + " get to start");
}

function getMsg(msg) {
  document.getElementById("message").innerText = msg;
}

//Check winner is a function that gets activated as soon the game begins. The "move" argument is actually "document.turn". The checkBox function literally checks to see if the sqaures are true. In simple terms the checkBox function checks to see if there is a winner, better known as 3 squares in a row.
function checkWinner(move) {
  var result = false;
  if (
    checkBox(1, 2, 3, move) ||
    checkBox(4, 5, 6, move) ||
    checkBox(7, 8, 9, move) ||
    checkBox(1, 5, 9, move) ||
    checkBox(3, 5, 7, move) ||
    checkBox(1, 4, 7, move) ||
    checkBox(2, 5, 8, move) ||
    checkBox(3, 6, 9, move)
  ) {
    result = true;
  }
  return result;
}

function checkBox(a, b, c, move) {
  var result = false;
  if (getBox(a) === move && getBox(b) === move && getBox(c) === move) {
    result = true;
  }
  return result;
}

function checkWinner2(AI) {
  var result = false;
  if (
    checkBox2(1, 2, 3, AI) ||
    checkBox2(4, 5, 6, AI) ||
    checkBox2(7, 8, 9, AI) ||
    checkBox2(1, 5, 9, AI) ||
    checkBox2(3, 5, 7, AI) ||
    checkBox2(1, 4, 7, AI) ||
    checkBox2(2, 5, 8, AI) ||
    checkBox2(3, 6, 9, AI)
  ) {
    result = true;
  }
  return result;
}

function checkBox2(a, b, c, AI) {
  var result = false;
  if (getBox(a) === AI && getBox(b) === AI && getBox(c) === AI) {
    result = true;
  }
  return result;
}

//The getBox function is extracting the the html square.. Then it throws it up to the  the checkBox function. Then the checkBox function checks see if there is a winner. If there is a winner the function will become true. If checkBox is true then it will throw it up to the checkWinner function. If the checkWinner function returns true as a result in the switchTurn function which has a boolean "if" statement will return true. Therefore the switchTurn function will run the the getMsg function and the screen will display "Congrats X or O won".
function getBox(number) {
  return document.getElementById("s" + number).innerText;
}

//YO CODY THIS IS WHERE i NEED HELP  VVVV
function randomlySelectOpenSquare() {
  var check = new Array(9);
  var randomSelection = null;

  // TODO: Refactor so your square IDs begin with s0
  for (var i = 0; i <= 8; i++) {
    check[i] = document.getElementById('s' + (i+1))
  }

  /*Filter out board and create an array of just open squares
  0) create filtered array
  1) looop through the filtered array of squares, and check if a AI marking would result in a win
  2) if it does, great, mark that spot with AIs turn and the game will end
  3) if it doesn't, then choose randomly from available square
     OR find a square that would make the human the winner in the next turn and mark that spot to block a winning move
  */
  var availableSquares = check.filter(function(square, i) {
    return !square.innerText;
  })

  for (var x = 0; x < availableSquares.length; x++) {
    // temporarily marking available square with AI marking
    availableSquares[x].innerText = document.AI
    if (checkWinner2(document.AI)) {
      // computer wins!
      break;
    } else {
      availableSquares[x].innerText = ""
      next;
    }
  }

  // then loop again, check for a square that would make the human a winner in the next turn
  // if there is such a square, the AI marks it
  // if there are no squares that would result in an immediate human move, then select something at random

  var randNum = Math.floor(Math.random() * availableSquares.length)
  availableSquares[randNum].innerText = document.AI
}

function humanNextMove(sqaure) {
  if (document.humanPlayerIsWinner) {
    getMsg(document.turn + " already won");
  } else if (document.computerPlayerIsWinner) {
    getMsg(document.AI + " already won");
  } else if (sqaure.innerText == "") {
    // mark the human's choice with their marking
    sqaure.innerText = document.turn;

    randomlySelectOpenSquare();
    winnerSelector();
    winner2();
  } else {
    getMsg("pick another square");
  }
}

function winnerSelector() {
  if (checkWinner(document.turn)) {
    getMsg("congrats " + document.turn + " won");
    document.humanPlayerIsWinner = document.turn;
  }
}

function winner2() {
  if (checkWinner2(document.AI)) {
    getMsg("congrats " + document.AI + " won");
    document.computerPlayerIsWinner = document.AI;
  }
}

function clearBox(number) {
  document.getElementById("s" + number).innerText = " ";
}

function restart() {
  for (var i = 1; i <= 9; i++) {
    clearBox(i);
  }
  document.humanPlayerIsWinner = null;
}

$(document).ready(function() {

  function displayRestartGameBtn() {
    $('.newgame').css('display', 'block')
  }

  $(".newgame").click(function() {
    $(".board").show();
    $("#message").hide();
    restart();
  });

  $(".playerX").click(function() {
    displayRestartGameBtn()
    $(".board").hide();
    $("#message").show();
    document.turn = "X";
    document.AI = "O";
  });

  $(".playerO").click(function() {
    displayRestartGameBtn()
    $(".board").hide();
    $("#message").show();
    docuemnt.turn = "O";
    document.AI = "X";
  });

});
//At the end of the game i can make a pop up that says congrats document.turn won and then have  a reset game.
