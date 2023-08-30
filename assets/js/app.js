const topLineEl = $("#top-line");
const quizSpaceEl = $("quiz-space");
const quizStartBtn = $("quiz-start");

const quizQuestions = [
  {
    body: "",
    answers: ["", "", "", ""],
  },
  {},
];

quizStartBtn.on("click", (event) => {
  quizStartBtn.css("display: none");
  let quizTime = 75;
  setInterval(function quizTimer() {
    if (quizTime <= 0) {
      quizStartBtn.css("display: inline-block");
      clearInterval(quizTimer);
    }
  }, 1000);
  while (quizTime > 0) {
    generateQuestion();
  }
});

function generateQuestion() {
  const question =
    quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
  topLineEl.text(question.body);
  question.answers.forEach((value, index, array) => {
    let answerButton = quizSpaceEl.add("<button>");
    let innerText = String(index + 1) + ". " + value;
    answerButton.text(innerText);
    answerButton.on("click");
  });
}
