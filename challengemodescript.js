let quizData = [];
function startGame() {
    quizData.sort((a, b) => a.difficultyId - b.difficultyId || Math.random() - 0.5);
    loadQuestion();
}
fetch("quizData.json")
    .then(response => response.json())
    .then(data => {
        console.log("✅ JSON Loaded Successfully:", data);
        quizData = data; 
        startGame();
    })
    .catch(error => console.error("❌ Error loading JSON:", error));


fetch("quizData.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    quizData = data;
    startGame(); // Call function to start the quiz
  })
  .catch(error => console.error("Error loading JSON:", error));


score_mapping = {
    1: 5,
    2: 10,
    3: 15,
    4: 20
}

let livesRemaining = 3;
let currentQuestionIndex = 0;
let score = 0;

let audioOn = true;
function audioOff() {
    audioOn = false;
}

sndwrong = new Audio("choicewrong.wav");
sndcorrect = new Audio("choicecorrect.wav");



let interval = 1

var timeLeft = 10;
var timer = setInterval(function(){
    timeLeft -= interval;
    document.getElementById("timer").textContent = timeLeft;
    if(timeLeft <= 0 && score < 5){
        clearInterval(timer);
        document.getElementById("quiz-container").innerHTML = `
        <p>Your final score is: ${score}</p>
        <p>We would greatly appreciate it if you could take a moment to complete our survey and provide feedback on our game!</p>
        <button onclick="goToSurvey()">Take Survey</button>
        <button onclick="goToMainMenu()">Return to Main Menu</button>
    `;
    }
    if(timeLeft <= 0 && score >= 5){
        clearInterval(timer);
        document.getElementById("quiz-container").innerHTML = `
        <p>Your final score is: ${score}</p>
        <p>We would greatly appreciate it if you could take a moment to complete our survey and provide feedback on our game!</p>
        <button onclick="goToSurvey()">Take Survey</button>
        <button onclick="goToMainMenu()">Return to Main Menu</button>
    `;
    }
}, 1000);

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length && score >= 5) {
        document.getElementById("quiz-container").innerHTML = `
        <p>Your final score is: ${score}</p>
        <p>We would greatly appreciate it if you could take a moment to complete our survey and provide feedback on our game!</p>
        <button onclick="goToSurvey()">Take Survey</button>
        <button onclick="goToMainMenu()">Return to Main Menu</button>
    `;
        return;
    }
    if (currentQuestionIndex >= quizData.length && score < 5) {
        document.getElementById("quiz-container").innerHTML = `
        <p>Your final score is: ${score}</p>
        <p>We would greatly appreciate it if you could take a moment to complete our survey and provide feedback on our game!</p>
        <button onclick="goToSurvey()">Take Survey</button>
        <button onclick="goToMainMenu()">Return to Main Menu</button>
    `;
        return;
    }

    const q = quizData[currentQuestionIndex];
    document.getElementById("question").innerText = q.question;
    document.getElementById("qAnswered").innerText = `Question: ${currentQuestionIndex + 1}`
    document.getElementById("lives").innerText = `Lives: ${livesRemaining}`
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
        if (audioOn){
            sndcorrect.play();
        }
    }
    else {
        if (audioOn){
            sndwrong.play();
        }
        livesRemaining --;
        if (livesRemaining <= 0){
            document.getElementById("quiz-container").innerHTML = `
        <p>Your final score is: ${score}</p>
        <p>We would greatly appreciate it if you could take a moment to complete our survey and provide feedback on our game!</p>
        <button onclick="goToSurvey()">Take Survey</button>
        <button onclick="goToMainMenu()">Return to Main Menu</button>
    `;
        }
    }
    currentQuestionIndex++;
    loadQuestion();
}

function goToSurvey() {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSeWECsUimmH9gjThFiu3didm_GhxSB8ziNvmzWy5Ja-BN_-NA/viewform";
}

function goToMainMenu() {
    window.location.href = "index.html";
}


document.addEventListener("DOMContentLoaded", () => {
    fetch("quizData.json")
        .then(response => response.json())
        .then(data => {
            console.log("✅ JSON Loaded Successfully:", data);
            quizData = data;
            startGame();
        })
        .catch(error => console.error("❌ Error loading JSON:", error));
});

const popupContents = {
    rules: '<h2>Rules</h2><p>1. Answer correctly or lose a life<br>2. You got 10 seconds to answer<br>3. You got 3 lives<br>Good luck</p> <button onclick="audioOff()">Mute audio</button>',
    story: '<h2>Story Mode</h2><p>Story mode description...</p>',
    challenge: '<h2>Challenge Mode</h2><p>Challenge mode description...</p>',
    settings: '<h2>Settings</h2><p>Settings description...</p>',
    default: '<h2>Unknown</h2><p>Unknown content type.</p>'
};

function getPopupContent(type) {
    return popupContents[type] || popupContents.default;
}

function showRules() {
    try {
        createPopup(getPopupContent('rules'));
    } catch (error) {
        console.error('Error showing rules:', error);
    }
}
function createPopup(content) {
    interval = 0;
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-btn" onclick="closePopup()">&times;</span>
            ${content}
        </div>
    `;
    document.body.appendChild(popup);
}

function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
        interval = 1;
    }
}

