function startGame() {
  document.winner = null;
  docuemnt.winner2 = null;
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

  check[0] = document.getElementById("s1");
  check[1] = document.getElementById("s2");
  check[2] = document.getElementById("s3");
  check[3] = document.getElementById("s4");
  check[4] = document.getElementById("s5");
  check[5] = document.getElementById("s6");
  check[6] = document.getElementById("s7");
  check[7] = document.getElementById("s8");
  check[8] = document.getElementById("s9");

  if (check[0].innerText === document.turn) {
    //set timeout function
    check[4].innerText = document.AI;
  }
  if (check[8].innerText === document.turn) {
    check[6].innerText = document.AI;
  }
  if (check[2].innerText === document.turn) {
    check[1].innerText = document.AI;
  }
  if (check[7].innerText === document.turn) {
    check[3].innerText = document.AI;
  }
  if (check[5].innerText === document.turn) {
    check[8].innerText = document.AI;
  }

  //var filteredCheck = check.filter(x => x.innerText === "");
  // var randomNum = Math.floor(Math.random() * filteredCheck.length)
  // filteredCheck[randomNum].innerText = document.AI;
}

function nextMove(sqaure) {
  //ßconsole.log( sqaure );
  if (document.winner != null) {
    getMsg(document.turn + " already won");
  } else if (document.winner2 != null) {
    getMsg(document.AI + " already won");
  } else if (sqaure.innerText == "") {
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
    document.winner = document.turn;
  }
}

function winner2() {
  if (checkWinner2(document.AI)) {
    getMsg("congrats " + document.AI + " won");
    document.winner2 = document.AI;
  }
}

function clearBox(number) {
  document.getElementById("s" + number).innerText = " ";
}

function restart() {
  for (var i = 1; i <= 9; i++) {
    clearBox(i);
  }
  document.winner = null;
}

$(document).ready(function() {
  $(".newgame").click(function() {
    $(".board").show();
    $("#message").hide();
    restart();
  });

  $(".playerX").click(function() {
    $(".board").hide();
    $("#message").show();
    document.turn = "X";
    document.AI = "O";
  });

  $(".playerO").click(function() {
    $(".board").hide();
    $("#message").show();
    docuemnt.turn = "O";
    document.AI = "X";
  });
});
//At the end of the game i can make a pop up that says congrats document.turn won and then have  a reset game.
