function randomNumber (maxNumber) {
  /* This function takes a maximum number and returns a random number between 0 and max number */
  /* Firstly get a random number between 0 and 0.9999999 */
  let returnNumber = Math.random();
  /* Then multiply by max number to get a number between 0 and almost max number */
  returnNumber = returnNumber * maxNumber;
  /* Now get the largest integer less than or equal to the return number. i.e.Strip off the decimal places */
  returnNumber = Math.floor(returnNumber);
  return returnNumber;
}

function computerPlay () {
  /* This function will return either rock, paper or scissors randomly */
  /* First get a random number between 0 - 2 */
  let computerNumber = randomNumber (3);
  /* Now return a value of rock, paper or scissors depending on the random number */
  if (computerNumber === 0) {
    return "rock";
  }
  else if (computerNumber === 1) {
    return "paper";
  }
  else {
    return "scissors";
  }
}

function playRound(playerSelection, computerSelection) {
  /* This function plays 1 round of rock,paper,scissors and return a string to say who the winner is */
  playerSelection = playerSelection.toLowerCase ();
  computerSelection = computerSelection.toLowerCase ();
  /* First check to see if they are the same */
  if (playerSelection === computerSelection) {
    return "draw";
  }
  /* Now check to see if player chose rock and compare to computer selection */
  if (playerSelection === "rock") {
    if (computerSelection === "scissors") {
      /* Computer chose scissors so player wins */
      return "win";
    }
    else {
      /* Computer must have chosen paper so computer wins */
      return "lose";
    }
  }
  /* Now check to see if player chose scissors and compare to computer selection */
  if (playerSelection === "scissors") {
    if (computerSelection === "paper") {
      /* Computer chose paper so player wins */
      return "win";
    }
    else {
      /* Computer must have chosen rock so computer wins */
      return "lose";
    }
  }
  /* Now check to see if player chose paper and compare to computer selection */
  if (playerSelection === "paper") {
    if (computerSelection === "rock") {
      /* Computer chose rock so player wins */
      return "win";
    }
    else {
      /* Computer must have chosen scissors so computer wins */
      return "lose";
    }
  }
  /* If the user didn't enter rock,paper or scissors, then create an error to say they must enter one of them */
  return "error";
  
}

var playerChoice = "";
var computerChoice = "";
var wins = 0;
var losses = 0;
var inProgress = false;
function buttonSelect(event) {
  
  //If the click event is already being processed then exit.
  if (inProgress) return;
  //Set the "inProgress" flag to say click event is in progress.
  inProgress = true;
  
  //Check which button the player chose by looking at the alt tag.
  playerChoice = this.alt;
  //Get computer to make a choice by calling the "computerPlay" function.
  computerChoice = computerPlay();
  
  //Select which of the buttons match the computers choice by looking for the class "computerChoice" amongst the 3 computer buttons.
  var computerButton = document.querySelector('.computer > .' + computerChoice);
  //Find the "announceResults" and the "resultsBox" classes in the html. These are changed in the below "if" statement depending on the result.
  var announceResults = document.querySelector('.announceResults');
  var resultsBox = document.querySelector('.resultsBox');
  
  //Compare the 2 choices to see who won.
  var roundResult = playRound (playerChoice, computerChoice);
  if (roundResult == "draw") {
    //Adding the "clicked" class so the button is highlighted. 
    this.classList.add ('clicked');
    //Add the class "clicked" to the button that the computer selected which will turn it yellow.
    computerButton.classList.add ('clicked');
    //Set the text of "announceResults" to Draw and the "resultsBox" to blue.
    announceResults.textContent = "Draw";
    resultsBox.classList.add ('colorBlue');
  }
  else if (roundResult == "win") {
    //Add the class "winner" to the players choice to turn button green and the class "loser" to the computers choice to turn the button red.
    this.classList.add ('winner');
    computerButton.classList.add ('loser');
    //Create variable "playerScore". The querySelector finds where "playerScore" goes in the html by looking for the class 'playerScore'
    var playerScore = document.querySelector('.playerScore');
    //1 is added to wins
    wins++;
    //Set playerScore to whatever the value of wins is
    playerScore.textContent = wins;
    //Set the text of "announceResults" to Player Wins and the "resultsBox" to blue.
    announceResults.textContent = "Player Wins";
    resultsBox.classList.add ('colorBlue');
  }
  else {
    //Add the class "loser" to the players choice to turn button red and the class "winner" to the computers choice to turn the button green.
    this.classList.add ('loser');
    computerButton.classList.add ('winner');
    //Create variable "computerScore". The querySelector finds where "computerScore" goes in the html by looking for the class 'computerScore'
    var computerScore = document.querySelector('.computerScore');
    //1 is added to losses
    losses++;
    //Set computerScore to whatever the value of losses is
    computerScore.textContent = losses;
    //Set the text of "announceResults" to Computer Wins and the "resultsBox" to blue.
    announceResults.textContent = "Computer Wins";
    resultsBox.classList.add ('colorBlue');
  }
  
  //Set "playerScorebox" and "computerScorebox" variables to the classes within html
  var playerScorebox = document.querySelector('.player > .scorebox');
  var computerScorebox = document.querySelector('.computer > .scorebox');
  if (wins > losses) {
    //Player is winning set the "playerScorebox" to green and the "computerScorebox" to red.
    playerScorebox.style.borderColor="green";
    computerScorebox.style.borderColor="red";
  }
  else if (losses > wins) {
    //Computer is winning set the "playerScorebox" to red and the "computerScorebox" to green.
    playerScorebox.style.borderColor="red";
    computerScorebox.style.borderColor="green";
  }
  else {
    //If its a draw change them to yellow
    playerScorebox.style.borderColor="#ffc600";
    computerScorebox.style.borderColor="#ffc600";
  }
}

