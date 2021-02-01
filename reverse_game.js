const { randomInt } = require("crypto");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

//defining global variables
let firstGuess;

//computer asks player
async function start() {
  console.log(
    "Let's play a game where I think of a number between 1 and 100 and you try to guess it."
  );
  let min = 1;
  let max = 100;

  // computer sets number
  let secretNumber = pickNum(min, max);
  // console.log("The number is: " + secretNumber); -->use this for testing

  //create a function that picks random number with a min and max
  function pickNum(min, newMax) {
    let range = +newMax - min + 1;
    let smartGuess = min + Math.floor(Math.random() * range);
    return smartGuess;
  }

  //adding in infinite loop because process.exit() at end will end when guessed correctly
  while (true) {
    firstGuess = await ask("What do you think the number is?\n");

    //computer will tell you if number is higher or lower
    if (firstGuess > secretNumber) {
      console.log("The number is lower. Guess again.");
    } else {
      if (firstGuess < secretNumber)
        console.log("The number is higher. Guess again.");
    }

    // if you guess right, program ends.
    if (firstGuess == secretNumber) {
      console.log("You did it! You win!");
      process.exit();
    }
  }
}
