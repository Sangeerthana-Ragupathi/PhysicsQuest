// Sample questions array
const questions = [
    { question: "What is the unit of force?", answer: "Newton" },
    { question: "What is the term for the change in velocity over time?", answer: "Acceleration" },
    { question: "What is the fundamental particle of an atom that has a positive charge?", answer: "Proton" },
    { question: "What is the measure of the average kinetic energy of particles in a substance?", answer: "Temperature" },
    { question: "What is the term for the ability to do work?", answer: "Energy" },
    { question: "What is the force that opposes the motion of an object?", answer: "Friction" },
    { question: "What is the distance light travels in one year?", answer: "Lightyear" },
    { question: "What is the term for the amount of matter in an object?", answer: "Mass" },
    { question: "What is the phenomenon of a wave bending as it passes from one medium to another?", answer: "Refraction" },
    { question: "What is the principle that states that energy cannot be created or destroyed?", answer: "Conservation" },
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timer;
let gameOver = false;

const questionText = document.getElementById('question-text');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-answer');
const feedback = document.getElementById('feedback');
const timeLeftDisplay = document.getElementById('time-left');
const nextQuestionButton = document.getElementById('next-btn');
const nextQuestionContainer = document.getElementById('next-question');

// Start the game with the first question
loadQuestion();

// Load the current question
function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionText.textContent = questions[currentQuestionIndex].question;
        answerInput.value = '';
        feedback.textContent = '';
        timeLeft = 60;
        updateTimerDisplay();
        startTimer();
    } else {
        questionText.textContent = "You've completed the quiz!";
        answerInput.style.display = 'none';
        submitButton.style.display = 'none';
        feedback.textContent = "Well done!";
        clearInterval(timer);
    }
}

// Start the 1-minute timer
function startTimer() {
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            showCorrectAnswer();
        }
    }, 1000);
}

// Update the timer display
function updateTimerDisplay() {
    timeLeftDisplay.textContent = timeLeft;
}

// Handle answer submission
submitButton.addEventListener('click', () => {
    checkAnswer();
});

// Check if the user's answer is correct
function checkAnswer() {
    const userAnswer = answerInput.value.trim();
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        feedback.textContent = "Correct!";
        moveToNextQuestion();
    } else {
        feedback.textContent = "Wrong! The correct answer is: " + correctAnswer;
        moveToNextQuestion();
    }
}

// Move to the next question after showing the feedback
function moveToNextQuestion() {
    clearInterval(timer);
    nextQuestionContainer.classList.remove('hidden');
    nextQuestionButton.addEventListener('click', () => {
        nextQuestionContainer.classList.add('hidden');
        currentQuestionIndex++;
        loadQuestion();
    });
}

// Show correct answer if time runs out
function showCorrectAnswer() {
    feedback.textContent = "Time's up! The correct answer is: " + questions[currentQuestionIndex].answer;
    moveToNextQuestion();
}
