const quizData = [
    {
        question: "Which company produces the Mustang?",
        choices: ["Chevrolet", "Ford", "Toyota", "BMW"],
        correct: 1
    },
    {
        question: "What country is Ferrari from?",
        choices: ["France", "Germany", "Italy", "Japan"],
        correct: 2
    },
    {
        question: "Which fuel is commonly used in most cars?",
        choices: ["Diesel", "Electricity", "Gasoline", "Water"],
        correct: 2
    },
    {
        question: "What does 'SUV' stand for?",
        choices: ["Speed Utility Vehicle", "Sport Utility Vehicle", "Super Urban Van", "Small Utility Vehicle"],
        correct: 1
    },
    {
        question: "Which car brand uses a prancing horse as its logo?",
        choices: ["Lamborghini", "Porsche", "Maserati", "Ferrari"],
        correct: 3
    },
    {
        question: "Which car company produces the Corolla?",
        choices: ["Toyota", "Honda", "Ford", "Nissan"],
        correct: 0
    },
    {
        question: "What is the best-selling car of all time?",
        choices: ["Volkswagen Beetle", "Ford Model T", "Toyota Corolla", "Dodge Charger"],
        correct: 2
    },
    {
        question: "Which car brand has the 'Four Rings' logo?",
        choices: ["BMW", "Mercedes-Benz", "Audi", "Volkswagen"],
        correct: 2
    },
    {
        question: "What type of car is best for off-road driving?",
        choices: ["Convertible", "Hatchback", "Sedan", "SUV"],
        correct: 3
    },
    {
        question: "Which car manufacturer makes the Civic?",
        choices: ["Hyundai", "Honda", "Nissan", "Subaru"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
var sndwrong = new Audio("choicewrong.wav");
var sndcorrect = new Audio("choicecorrect.wav");

var timeLeft = 10;
var timer = setInterval(function(){
    timeLeft --;
    document.getElementById("timer").textContent = timeLeft;
    if(timeLeft <= 0 && score < 5){
        clearInterval(timer);
        document.getElementById("quiz-container").innerHTML = `<h2>Time's Up!</h2><p>Your final score is: ${score}/${quizData.length}</p>`;
    }
    if(timeLeft <= 0 && score >= 5){
        clearInterval(timer);
        document.getElementById("quiz-container").innerHTML = `<h2>Congratulations! You've won a *prize*!</h2><p>Your final score is: ${score}/${quizData.length}</p>`;
    }
}, 1000);

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length && score >= 5) {
        document.getElementById("quiz-container").innerHTML = `<h2>Congratulations! You've won a *prize*!</h2><p>Your final score is: ${score}/${quizData.length}</p>`;
        return;
    }
    if (currentQuestionIndex >= quizData.length && score < 5) {
        document.getElementById("quiz-container").innerHTML = `<h2>Game Over!</h2><p>Your final score is: ${score}/${quizData.length}</p>`;
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
    ;
}

function selectAnswer(choiceIndex) {
    if (choiceIndex === quizData[currentQuestionIndex].correct) {
        score++;
        sndcorrect.play();
    }
    else {
        sndwrong.play();
    }
    currentQuestionIndex++;
    
    loadQuestion();
}
document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
});