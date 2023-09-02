const scoreListEl = $("#highscore-list");
const clearButtonEl = $("#clear-scores");

let listScores =
  JSON.parse(localStorage.getItem("listScores")) ||
  [
    // {
    //   name: "JK",
    //   score: 98,
    // },
    // {
    //   name: "DH",
    //   score: 78,
    // },
    // {
    //   name: "JB",
    //   score: 54,
    // },
  ];
// console.log(listScores);

populateScoreList();
clearButtonEl.on("click", handleClearScores);

function handleClearScores(event) {
  listScores = [];
  // scoreListEl.children().remove();
  populateScoreList();
  localStorage.setItem("listScores", JSON.stringify(listScores));
}

function populateScoreList() {
  scoreListEl.children().remove();
  listScores.forEach((value, index) => {
    const entryContent = `${index + 1}. ${value.name}: ${value.score}`;
    let entry = $("<li>");
    entry.text(entryContent);
    console.log(entry);
    console.log(entryContent);
    scoreListEl.append(entry);
  });
}
