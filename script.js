const doms = {
  checkBtn: document.querySelector('.check'),
  againBtn: document.querySelector('.again'),
  message: document.querySelector('.message'),
  number: document.querySelector('.number'),
  score: document.querySelector('.score'),
  guess: document.querySelector('.guess'),
};

const data = {
  number: 0,
  tries: 0,
  highscore: 0,
  score: 20,
  msg: {
    littleStrings: [],
    mediumAboveStrings: [],
    mediumBelowStrings: [],
    veryWrongStrings: [],
  },
};

//lots of strings
data.msg.littleStrings = [
  'Close but no cigar...',
  'Almost there!',
  'Nearly on the spot!',
];
data.msg.mediumAboveStrings = [
  'Maybe look up',
  'Shoot the sky',
  'Dont undersell yourself',
];
data.msg.mediumBelowStrings = [
  'Look deeper...',
  'You have to fall to get up again',
  'Come down from your high horse!',
];
data.msg.veryWrongStrings = [
  'You Mad Man!',
  'How can one person be so wrong?',
  'There is always money in the banana stand',
];

// upon click
// checks number and gives message to the
const checkNumber = () => {
  let guess = doms.guess.value;
  console.log(guess);
  //checks for endgame condition
  if (guess === data.number) endGame();
  //display message
  doms.message.innerHTML = messageCalc(guess);
};

//return message depending on guess wrongness
const messageCalc = guess => {
  const diff = Math.abs(data.number - guess);
  if (diff < 4) {
    return data.msg.littleStrings[0];
  } else if (diff < 8) {
    if (guess > data.number) {
      return data.msg.mediumAboveStrings[0];
    } else {
      return data.msg.mediumBelowStrings[0];
    }
  } else {
    return data.msg.veryWrongStrings[0];
  }
};

// ready for game start and reset
const init = () => {
  doms.guess.value = '';
  doms.number.innerHTML = '?';
  doms.score.innerHTML = '20';
  doms.message.innerHTML = 'Start guessing...';
  data.number = Math.ceil(Math.random() * 20);
  console.log(data.number);
  data.tries = 0;
  data.score = 0;
};

//event listeners
doms.checkBtn.addEventListener('click', checkNumber);
doms.againBtn.addEventListener('click', init);

//inits game
init();
