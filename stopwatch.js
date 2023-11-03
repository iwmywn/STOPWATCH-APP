const timerElement = document.querySelector('.js-timer');
let IntervalTimer;
let IntervalLap;

displayTimer();

function displayTimer() {
  const timerObject = getValue();
  const i = timerObject.second;
  const j = timerObject.minute;
  const z = timerObject.hour;
  const lap = JSON.parse(localStorage.getItem('lap')) || 0;
  const displayLapHTML = localStorage.getItem('displayLap') || '';
  const displayLapElement = document.querySelector('.js-display-lap');

  if (lap > 0) {
    displayLapElement.classList.add('display-lap');
  }

  if (i < 10 && j < 10) {
    if (z > 0) {
      timerElement.innerHTML = `${z}:0${j}:0${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    } else {
      timerElement.innerHTML = `0${j}:0${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    }
  } else if (i < 10 && j >= 10) {
    if (z > 0) {
      timerElement.innerHTML = `${z}:${j}:0${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    } else {
      timerElement.innerHTML = `${j}:0${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    }
  } else if (i >= 10 && j < 10) {
    if (z > 0) {
      timerElement.innerHTML = `${z}:0${j}:${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    } else {
      timerElement.innerHTML = `0${j}:${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    }
  } else {
    if (z > 0) {
      timerElement.innerHTML = `${z}:${j}:${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    } else {
      timerElement.innerHTML = `${j}:${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    }
  }
}

function getValue() {
  const second = JSON.parse(localStorage.getItem('timer-second')) || 0;
  const minute = JSON.parse(localStorage.getItem('timer-minute')) || 0;
  const hour = JSON.parse(localStorage.getItem('timer-hour')) || 0;
  return { second, minute, hour };
}

function addRowLap(displayLapElement, lap, value) {
  displayLapElement.innerHTML = `
    <div class="row-lap">
      <span>
        Lap ${lap}
      </span>
      <span>
        ${value}
      </span>
    </div>
  `;
  return displayLapElement.innerHTML;
}

function startCountUp() {
  const startStop = document.querySelector('.js-start-stop');
  const lapElement = document.querySelector('.js-reset-lap');
  const displayLapElement = document.querySelector('.js-display-lap');
  const timerObject = getValue();
  // let { second, minute, hour } = timerObject;
  let i = timerObject.second;
  let j = timerObject.minute;
  let z = timerObject.hour;

  if (startStop.innerHTML === 'Start') {
    startStop.innerHTML = 'Stop';
    lapElement.innerHTML = 'Lap';
    startStop.classList.add('stop-bg');

    IntervalTimer = setInterval(() => {
      const lap = JSON.parse(localStorage.getItem('lap')) || 1;

      if (!displayLapElement.classList.contains('display-lap'))
        displayLapElement.classList.add('display-lap');
      if (i < 9 && j < 10) {
        if (z > 0) {
          timerElement.innerHTML = `${z}:0${j}:0${++i}`;
          if (lap === 1)
            displayLapElement.innerHTML = addRowLap(displayLapElement, lap, `${z}:0${j}:0${i}`);
        }
        else {
          timerElement.innerHTML = `0${j}:0${++i}`;
          if (lap === 1)
            displayLapElement.innerHTML = addRowLap(displayLapElement, lap, `0${j}:0${i}`);
        }
      } else if (i < 9 && j >= 10) {
        if (z > 0) {
          timerElement.innerHTML = `${z}:${j}:0${++i}`;
          if (lap === 1)
            displayLapElement.innerHTML = addRowLap(displayLapElement, lap, `${z}:${j}:0${i}`);
        }
        else {
          timerElement.innerHTML = `${j}:0${++i}`;
          if (lap === 1)
            displayLapElement.innerHTML = addRowLap(displayLapElement, lap, `${j}:0${i}`);
        }
      } else if (i >= 9 && i < 59 && j < 10) {
        if (z > 0) {
          timerElement.innerHTML = `${z}:0${j}:${++i}`;
          if (lap === 1)
            displayLapElement.innerHTML = addRowLap(displayLapElement, lap, `${z}:0${j}:${i}`);
        }
        else {
          timerElement.innerHTML = `0${j}:${++i}`;
          if (lap === 1)
            displayLapElement.innerHTML = addRowLap(displayLapElement, lap, `0${j}:${i}`);
        }
      } else if (i >= 9 && i < 59 && j >= 10) {
        if (z > 0) {
          timerElement.innerHTML = `${z}:${j}:${++i}`;
          if (lap === 1)
            displayLapElement.innerHTML = addRowLap(displayLapElement, lap, `${z}:${j}:${i}`);
        }
        else {
          timerElement.innerHTML = `${j}:${++i}`;
          if (lap === 1)
            displayLapElement.innerHTML = addRowLap(displayLapElement, lap, `${j}:${i}`);
        }
      } else if (i === 59 && j < 9) {
        i = 0;
        if (z > 0) {
          timerElement.innerHTML = `${z}:0${++j}:00`;
          if (lap === 1)
            displayLapElement.innerHTML = addRowLap(displayLapElement, lap, `${z}:0${j}:00`);
        }
        else {
          timerElement.innerHTML = `0${++j}:00`;
          if (lap === 1)
            displayLapElement.innerHTML = addRowLap(displayLapElement, lap, `0${j}:00`);
        }
      } else if (i === 59 && j >= 9 && j < 59) {
        i = 0;
        if (z > 0) {
          timerElement.innerHTML = `${z}:${++j}:00`;
          if (lap === 1)
            displayLapElement.innerHTML = addRowLap(displayLapElement, lap, `${z}:${j}:00`);
        }
        else {
          timerElement.innerHTML = `${++j}:00`;
          if (lap === 1)
            displayLapElement.innerHTML = addRowLap(displayLapElement, lap, `${j}:00`);
        }
      } else {
        i = 0;
        j = 0;
        timerElement.innerHTML = `${++z}:00:00`;
        if (lap === 1)
          displayLapElement.innerHTML = addRowLap(displayLapElement, lap, `${z}:00:00`);
      }
      saveToLocalStorage(i, j, z);
      localStorage.setItem('displayLap', displayLapElement.innerHTML);
    }, 1000);
  } else {
    startStop.innerHTML = 'Start';
    lapElement.innerHTML = 'Reset';
    startStop.classList.remove('stop-bg');
    clearInterval(IntervalTimer);
    clearInterval(IntervalLap);
  }
}

function resetLapTimer() {
  const lapElement = document.querySelector('.js-reset-lap');
  const displayLapElement = document.querySelector('.js-display-lap');
  let displayLapHTML = localStorage.getItem('displayLap');
  let i = JSON.parse(localStorage.getItem('timer-second-lap')) || 0;
  let j = JSON.parse(localStorage.getItem('timer-minute-lap')) || 0;
  let z = JSON.parse(localStorage.getItem('timer-hour-lap')) || 0;
  let lap = JSON.parse(localStorage.getItem('lap')) || 1;

  displayLapElement.innerHTML = localStorage.getItem('displayLap');

  if (lapElement.innerHTML === 'Lap') {
    lap++;
    IntervalLap = setInterval(() => {
      if (i < 9 && j < 10)
        if (z > 0)
          displayLapHTML += addRowLap(displayLapElement, lap, `${z}:0${j}:0${++i}`);
        else 
          displayLapHTML += addRowLap(displayLapElement, lap, `0${j}:0${++i}`);
      else if (i >= 9 && i < 59 && j < 10)
        if (z > 0)
          displayLapHTML += addRowLap(displayLapElement, lap, `${z}:0${j}:${++i}`);
        else
          displayLapHTML += addRowLap(displayLapElement, lap, `0${j}:${++i}`);
      else if (i < 9 && j >= 10)
        if (z > 0)
          displayLapHTML += addRowLap(displayLapElement, lap, `${z}:${j}:0${++i}`);
        else
          displayLapHTML += addRowLap(displayLapElement, lap, `${j}:0${++i}`);
      else if (i >= 9 && i < 59 && j >= 10)
        if (z > 0)
          displayLapHTML += addRowLap(displayLapElement, lap, `${z}:${j}:${++i}`);
        else
          displayLapHTML += addRowLap(displayLapElement, lap, `${j}:${++i}`);
      else if (i === 59 && j < 9) {
        i = 0;
        if (z > 0)
          displayLapHTML += addRowLap(displayLapElement, lap, `${z}:0${++j}:00`);
        else
          displayLapHTML += addRowLap(displayLapElement, lap, `0${++j}:00`);
      } else if (i === 59 && j >= 9 && j < 59) {
        i = 0;
        if (z > 0)
          displayLapHTML += addRowLap(displayLapElement, lap, `${z}:${++j}:00`);
        else
          displayLapHTML += addRowLap(displayLapElement, lap, `${++j}:00`);
      } else {
        i = 0;
        j = 0;
        displayLapHTML += displayLapElement(displayLapElement, lap, `${++z}:00:00`);
      }
      saveToLocalStorageLap(i, j, z);
      displayLapElement.innerHTML = displayLapHTML;
      localStorage.setItem('displayLap', displayLapHTML);
      localStorage.setItem('lap', JSON.stringify(lap));
    }, 1000);
  } else {
    displayLapElement.classList.remove('display-lap');
    displayLapElement.innerHTML = '';
    timerElement.innerHTML = '00:00';
    localStorage.removeItem('timer-second');
    localStorage.removeItem('timer-minute');
    localStorage.removeItem('timer-hour');
    localStorage.removeItem('displayLap');
    localStorage.removeItem('lap');
  }
}

function saveToLocalStorage(second, minute, hour) {
  localStorage.setItem('timer-second', JSON.stringify(second));
  localStorage.setItem('timer-minute', JSON.stringify(minute));
  localStorage.setItem('timer-hour', JSON.stringify(hour));
}

function saveToLocalStorageLap(second, minute, hour) {
  localStorage.setItem('timer-second-lap', JSON.stringify(second));
  localStorage.setItem('timer-minute-lap', JSON.stringify(minute));
  localStorage.setItem('timer-hour-lap', JSON.stringify(hour));
}

document.querySelector('.js-start-stop')
  .addEventListener('click', () => {
    startCountUp();
  });

document.querySelector('.js-reset-lap')
  .addEventListener('click', () => {
    resetLapTimer();
  });