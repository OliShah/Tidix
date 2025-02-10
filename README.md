# Tidix
The QuizManager class provides a clear API for other developers to interact with. Here’s what each method does:

addQuestion: Adds a new question to the quiz.

getQuestionById: Retrieves a question by its ID.

getAllQuestions: Returns all questions with additional details like difficulty text and points.

getDifficultyInfo: Returns difficulty information (text and points) based on the difficulty ID.

calculatePoints: Calculates the points for a specific question.

getCorrectAnswer: Retrieves the correct answer for a question.

getRandomQuestion: Returns a random question from the list.


1. Here’s how other developers can use the QuizManager class in their code:


// Initialize the QuizManager
const quizManager = new QuizManager();

// Add questions (id, difficultyId, description, answers)
Questions.addQuestion(1, 1, "What is the capital of France?", [
    { text: "Paris", correct: true },
    { text: "London", correct: false },
    { text: "Berlin", correct: false },
    { text: "Madrid", correct: false }
]);

Questions.addQuestion(2, 2, "What is the square root of 64?", [
    { text: "4", correct: false },
    { text: "8", correct: true },
    { text: "16", correct: false },
    { text: "32", correct: false }
]);

// Get a question by ID
const question = quizManager.getQuestionById(1);
console.log(question.description); // Output: "What is the capital of France?"

// Get all questions
const allQuestions = quizManager.getAllQuestions();
console.log(allQuestions);

// Get a random question
const randomQuestion = quizManager.getRandomQuestion();
console.log(randomQuestion.description);

// Get the correct answer for a question
const correctAnswer = quizManager.getCorrectAnswer(question);
console.log(correctAnswer.text); // Output: "Paris"