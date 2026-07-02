// ---------------------
// GAME STATE
// ---------------------

let score = 0;
let progress = 0;

let goalProgress = 5;
let moveReward = 10;
let obstaclePenalty = 5;

let timeLeft = 30;
let timer;

// ---------------------
// DOM ELEMENTS
// ---------------------

const scoreDisplay = document.getElementById("score");
const messageDisplay = document.getElementById("message");
const player = document.getElementById("player-image");
const progressBar = document.getElementById("progress-bar");
const difficultySelect = document.getElementById("difficulty");
const timerDisplay = document.getElementById("timer");
const milestoneDisplay = document.getElementById("milestone-display");
const challengeArea = document.getElementById("challenge-area");

// ---------------------
// AUDIO
// ---------------------

const clickSound = document.getElementById("clickSound");
const successSound = document.getElementById("successSound");
const failSound = document.getElementById("failSound");
const winSound = document.getElementById("winSound");

// ---------------------
// MILESTONES
// ---------------------

const milestones = [
    {
        score: 20,
        message: "💧 First Steps! One family now has access to cleaner water."
    },
    {
        score: 50,
        message: "🚰 Halfway There! Keep helping communities."
    },
    {
        score: 80,
        message: "🌍 Amazing! Your impact is growing worldwide."
    },
    {
        score: 100,
        message: "❤️ Water Hero! You're changing lives."
    }
];

let reachedMilestones = [];

// ---------------------
// DIFFICULTY
// ---------------------

function setDifficulty() {

    const difficulty = difficultySelect.value;

    if (difficulty === "easy") {

        goalProgress = 3;
        moveReward = 15;
        obstaclePenalty = 3;
        timeLeft = 45;
    }

    else if (difficulty === "normal") {

        goalProgress = 5;
        moveReward = 10;
        obstaclePenalty = 5;
        timeLeft = 30;
    }

    else {

        goalProgress = 8;
        moveReward = 5;
        obstaclePenalty = 10;
        timeLeft = 20;
    }

    timerDisplay.textContent = timeLeft;
    updateProgressBar();
}

difficultySelect.addEventListener("change", () => {
    resetGame();
});

// ---------------------
// SCORE
// ---------------------

function updateScore() {
    scoreDisplay.textContent = score;
}

function updateProgressBar() {

    const width = (progress / goalProgress) * 100;

    progressBar.style.width = width + "%";
}

// ---------------------
// TIMER
// ---------------------

function startTimer() {

    clearInterval(timer);

    timer = setInterval(() => {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            messageDisplay.textContent =
                "⏰ Time's up! The community still needs clean water.";

            messageDisplay.style.color = "#F5402C";

            disableGameButtons();
        }

    }, 1000);
}

// ---------------------
// MILESTONES
// ---------------------

function checkMilestones() {

    milestones.forEach(milestone => {

        if (
            score >= milestone.score &&
            !reachedMilestones.includes(milestone.score)
        ) {

            reachedMilestones.push(milestone.score);

            milestoneDisplay.textContent =
                milestone.message;

            messageDisplay.textContent =
                milestone.message;

            messageDisplay.style.color = "#FF902A";
        }
    });
}

// ---------------------
// PLAYER ACTIONS
// ---------------------

function gainPoints(button) {

    clickSound.currentTime = 0;
    successSound.currentTime = 0;

    clickSound.play();
    successSound.play();

    score += moveReward;
    progress++;

    updateScore();
    updateProgressBar();

    player.style.transform = "translateY(-15px)";

    setTimeout(() => {
        player.style.transform = "translateY(0)";
    }, 250);

    messageDisplay.textContent =
        "✅ Clean water is getting closer!";

    messageDisplay.style.color = "#159A48";

    if (button) {
        button.remove();
    }

    checkMilestones();

    if (progress >= goalProgress) {
        winGame();
        return;
    }

    createChallenge();
}

function losePoints(button) {

    clickSound.currentTime = 0;
    failSound.currentTime = 0;

    clickSound.play();
    failSound.play();

    score -= obstaclePenalty;

    if (score < 0) {
        score = 0;
    }

    updateScore();

    player.style.transform = "rotate(-15deg)";

    setTimeout(() => {
        player.style.transform = "rotate(0deg)";
    }, 250);

    messageDisplay.textContent =
        "❌ Pollution slowed your journey.";

    messageDisplay.style.color = "#F5402C";

    if (button) {
        button.remove();
    }

    checkMilestones();

    createChallenge();
}

// ---------------------
// DYNAMIC CHALLENGES
// ---------------------

function createChallenge() {

    if (challengeArea.children.length > 4) {
        return;
    }

    const challenge = document.createElement("button");

    const randomNumber = Math.random();

    if (randomNumber > 0.5) {

        challenge.className = "path";
        challenge.textContent = "💧 Deliver Water";

        challenge.onclick = function () {
            gainPoints(challenge);
        };
    }

    else {

        challenge.className = "obstacle";
        challenge.textContent = "🗑️ Pollution Blockage";

        challenge.onclick = function () {
            losePoints(challenge);
        };
    }

    challengeArea.appendChild(challenge);
}

// ---------------------
// WIN GAME
// ---------------------

function reachGoal() {
    winGame();
}

function winGame() {

    clearInterval(timer);

    winSound.currentTime = 0;
    winSound.play();

    messageDisplay.textContent =
        "🎉 Congratulations! You brought clean water to a community!";

    messageDisplay.style.color = "#2E9DF7";

    milestoneDisplay.textContent =
        "🚰 Mission Complete! Clean water delivered.";

    disableGameButtons();
}

// ---------------------
// DISABLE BUTTONS
// ---------------------

function disableGameButtons() {

    document
        .querySelectorAll(".path, .obstacle, .goal")
        .forEach(button => {

            button.disabled = true;
        });

    challengeArea
        .querySelectorAll("button")
        .forEach(button => {

            button.disabled = true;
        });
}

// ---------------------
// RESET GAME
// ---------------------

function resetGame() {

    clearInterval(timer);

    score = 0;
    progress = 0;

    reachedMilestones = [];

    challengeArea.innerHTML = "";

    setDifficulty();

    updateScore();
    updateProgressBar();

    messageDisplay.textContent =
        "💧 New mission started. Help deliver clean water!";

    messageDisplay.style.color = "#2E9DF7";

    milestoneDisplay.textContent =
        "Reach 20 points for your first milestone!";

    document
        .querySelectorAll(".path, .obstacle, .goal")
        .forEach(button => {

            button.disabled = false;
        });

    player.style.transform = "none";

    createChallenge();
    createChallenge();
    createChallenge();

    startTimer();
}

// ---------------------
// GAME START
// ---------------------

setDifficulty();
updateScore();
updateProgressBar();

createChallenge();
createChallenge();
createChallenge();

startTimer();