function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
  
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

stopBtn.disabled = true;

let intervalID = null;
let color = null;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  color = getRandomHexColor();
  body.style.backgroundColor = color;

  intervalID = setInterval(() => {
    color = getRandomHexColor();
    body.style.backgroundColor = color;
  }, 1000);
});
stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(intervalID);
});
