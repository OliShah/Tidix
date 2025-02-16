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
    },
    {
        difficultyId: 2,
        question: "Which car company produces the Corolla?",
        choices: ["Toyota", "Honda", "Ford", "Nissan"],
        correct: 0
    },
    {
        difficultyId: 4,
        question: "What is the best-selling car of all time?",
        choices: ["Volkswagen Beetle", "Ford Model T", "Toyota Corolla", "Dodge Charger"],
        correct: 2
    },
    {
        difficultyId: 1,
        question: "Which car brand has the 'Four Rings' logo?",
        choices: ["BMW", "Mercedes-Benz", "Audi", "Volkswagen"],
        correct: 2
    },
    {
        difficultyId: 2,
        question: "What type of car is best for off-road driving?",
        choices: ["Convertible", "Hatchback", "Sedan", "SUV"],
        correct: 3
    },
    {
        difficultyId: 3,
        question: "Which car manufacturer makes the Civic?",
        choices: ["Hyundai", "Honda", "Nissan", "Subaru"],
        correct: 1
    }
];
quizData.sort((a, b) => {
    if (a.difficultyId !== b.difficultyId) {
      return a.difficultyId - b.difficultyId;
    } else {
      return Math.random() - 0.5; // random order if same difficulty
    }
  });

score_mapping = {
    1: 5,
    2: 10,
    3: 15,
    4: 20
}

let livesRemaining = 3;
let currentQuestionIndex = 0;
let score = 0;
var sndwrong = new Audio("choicewrong.wav");
var sndcorrect = new Audio("choicecorrect.wav");
let interval = 1

var timeLeft = 10;
var timer = setInterval(function(){
    timeLeft -= interval;
    document.getElementById("timer").textContent = timeLeft;
    if(timeLeft <= 0 && score < 5){
        clearInterval(timer);
        document.getElementById("quiz-container").innerHTML = `<h2>Time's Up!</h2><p>Your final score is: ${score}</p><p><a href="challengemode.html">Try Again?</a></p><p><a href="index.html">Return to Main Menu</a></p>`;
    }
    if(timeLeft <= 0 && score >= 5){
        clearInterval(timer);
        document.getElementById("quiz-container").innerHTML = `<h2>Congratulations! You've won a *prize*!</h2><p>Your final score is: ${score}</p><p><a href="challengemode.html">Try Again?</a></p><p><a href="index.html">Return to Main Menu</a></p>`;
    }
}, 1000);

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length && score >= 5) {
        document.getElementById("quiz-container").innerHTML = `<h2>Congratulations! You've won a *prize*!</h2><p>Your final score is: ${score}</p><p><a href="challengemode.html">Try Again?</a></p><p><a href="index.html">Return to Main Menu</a></p>`;
        return;
    }
    if (currentQuestionIndex >= quizData.length && score < 5) {
        document.getElementById("quiz-container").innerHTML = `<h2>Game Over!</h2><p>Your final score is: ${score}</p><p><a href="challengemode.html">Try Again?</a></p><p><a href="index.html">Return to Main Menu</a></p>`;
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
        sndcorrect.play();
    }
    else {
        sndwrong.play();
        livesRemaining --;
        if (livesRemaining <= 0){
            document.getElementById("quiz-container").innerHTML = `<h2>Game Over!</h2><p>Your final score is: ${score}</p><p><a href="challengemode.html">Try Again?</a></p><p><a href="index.html">Return to Main Menu</a></p>`;
        }
    }
    currentQuestionIndex++;
    loadQuestion();
}


document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
});

const popupContents = {
    rules: '<h2>Rules</h2><p>1. first rule<br>2. second rule<br>3. third rule</p>',
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