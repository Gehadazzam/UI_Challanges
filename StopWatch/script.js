const startTimer = document.getElementById("startBtn");
const stopTimer = document.getElementById("stopBtn");
const resetTimer = document.getElementById("resetBtn");
const pauseTimer = document.getElementById("pauseBtn");
const laps = document.getElementById("laps");
console.log(startTimer, stopTimer, resetTimer, pauseTimer, laps);

function timer() {
    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval = null;
    let isRunning = false;
    function formatTime(time) {
        const date = new Date(time);
        // const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");
        const seconds = String(date.getUTCSeconds()).padStart(2, "0");
        const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");
        return `${minutes}:${seconds}:${milliseconds}`;
        // return `${hours}:${minutes}:${seconds}`;
    }
    
    function updateDisplay() {
        document.getElementById("display").innerText = formatTime(elapsedTime);
    }
    
    function start() {
        if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        isRunning = true;
        }
    }
        function lap() {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement("li");
        const lapIndex =`lap ${laps.children.length + 1}`;
        lapItem.innerText = `${lapIndex}: ${lapTime}`;
        lapItem.classList.add("lapItem");
        laps.appendChild(lapItem);
    }
    function stop() {
        clearInterval(timerInterval);
        isRunning = false;
        lap();
        reset();
    }
    
    function reset() {
        clearInterval(timerInterval);
        elapsedTime = 0;
        updateDisplay();
        isRunning = false;
    }
    
    function pause() {
        clearInterval(timerInterval);
        isRunning = false;
    }
    startTimer.addEventListener("click", start);
    stopTimer.addEventListener("click", stop);
    resetTimer.addEventListener("click", reset);
    pauseTimer.addEventListener("click", pause);
}

timer();