let score = 0;
let progress = 0;

const scoreDisplay = document.getElementById("score");
const messageDisplay = document.getElementById("message");
const player = document.getElementById("player-image");

function updateScore() {
    scoreDisplay.textContent = score;
}

function gainPoints() {

    score += 10;
    progress++;

    updateScore();

    player.style.transform = "translateY(-10px)";

    setTimeout(() => {
        player.style.transform = "translateY(0)";
    }, 200);

    messageDisplay.textContent =
        "✅ Great job! You're getting closer to clean water.";
    messageDisplay.style.color = "#159A48";

    // Auto-win after 5 successful moves
    if (progress >= 5) {
        winGame();
    }
}

function losePoints() {

    score -= 5;

    if (score < 0) {
        score = 0;
    }

    updateScore();

    player.style.transform = "rotate(-15deg)";

    setTimeout(() => {
        player.style.transform = "rotate(0deg)";
    }, 200);

    messageDisplay.textContent =
        "❌ Pollution slowed you down!";
    messageDisplay.style.color = "#F5402C";
}

function reachGoal() {
    winGame();
}

function winGame() {

    messageDisplay.textContent =
        "🎉 Congratulations! You reached clean water!";
    messageDisplay.style.color = "#2E9DF7";

    document.querySelectorAll(".path, .obstacle, .goal")
        .forEach(button => {
            button.disabled = true;
        });
}

function resetGame() {

    score = 0;
    progress = 0;

    updateScore();

    messageDisplay.textContent =
        "💧 Game restarted. Good luck!";
    messageDisplay.style.color = "#2E9DF7";

    document.querySelectorAll(".path, .obstacle, .goal")
        .forEach(button => {
            button.disabled = false;
        });

    player.style.transform = "none";
}

updateScore();