var buttons = document.querySelectorAll('.player > .button');
//The forEach function loops through the list of "player button" elements in html.
buttons.forEach(function(button) {
  //For each "button" element we add a 'click' listener which calls the buttonSelect function.
  button.addEventListener('click', buttonSelect);
});

//This function is activated at the end of a round to remove the colours from the buttons and check whether game is finished.
function removeTransition() {
  //Set the variable "resultsBox" equal to the class "resultsBox" in the html.
  var resultsBox = document.querySelector('.resultsBox');
  //Check to see if the results box is black. If so, we exit the function as we don't need to tidy up.
  if (resultsBox.style.borderColor == "black") return;
  //Otherwise we need to find all the buttons.
  var buttons = document.querySelectorAll('.button');
  //The forEach function loops through the list of "button" elements in html.
  buttons.forEach(function(button) {
    //For each "button" element we remove the 'clicked', 'winner', and 'loser' classes which resets them to their original state.
    button.classList.remove('clicked');
    button.classList.remove('winner');
    button.classList.remove('loser');
  });
  
  
  //Set variable "announceResults" to the "announceResults" class in the html.
  var announceResults = document.querySelector('.announceResults');
  //Remove its colour.
  resultsBox.classList.remove ('colorBlue');
  //Remove the "announceResults" text but leave the box the same size by inserting a break(\r\n).
  announceResults.innerText = "\r\n";
  
  //Check to see if either side has won.
  if (wins == 5 || losses == 5) {
    if (wins == 5) {
      announceResults.textContent = "Player Wins Game";
    }
    else {
      announceResults.textContent = "Computer Wins Game";
    }
  }
  else {
    //Reset the inProgress flag so the click events work again.
    inProgress = false;
  }
}

//Reset everything back to how it started when the reset button is clicked.
function resetGame() {
  //Reset wins and losses counters.
  wins = 0;
  losses = 0;
  //Set the score boxes back to black on the html.
  var playerScorebox = document.querySelector('.player > .scorebox');
  var computerScorebox = document.querySelector('.computer > .scorebox');
  playerScorebox.style.borderColor="black";
  computerScorebox.style.borderColor="black";
  //Set the scores back to 0 on the html.
  var playerScore = document.querySelector('.playerScore');
  var computerScore = document.querySelector('.computerScore');
  playerScore.textContent = 0;
  computerScore.textContent = 0;
  //Clear the "announceResults" box.
  var announceResults = document.querySelector('.announceResults');
  announceResults.innerText = "\r\n";
  //Clear the inProgress flag.
  inProgress = false;
}

//Look for the end of the transition on the results box which is set to blue at the end of each round. This is to reset all the buttons.
var resultsBox = document.querySelector('.resultsBox');
resultsBox.addEventListener('transitionend', removeTransition);



//==================================================================================
//Currently not being used.
//==================================================================================
function game () {
  /* Function to play the game over 5 rounds */
  let roundResult;
  let round = 0;
  let wins = 0;
  let losses = 0;
  let draws = 0;
  /* Create a while loop that plays 5 rounds */
  while (round < 5) {
    /* Ask the user to enter a choice */
    let userSelection = prompt ("Enter rock, paper or scissors");
    /* Now call computerPlay to get the computers selection */
    let computerSelection = computerPlay ();
    /* Call the function playRound that compares what the user entered to the computers choice and returns error, draw, win or lose */
    roundResult = playRound (userSelection, computerSelection);
    /* Check what result of the round was */
    if (roundResult === "error") {
      /* User didn't select rock paper or scissors so thats an error, play the round again */
      alert ("please enter rock, paper or scissors");
    }
    /* Otherwise depending on the result, increment the appropriate counter and the round count and show a message */
    else if (roundResult === "draw") {
      draws++;
      round++;
      alert ("The round was a draw. The score is player: " + wins + " computer: " + losses + " draws: " + draws);
    }
    else if (roundResult === "win") {
      wins++;
      round++;
      alert ("You win. The score is player: " + wins + " computer: " + losses + " draws: " + draws);
    }
    else if (roundResult === "lose") {
      losses++;
      round++;
      alert ("You lose. The score is player: " + wins + " computer: " + losses + " draws: " + draws);
    }

  }
}