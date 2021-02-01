const { randomInt } = require("crypto");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
start();

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );

  // user sets number
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  // Now try and complete the program.
  process.exit();
}

//defining global variables
let firstGuess;

//computer asks player
async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );

  // user sets number
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  // console.log("You entered: " + secretNumber); -->use this for testing

  let min = 1;

  //having user set the range
  newMax = await ask("What is the maximum number in your range?\n");
  console.log("The maximum number is: " + +newMax);
  //computer repeats number back to player, asks if it is random number btwn 1 and 100
  //if answer is no, asks them to choose between 1 and 100. if yes, function below is activated and comp guesses
  //create a function that picks random number with a min and max
  function pickNum(min, newMax) {
    let range = +newMax - min + 1;
    let smartGuess = min + Math.floor(range / 2);
    return smartGuess;
  }

  //adding in infinite loop because process.exit() at end will end when guessed correctly
  while (true) {
    let guess = pickNum(min, newMax);
    firstGuess = await ask("Is your number: " + guess + "\n");

    if (firstGuess === "no" || firstGuess === "n" || firstGuess === " no") {
      let question = await ask("Higher or lower?\n");
      if (question === "higher" || question === "h") {
        //means number is higher than guess
        //changing the min to equal the number guessed
        //reassigning guess to equal the function with the new defined min
        min = guess;
        guess = pickNum(min, +newMax);
      }
      //changing the max to equal the number guessed
      //reassigning guess to equal the function with the new defined max
      if (question === "lower" || question === "l") {
        newMax = guess;
        guess = pickNum(min, +newMax);
      }

      //if someone is cheating based on max/min/range/guess
      if (secretNumber < min || secretNumber > newMax) {
        await ask("Ohhhh. You are cheating! Bye bye.");
        process.exit();
      }
      //if they guess correct and win, it ends program. Success!
    } else if (firstGuess === "yes" || firstGuess === "y") {
      console.log("You did it! You win!");
      process.exit();
    }
  }
}


//add in async function here to ask what game to play
//// copy in reverse game here. Figure this out and resubmit.
