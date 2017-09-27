const buttons = document.querySelectorAll('.time');
const workTime = document.querySelector('#work-time');
const breakTime = document.querySelector('#break-time');
const alter = document.querySelectorAll('.alter');
const timeLeft = document.querySelector('.countdown');
const controls = {
  'plus-work': workTime,
  'minus-work': workTime,
  'plus-break': breakTime,
  'minus-break': breakTime,
};
let countdown;

function displayTimeLeft(seconds) {
  const min = (seconds - (seconds % 60)) / 60;
  const sec = (seconds % 60);
  const display = `${min}:${sec >= 10 ? sec : `0${sec}`}`;
  timeLeft.textContent = display;
  document.title = display;
}

function makeTimer(duration) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + (duration * 1000);
  displayTimeLeft(duration);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft <= 0) {
      displayTimeLeft(0);
      clearInterval(countdown);
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function startTimer() {
  const time = this.textContent * 60;
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
