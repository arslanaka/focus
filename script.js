let timer;
let timeLeft;
let isPaused = false;
let isRunning = false;

const startButton = document.getElementById("startBtn");
const pauseButton = document.getElementById("pauseBtn");
const resetButton = document.getElementById("resetBtn");
const timerDisplay = document.getElementById("timerDisplay");
const quoteDisplay = document.getElementById("quoteDisplay");

const motivationalQuotes = [
    "Success is the sum of small efforts, repeated day in and day out.",
    "Don’t watch the clock; do what it does. Keep going.",
    "You are capable of more than you know.",
    "The future depends on what you do today.",
    "Believe you can and you're halfway there."
];

function startTimer() {
    const timeInput = document.getElementById("time").value;
    if (timeInput > 0 && !isRunning) {
        timeLeft = timeInput * 60; // Convert minutes to seconds
        timer = setInterval(updateTime, 1000);
        isRunning = true;
        startButton.style.display = "none";
        pauseButton.style.display = "inline";
        resetButton.style.display = "inline";
    }
}

function updateTime() {
    if (timeLeft > 0) {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        clearInterval(timer);
        isRunning = false;
        displayQuote();
    }
}

function pauseTimer() {
    clearInterval(timer);
    isPaused = true;
    startButton.style.display = "inline";
    pauseButton.style.display = "none";
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    timerDisplay.textContent = "00:00";
    startButton.style.display = "inline";
    pauseButton.style.display = "none";
    resetButton.style.display = "none";
}

function displayQuote() {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    document.getElementById("quote").textContent = randomQuote;
    quoteDisplay.style.display = "block";
}

// Clock View
function updateClock() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    document.getElementById("currentClock").textContent = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Toggle between Clock and Timer View
const clockViewBtn = document.getElementById('clockViewBtn');
const timerViewBtn = document.getElementById('timerViewBtn');
const clockView = document.getElementById('clockView');
const timerView = document.getElementById('timerView');

clockViewBtn.addEventListener('click', () => {
    clockView.style.display = 'block';
    timerView.style.display = 'none';
    clockViewBtn.classList.add('active');
    timerViewBtn.classList.remove('active');
});

timerViewBtn.addEventListener('click', () => {
    clockView.style.display = 'none';
    timerView.style.display = 'block';
    clockViewBtn.classList.remove('active');
    timerViewBtn.classList.add('active');
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('normal-mode')) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('normal-mode');
        document.querySelector('.container').classList.add('dark-mode');
        document.querySelector('.container').classList.remove('normal-mode');
        themeToggle.textContent = "🌙"; // Change button text to moon
    } else {
        document.body.classList.add('normal-mode');
        document.body.classList.remove('dark-mode');
        document.querySelector('.container').classList.add('normal-mode');
        document.querySelector('.container').classList.remove('dark-mode');
        themeToggle.textContent = "🌞"; // Change button text to sun
    }
});

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

// Start the clock immediately
setInterval(updateClock, 1000);
