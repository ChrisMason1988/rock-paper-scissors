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
console.log (game ())