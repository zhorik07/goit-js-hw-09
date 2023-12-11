import { Notify } from 'notiflix/build/notiflix-notify-aio';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  spanDays: document.querySelector('span[data-days]'),
  spanHours: document.querySelector('span[data-hours]'),
  spanMinutes: document.querySelector('span[data-minutes]'),
  spanSeconds: document.querySelector('span[data-seconds]'),
};
refs.startBtn.disabled = true;
let time = null;
let setIntervalID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    const nowTime = new Date();
    if (!(Number(selectedDates[0]) - nowTime.getTime() < 0)) {
      refs.startBtn.disabled = false;
      clearTimer();
      clearInterval(setIntervalID);
    } else {
      refs.startBtn.disabled = true;
    }
  },
  onClose(selectedDates) {
    const nowTime = new Date();
    if (Number(selectedDates[0] - nowTime.getTime() > 0)) {
      Notify.success('Something will happen');
      time = selectedDates[0];
    } else {
      Notify.failure('Please choose a date in the future');
      clearTimer();
      clearInterval(setIntervalID);
      return;
    }
  },
};
flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', handlerStart);

function handlerStart() {
  refs.startBtn.disabled = true;
  clearInterval(setIntervalID);

  const nowTime = new Date();
  createTimer(nowTime);

  setIntervalID = setInterval(() => {
    const nowTime = new Date();
    if (time - nowTime < 0) {
      clearInterval(setIntervalID);
      return;
    }
    createTimer(nowTime);
  }, 1000);
}
function createTimer(nowTime) {
  const { days, hours, minutes, seconds } = convertMs(time - nowTime);
  refs.spanDays.textContent = addLeadingZero(String(days));
  refs.spanHours.textContent = addLeadingZero(String(hours));
  refs.spanMinutes.textContent = addLeadingZero(String(minutes));
  refs.spanSeconds.textContent = addLeadingZero(String(seconds));
}
function clearTimer() {
  refs.spanDays.textContent = '00';
  refs.spanHours.textContent = '00';
  refs.spanMinutes.textContent = '00';
  refs.spanSeconds.textContent = '00';
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.padStart(2, '0');
}