//small game where you guess a number with arrays as little hints

//- todo: endgame function
// todo: highscore saver with file
// todo: ???

const doms = {
  checkBtn: document.querySelector('.check'),
  againBtn: document.querySelector('.again'),
  message: document.querySelector('.message'),
  number: document.querySelector('.number'),
  score: document.querySelector('.score'),
  guess: document.querySelector('.guess'),
  highscore: document.querySelector('.highscore'),
};

const data = {
  number: 0,
  tries: 0,
  highscore: 0,
  score: 20,
  gameOnline: true,
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
  if (data.gameOnline) {
    let guess = doms.guess.value;
    console.log(guess);
    //checks for endgame condition
    if (guess == data.number || data.score == 1) {
      endGame();
    } else {
      //display message
      doms.message.innerHTML = messageCalc(guess);
      //scoring
      data.score -= 1;
      doms.score.innerHTML = data.score;
    }
  }
};

//returns random ele from arr
const randomArrEle = arr => {
  randomEle = Math.round(Math.random() * (arr.length - 1));
  return arr[randomEle];
};

//return message depending on guess wrongness
const messageCalc = guess => {
  const diff = Math.abs(data.number - guess);
  if (guess > 20 || guess < 1) {
    return 'Enter a valid Number! 🤦‍♂️';
  }
  if (diff < 4) {
    return randomArrEle(data.msg.littleStrings);
  } else if (diff < 8) {
    if (guess > data.number) {
      return randomArrEle(data.msg.mediumAboveStrings);
    } else {
      return randomArrEle(data.msg.mediumBelowStrings);
    }
  } else {
    return randomArrEle(data.msg.veryWrongStrings);
  }
};

//what happens when player hits the right number
const endGame = () => {
  data.gameOnline = false;
  doms.number.innerHTML = data.number;
  document.querySelector('body').style.backgroundColor = '#60b347';
  data.score > 1
    ? (doms.message.innerHTML = 'RIGHT GUESS 🐱‍🏍')
    : (doms.message.innerHTML = 'You lost the game!');
  reviewHighscore();
};

const reviewHighscore = () => {
  if (data.score > data.highscore) {
    data.highscore = data.score;
    doms.highscore.innerHTML = data.score;
  }
};

// ready for game start and reset
const init = () => {
  document.querySelector('body').style.backgroundColor = '#222';
  doms.guess.value = '';
  doms.number.innerHTML = '?';
  doms.score.innerHTML = '20';
  doms.message.innerHTML = 'Start guessing...';
  data.number = Math.ceil(Math.random() * 20);
  console.log(data.number);
  data.tries = 0;
  data.score = 20;
  data.gameOnline = true;
};

//event listeners
doms.checkBtn.addEventListener('click', checkNumber);
doms.againBtn.addEventListener('click', init);

//inits game
init();
