const buttons = document.querySelectorAll('.time');
const workTime = document.querySelector('[name="work-time"]');
const breakTime = document.querySelector('[name="break-time"]');
const alter = document.querySelectorAll('.alter');
const timeLeft = document.querySelector('.countdown');
const pause = document.querySelector('[name="pause"]');
const info = document.querySelector('.info');

const controls = {
  'plus-work': workTime,
  'minus-work': workTime,
  'plus-break': breakTime,
  'minus-break': breakTime,
};
let countdown;
let isWork;
let isStarted = false; // flag to disable pause if timer not running
let now;
let then;
let secondsLeft = 25 * 60;
let paused = false;


function displayTimeLeft(seconds) {
  const min = (seconds - (seconds % 60)) / 60;
  const sec = (seconds % 60);
  const display = `${min}:${sec >= 10 ? sec : `0${sec}`}`;
  timeLeft.textContent = display;
  document.title = display;
}

function makeTimer(duration) {
  // setup variable delcarations
  paused = false;
  isStarted = true;
  if (isWork) {
    info.textContent = 'We are working hard!';
  } else {
    info.textContent = "Let's enjoy our break";
  }
  clearInterval(countdown);
  now = Date.now();
  then = now + (duration * 1000);
  displayTimeLeft(duration);
  // run the timer
  countdown = setInterval(() => {
    secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft <= 0) {
      displayTimeLeft(0);
      clearInterval(countdown);
      // automatically start break after timer ends
      if (isWork) {
        makeTimer(breakTime.textContent * 60);
        isWork = false;
      } else {
        // else the break finished and timer is over
        info.textContent = "Let's do another round!";
        isStarted = false;
      }
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function togglePause() {
  if (!isStarted) {
    return;
  }
  paused = !paused;
  if (paused === false) {
    // restart the timer
    this.textContent = 'Pause';
    makeTimer(secondsLeft);
  } else {
    // pause timer
    clearInterval(countdown);
    this.textContent = 'Resume';
    info.textContent = 'We are taking a pause!';
  }
  this.classList.toggle('paused');
}

function startTimer() {
  if (paused) {
    pause.classList.remove('paused');
    pause.textContent = 'Pause';
  }
  const time = this.textContent * 60;
  if (this === workTime) {
    isWork = true;
  } else {
    isWork = false;
  }
  makeTimer(time);
}

function changeTime() {
  const operator = this.name;
  const target = controls[operator];
  if (operator.match(/^minus/)) {
    if (+target.textContent > 1) {
      target.textContent = +target.textContent - 1;
    }
  } else {
    target.textContent = +target.textContent + 1;
  }
}

alter.forEach(a => a.addEventListener('click', changeTime));
buttons.forEach(button => button.addEventListener('click', startTimer));
pause.addEventListener('click', togglePause);
