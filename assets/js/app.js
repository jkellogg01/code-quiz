const topLineEl = $("#top-line");
const quizSpaceEl = $("#quiz-space");
const quizStartBtn = $("#quiz-start");
const quizTimeEl = $("#quiz-time-display");

let nameInputEl;

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
  var quizTimer = setInterval(() => {
    if (quizTime <= 0) {
      clearInterval(quizTimer);
      quizSpaceEl.children().remove();
      scorePrompt(score);
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

function scorePrompt(score) {
  topLineEl.text("Game Over!");
  let promptEntryEl = $("<form>");
  promptEntryEl.text(
    "You scored " + score + "! Enter your initials to save your score:"
  );
  nameInputEl = $('<input type="text" id= />');
  let nameSubmitEl = $("<button>Submit</button>");
  promptEntryEl.append(nameInputEl);
  promptEntryEl.append(nameSubmitEl);
  promptEntryEl.on("submit", handleScoreSubmit);
  quizSpaceEl.append(promptEntryEl);
}

function handleScoreSubmit(event) {
  event.preventDefault();
  let userName = nameInputEl.val().toUpperCase();
  if (!userName) {
    console.log("No initials entered, not saving score");
    return;
  }
  listScores.push({
    name: userName,
    score: score,
  });
  localStorage.setItem("listScores", JSON.stringify(listScores));
  location.reload();
}
