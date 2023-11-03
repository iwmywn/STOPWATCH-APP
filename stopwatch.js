const timeElement = document.querySelector('.js-time');
let Interval;

displayTime();

function displayTime() {
  const timeObject = getValue();
  const i = timeObject.second;
  const j = timeObject.minute;
  const z = timeObject.hour;
  const lap = JSON.parse(localStorage.getItem('lap')) || 0;
  const displayLapHTML = localStorage.getItem('displayLap') || '';
  const displayLapElement = document.querySelector('.js-display-lap');

  if (lap > 0) {
    displayLapElement.classList.add('display-lap');
  }

  if (i < 10 && j < 10) {
    if (z > 0) {
      timeElement.innerHTML = `${z}:0${j}:0${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    } else {
      timeElement.innerHTML = `0${j}:0${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    }
  } else if (i < 10 && j >= 10) {
    if (z > 0) {
      timeElement.innerHTML = `${z}:${j}:0${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    } else {
      timeElement.innerHTML = `${j}:0${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    }
  } else if (i >= 10 && j < 10) {
    if (z > 0) {
      timeElement.innerHTML = `${z}:0${j}:${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    } else {
      timeElement.innerHTML = `0${j}:${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    }
  } else {
    if (z > 0) {
      timeElement.innerHTML = `${z}:${j}:${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    } else {
      timeElement.innerHTML = `${j}:${i}`;
      displayLapElement.innerHTML = displayLapHTML;
    }
  }
}

function getValue() {
  const second = JSON.parse(localStorage.getItem('time-second')) || 0;
  const minute = JSON.parse(localStorage.getItem('time-minute')) || 0;
  const hour = JSON.parse(localStorage.getItem('time-hour')) || 0;
  return { second, minute, hour };
}

function startCountUp() {
  const startStop = document.querySelector('.js-start-stop');
  const lapElement = document.querySelector('.js-reset-lap');
  const timeObject = getValue();
  // let { second, minute, hour } = timeObject;
  let i = timeObject.second;
  let j = timeObject.minute;
  let z = timeObject.hour;

  if (startStop.innerHTML === 'Start') {
    startStop.innerHTML = 'Stop';
    lapElement.innerHTML = 'Lap';
    startStop.classList.add('stop-bg');

    Interval = setInterval(() => {
      if (i < 9 && j < 10) {
        if (z > 0)
          timeElement.innerHTML = `${z}:0${j}:0${++i}`;
        else
          timeElement.innerHTML = `0${j}:0${++i}`;
      } else if (i < 9 && j >= 10) {
        if (z > 0)
          timeElement.innerHTML = `${z}:${j}:0${++i}`;
        else
          timeElement.innerHTML = `${j}:0${++i}`;
      } else if (i >= 9 && i < 59 && j < 10) {
        if (z > 0)
          timeElement.innerHTML = `${z}:0${j}:${++i}`;
        else
          timeElement.innerHTML = `0${j}:${++i}`;
      } else if (i >= 9 && i < 59 && j >= 10) {
        if (z > 0)
          timeElement.innerHTML = `${z}:${j}:${++i}`;
        else
          timeElement.innerHTML = `${j}:${++i}`;
      } else if (i === 59 && j < 9) {
        i = 0;
        if (z > 0)
          timeElement.innerHTML = `${z}:0${++j}:00`;
        else
          timeElement.innerHTML = `0${++j}:00`;
      } else if (i === 59 && j >= 9 && j < 59) {
        i = 0;
        if (z > 0)
          timeElement.innerHTML = `${z}:${++j}:00`;
        else
          timeElement.innerHTML = `${++j}:00`;
      } else {
        i = 0;
        j = 0;
        timeElement.innerHTML = `${++z}:00:00`;
      }
      saveToLocalStorage(i, j, z);
    }, 1000);
  } else {
    startStop.innerHTML = 'Start';
    lapElement.innerHTML = 'Reset';
    startStop.classList.remove('stop-bg');
    clearInterval(Interval);
  }
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

function resetLapTime() {
  const lapElement = document.querySelector('.js-reset-lap');
  const displayLapElement = document.querySelector('.js-display-lap');
  let displayLapHTML = localStorage.getItem('displayLap') || '';
  const timeObject = getValue();
  const i = timeObject.second;
  const j = timeObject.minute;
  const z = timeObject.hour;
  let lap = JSON.parse(localStorage.getItem('lap')) || 0;

  if (lapElement.innerHTML === 'Lap') {
    if (!displayLapElement.classList.contains('display-lap'))
      displayLapElement.classList.add('display-lap');
    if (i < 10 && j < 10) {
      if (z > 0)
        displayLapHTML += addRowLap(displayLapElement, ++lap, `${z}:0${j}:0${i}`);
      else
        displayLapHTML += addRowLap(displayLapElement, ++lap, `0${j}:0${i}`);
    } else if (i < 10 && j >= 10) {
      if (z > 0)
        displayLapHTML += addRowLap(displayLapElement, ++lap, `${z}:${j}:0${i}`);
      else
        displayLapHTML += addRowLap(displayLapElement, ++lap, `${j}:0${i}`);
    } else if (i >= 10 && j < 10) {
      if (z > 0)
        displayLapHTML += addRowLap(displayLapElement, ++lap, `${z}:0${j}:${i}`);
      else
        displayLapHTML += addRowLap(displayLapElement, ++lap, `0${j}:${i}`);
    } else {
      if (z > 0)
        displayLapHTML += addRowLap(displayLapElement, ++lap, `${z}:${j}:${i}`);
      else
        displayLapHTML += addRowLap(displayLapElement, ++lap, `${j}:${i}`);
    }
    displayLapElement.innerHTML = displayLapHTML;
    localStorage.setItem('displayLap', displayLapHTML);
    localStorage.setItem('lap', JSON.stringify(lap));
  } else {
    displayLapElement.classList.remove('display-lap');
    displayLapElement.innerHTML = '';
    timeElement.innerHTML = '00:00';
    localStorage.removeItem('time-second');
    localStorage.removeItem('time-minute');
    localStorage.removeItem('time-hour');
    localStorage.removeItem('displayLap');
    localStorage.removeItem('lap');
  }
}

function saveToLocalStorage(second, minute, hour) {
  localStorage.setItem('time-second', JSON.stringify(second));
  localStorage.setItem('time-minute', JSON.stringify(minute));
  localStorage.setItem('time-hour', JSON.stringify(hour));
}

document.querySelector('.js-start-stop')
  .addEventListener('click', () => {
    startCountUp();
  });

document.querySelector('.js-reset-lap')
  .addEventListener('click', () => {
    resetLapTime();
  });