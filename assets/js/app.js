const topLineEl = $("#top-line");
const quizSpaceEl = $("#quiz-space");
const quizStartBtn = $("#quiz-start");
const quizTimeEl = $("#quiz-time-display");

let score;
let quizTime = 0;
let listScores = JSON.parse(localStorage.getItem("listScores")) || [];

const quizQuestions = [
  {
    body: "What does CSS stand for?",
    answers: [
      "Crazy Stupid Selling",
      "Cascading Style Sheets",
      "Crediting Sour Suckers",
      "Creating Strong Singers",
    ],
    correct: 1,
  },
  {
    body: "What does JS stand for?",
    answers: ["Jarring Story", "Juicy Socks", "JavaScript", "JumpStart"],
    correct: 2,
  },
  {
    body: "What does HTML stand for?",
    answers: [
      "Hypertext Markup Language",
      "Huge Tortoise, Made Larger",
      "Hard Times Might Last",
      "Hurtling Towards Major Losses",
    ],
    correct: 0,
  },
];

console.log(quizStartBtn.text());

quizStartBtn.on("click", handleQuiz);

quizSpaceEl.on("click", handleAnswer);

function handleQuiz(event) {
  console.log("something");
  score = 0;
  quizTime = 75;
  generateQuestion();
  setInterval(function quizTimer() {
    if (quizTime <= 0) {
      scorePrompt(score);
      clearInterval(quizTimer);
      quizSpaceEl.children().remove();
      return;
    }
    quizTimeEl.text("Time: " + quizTime);
    quizTime--;
  }, 1000);
}

function generateQuestion() {
  quizSpaceEl.children().remove();
  const question =
    quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
  topLineEl.text(question.body);
  question.answers.forEach((value, index) => {
    let answerButton = $("<button>");
    let innerText = String(index + 1) + ". " + value;
    answerButton.text(innerText);
    quizSpaceEl.append(answerButton);
  });
  quizSpaceEl.children().eq(question.correct).addClass("correct");
}

function handleAnswer(event) {
  let element = $(event.target);
  console.log(element);
  if (!element.hasClass("correct")) {
    quizTime -= 10;
    return;
  }
  score++;
  console.log(score);
  if (quizTime > 0) {
    generateQuestion();
  }
}

function scorePrompt() {
  console.log("this doesn't do anything yet.");
}
