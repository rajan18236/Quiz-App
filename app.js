const questions = [
    {
        question: "What is the Capital City of Nepal?",
        answers: [
            { answer: "Pokhara", correct: "false" },
            { answer: "Dharan", correct: "false" },
            { answer: "Kathmandu", correct: "true" },
            { answer: "Lalitpur", correct: "false" },
        ],


    },
    {
        question: "What is the Capital City of India?",
        answers: [
            { answer: "New Dehil", correct: "true" },
            { answer: "Mumbai", correct: "false" },
            { answer: "Kolkata", correct: "false" },
            { answer: "Hyderabad", correct: "false" },
        ],

    },
    {
        question: "What is the Capital City of China?",
        answers: [
            { answer: "Shanghai", correct: "false" },
            { answer: "Xi An", correct: "false" },
            { answer: "Wuhan", correct: "false" },
            { answer: "Beijing", correct: "true" },
        ],

    },
    {
        question: "What is the Capital City of South Korea?",
        answers: [
            { answer: "Busan", correct: "false" },
            { answer: "Seoul", correct: "true" },
            { answer: "Daegu", correct: "false" },
            { answer: "Incheon", correct: "false" },
        ],

    },
    {
        question: "What is the Capital City of Japan?",
        answers: [
            { answer: "Tokyo", correct: "true" },
            { answer: "Hiroshima", correct: "false" },
            { answer: "Kawasaki", correct: "false" },
            { answer: "Nagasaki", correct: "false" },
        ],

    },

];
const questionElement = document.querySelector("#question");
const answerElements = document.querySelector(".answer");
const nextBtn = document.querySelector(".next-btn");
const msgBox = document.querySelector("#mgs-box")
let index = 0;
let score = 0;

// staring quiz
function startQuiz() {
    index = 0;
    score = 0;
    nextBtn.classList.add("hide")
    msgBox.innerText = "Quiz Challenges"
    showQuestion();
};

// showing Question
function showQuestion() {
    resetStage();
    let currentQuestionNo = index + 1;
    let currentQuestion = questions[index];
    questionElement.innerHTML = currentQuestionNo + ") " + currentQuestion.question;

    currentQuestion.answers.forEach(element => {
        const button = document.createElement("button");
        button.innerHTML = element.answer;
        button.classList.add("btn")
        answerElements.appendChild(button)
        if (element.correct) {
            button.dataset.correct = element.correct;
        }
        button.addEventListener("click", answerSelect);
    })
}

function resetStage() {

    while (answerElements.firstChild) {
        answerElements.removeChild(answerElements.firstChild)

    }

}

function answerSelect(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerElements.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");

        }
        button.disabled = true;

    });
    nextBtn.classList.remove("hide")
}

function showScore() {
    resetStage();
    nextBtn.classList.add("hide")
    questionElement.innerHTML = `Your Score is ${score} out of ${questions.length}!<br>`
    msgBox.innerText = "Play Again"
    const msg = document.createElement("button")
    msg.innerText = "Try Again"
    msg.classList.add("btn")
    msg.addEventListener("click",startQuiz)
    questionElement.appendChild(msg)


}

function handleNextBtn() {
    index++;
    if (index < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (index < questions.length) {
        handleNextBtn();
    }
    else {
        startQuiz();
    }
})

startQuiz();