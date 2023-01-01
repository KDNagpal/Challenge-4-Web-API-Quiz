let questions = [{
    q: "Commonly used data types DO NOT include:",
    a: "1. Strings",
    b: "2. Booleans",
    c: "3. Alerts",
    d: "4. Numbers",
    correct: "3. Alerts",
},
{
    q: "The condition in an if/else statement is enclosed with ____.",
    a: "1. Quotes",
    b: "2. Curly brackets",
    c: "3. Parentheses",
    d: "4. Square brackets",
    correct: "3. Parentheses",
},
{
    q: "Arrays in JavaScript can be used to store ____.",
    a: "1. Numbers and strings",
    b: "2. Other arrays",
    c: "3. Booleans",
    d: "4. All of the above",
    correct: "4. All of the above",
},
{
    q: "String values must be encosed within ____ when being assigned to variables.",
    a: "1. Quotes",
    b: "2. Curly brackets",
    c: "3. Parentheses",
    d: "4. Square brackets",
    correct: "1. Quotes",
},
{
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    a: "1. Javascript",
    b: "2. Terminal/Bash",
    c: "3. for loops",
    d: "4. console.log",
    correct: "4. console.log",
},
{
    q: "What is the correct syntax for referring to an external script called 'code.js'?",
    a: "1. <script src='code.js'>",
    b: "2. <script href='code.js'>",
    c: "3. <script ref='code.js'>",
    d: "4. <script name='code.js'>",
    correct: "1. <script src='code.js'>",
}];

let startQuiz = document.getElementById("start");
let timerEl = document.getElementById("countdown");
let timeLeft = 60;
let quizTime;
let quizDiv = document.querySelector("#quizDiv");


let renderQuestion = function (question) {
    quizDiv.innerHTML = "";

    let questionHeader = document.createElement("h2");
    questionHeader.textContent = question.q;

    let choiceA = document.createElement("button");
    choiceA.textContent = question.a;
    choiceA.addEventListener("click", answerClick);

    let choiceB = document.createElement("button");
    choiceB.textContent = question.b;
    choiceB.addEventListener("click", answerClick);

    let choiceC = document.createElement("button");
    choiceC.textContent = question.c;
    choiceC.addEventListener("click", answerClick);

    let choiceD = document.createElement("button");
    choiceD.textContent = question.d;
    choiceD.addEventListener("click", answerClick);

    quizDiv.appendChild(questionHeader);
    quizDiv.appendChild(choiceA);
    quizDiv.appendChild(choiceB);
    quizDiv.appendChild(choiceC);
    quizDiv.appendChild(choiceD);
}

let currentQuestionIndex = 0;
let userScore = 0;
let correctAnswer = questions[currentQuestionIndex].correct;
let clickViewScores = document.getElementById("view-score");

let answerClick = function(event) {
    event.preventDefault();
    let userAnswer = event.target.textContent;
    correctAnswer = questions[currentQuestionIndex].correct;
    
    let answerDetermination = document.querySelector("#answer");
    if (userAnswer !== correctAnswer) {
        adjustTime(-10);
        answer.textContent = "Wrong!";
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};

    }
    else if (userAnswer === correctAnswer) {
        currentQuestionIndex++;
        answer.textContent = "Correct!";
        userScore++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};
    }
};

let quiz = function (event) {
    event.preventDefault();
    resetDisplay();
    renderQuestion(questions[currentQuestionIndex]);
};

function resetDisplay() {
    quizDiv.innerHTML="";
    document.querySelector("#intro-page").style.display = "none";
}
function highScores() {
    let data = localStorage.getItem("object");
    let getData = JSON.parse(data);
    let name = getData.name;
    let score = getData.score;
    quizDiv.innerHTML = "";
    quizDiv.innerHTML = name + " " + score;
}
clickViewScores.addEventListener("click", () => {
    highScores();
})

let initials; 
function endQuizPage() {
    resetDisplay();
    timerEl.textContent = "";
    clearInterval(quizTime);
    let endPage = document.createElement("h2");
    quizDiv.appendChild(endPage);

    let blank = document.querySelector("#answer");
    blank.innerHTML = "";

    endPage.innerHTML = "You're all done!! You Scored " + userScore + " point(s)!" + " Enter your Name to save";

    var initialBox = document.createElement("input");
    blank.appendChild(initialBox);

    var submitInitialBtn = document.createElement("button");
    submitInitialBtn.textContent = "Submit";
    blank.appendChild(submitInitialBtn);

    submitInitialBtn.addEventListener("click", () => {

        
        if (initialBox.value.length === 0) return false;

        let storeInitials = (...input) => {
            let data = JSON.stringify({ "name":input[0], "score":input[1]})
            localStorage.setItem("object", data)
        }
        storeInitials(initialBox.value, userScore);

        var playAgain = document.createElement("button");
        playAgain.textContent= "Play Again!";
        blank.appendChild(playAgain);

        playAgain.addEventListener("click", () => {
            location.reload();
        })
    });

    document.querySelector("input").value = "";

    initialBox.addEventListener("submit", endQuizPage);
    
};
function renderInitials() {
    submitInitialBtn.addEventListener('click', function(event) {
        event.preventDefault;
}
)};

startQuiz.addEventListener('click', quiz);

function timer() {
    timerEl.textContent = "Time Left: " + timeLeft + " seconds";
    quizTime = setInterval(function () {
        if (timeLeft > 0) {
            adjustTime(-1);
        } else {
            endQuizPage();
        }
    }, 1000);
}
function adjustTime(amount) {
    timeLeft += amount;
    if (timeLeft < 0) {
        timeLeft = 0;
    }
    timerEl.textContent = "Time Left: " + timeLeft + " seconds";
}

startQuiz.onclick = timer;