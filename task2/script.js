let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let interval;
let isRunning = false;

const timer = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsDiv = document.getElementById('laps');

function startStopwatch() {
    if (!isRunning) {
        interval = setInterval(() => {
            milliseconds += 10;
            if (milliseconds === 1000) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            timer.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatMilliseconds(milliseconds)}`;
        }, 10);

        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timer.textContent = '00:00:00.000';
    lapsDiv.innerHTML = '';
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function addLap() {
    const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatMilliseconds(milliseconds)}`;
    const lapDiv = document.createElement('div');
    lapDiv.textContent = `Lap ${lapsDiv.children.length + 1}: ${lapTime}`;
    lapsDiv.appendChild(lapDiv);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function formatMilliseconds(ms) {
    return ms.toString().padStart(3, '0');
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', addLap);
