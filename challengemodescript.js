const quizData = [
    {
        difficultyId: 1,
        question: "Which company produces the Mustang?",
        choices: ["Chevrolet", "Ford", "Toyota", "BMW"],
        correct: 1
    },
    {
        difficultyId: 2,
        question: "What country is Ferrari from?",
        choices: ["France", "Germany", "Italy", "Japan"],
        correct: 2
    },
    {
        difficultyId: 3,
        question: "Which fuel is commonly used in most cars?",
        choices: ["Diesel", "Electricity", "Gasoline", "Water"],
        correct: 2
    },
    {
        difficultyId: 2,
        question: "What does 'SUV' stand for?",
        choices: ["Speed Utility Vehicle", "Sport Utility Vehicle", "Super Urban Van", "Small Utility Vehicle"],
        correct: 1
    },
    {
        difficultyId: 1,
        question: "Which car brand uses a prancing horse as its logo?",
        choices: ["Lamborghini", "Porsche", "Maserati", "Ferrari"],
        correct: 3
    }
];

quizData.sort((a, b) => {
    if (a.difficultyId !== b.difficultyId) {
      return a.difficultyId - b.difficultyId;
    } else {
      return Math.random() - 0.5;
    }
});

score_mapping = { 1: 5, 2: 10, 3: 15, 4: 20 };

let currentQuestionIndex = 0;
let score = 0;
var sndwrong = new Audio("choicewrong.wav");
var sndcorrect = new Audio("choicecorrect.wav");

var timeLeft = 10;
var timer = setInterval(function(){
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    document.getElementById("diff").textContent = quizData[currentQuestionIndex].difficultyId;
    if (timeLeft <= 0) {
        endGame("timeout");
    }
}, 1000);

function endGame(reason) {
    clearInterval(timer);
    let quizContainer = document.getElementById("quiz-container");

    let message = "";
    if (reason === "timeout") {
        message = `<h2>Time's Up!</h2>`;
    } else if (score >= 5) {
        message = `<h2>Congratulations! You've won a *prize*!</h2>`;
    } else {
        message = `<h2>Game Over!</h2>`;
    }

    quizContainer.innerHTML = `
        <p>We would greatly appreciate it if you could take a moment to complete our survey and provide feedback on our game!</p>
        ${message}
        <p>Your final score is: ${score}</p>
        <button onclick="goToSurvey()">Take Survey</button>
        <button onclick="goToMainMenu()">Return to Main Menu</button>
    `;
}

function goToSurvey() {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSeWECsUimmH9gjThFiu3didm_GhxSB8ziNvmzWy5Ja-BN_-NA/viewform";
}

function goToMainMenu() {
    window.location.href = "index.html";
}

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        endGame("finished");
        return;
    }

    const q = quizData[currentQuestionIndex];
    document.getElementById("question").innerText = q.question;
    
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn, index) => {
        if (q.choices[index]) {
            timeLeft = 11;
            btn.innerText = q.choices[index];
            btn.style.display = "block";
        }
    });
    document.getElementById("score").innerText = `Score: ${score}`;
}

function selectAnswer(choiceIndex) {
    if (choiceIndex === quizData[currentQuestionIndex].correct) {
        score += score_mapping[quizData[currentQuestionIndex].difficultyId];
        sndcorrect.play();
    } else {
        sndwrong.play();
    }
    currentQuestionIndex++;
    loadQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
});
