const questions = [
  {
    text: "退屈な会話になると、別の角度からツッコミたくなる",
    point: 2
  },
  {
    text: "正しいかどうかより、まず面白いかどうかを見てしまう",
    point: 2
  },
  {
    text: "議論で勝ちたいというより、相手の理屈を崩したくなる",
    point: 2
  },
  {
    text: "思いついた企画を最後までやる前に、次の企画を思いつく",
    point: 2
  },
  {
    text: "みんなが当然と思っているルールに『本当に？』と思う",
    point: 2
  },
  {
    text: "相手を怒らせるつもりはないのに、なぜか煽ってると言われる",
    point: 2
  },
  {
    text: "説明を聞いてる途中で『つまりこういうこと？』と先に結論を作る",
    point: 2
  },
  {
    text: "急に変な企画を思いついて、なぜか本当に作り始める",
    point: 2
  }
];

let currentQuestion = 0;
let score = 0;

const quizCount = document.querySelector("#quizCount");
const quizQuestion = document.querySelector("#quizQuestion");
const yesButton = document.querySelector("#yesButton");
const maybeButton = document.querySelector("#maybeButton");
const noButton = document.querySelector("#noButton");
const result = document.querySelector("#result");

function showQuestion() {
  const q = questions[currentQuestion];

  quizCount.textContent = `Q${currentQuestion + 1} / ${questions.length}`;
  quizQuestion.textContent = q.text;
}

function answerQuiz(point) {
  score += point;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.querySelector(".quiz-card").style.display = "none";

  let title = "";
  let text = "";

  if (score <= 4) {
    title = "穏やかな観察者";
    text = "ENTP度は低め。混沌を見るのは好きだけど、自分から火をつけるタイプではなさそう。";
  } else if (score <= 8) {
    title = "擬態ENTP";
    text = "ENTPっぽさあり。議論や発想は好きだけど、まだ理性が勝っている。えらい。";
  } else if (score <= 12) {
    title = "かなりENTP";
    text = "退屈を壊す才能あり。面白そうな話題を見ると、黙っていられないタイプ。";
  } else {
    title = "純正カオスENTP";
    text = "危険。アイデアと屁理屈で場を支配するタイプ。議論の火種を持ち歩くな。";
  }

  result.innerHTML = `
    <h3>${title}</h3>
    <p>${text}</p>
    <button type="button" id="retryButton">もう一回やる</button>
  `;

  document.querySelector("#retryButton").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    result.innerHTML = "";
    document.querySelector(".quiz-card").style.display = "block";
    showQuestion();
  });
}

yesButton.addEventListener("click", () => answerQuiz(2));
maybeButton.addEventListener("click", () => answerQuiz(1));
noButton.addEventListener("click", () => answerQuiz(0));

showQuestion();

const debateTopics = [
  {
    title: "一生スマホ禁止 vs 一生ゲーム禁止",
    a: "スマホ禁止の方がマシ",
    b: "ゲーム禁止の方がマシ"
  },
  {
    title: "天才だけど飽き性 vs 凡人だけど継続力最強",
    a: "天才だけど飽き性",
    b: "凡人だけど継続力最強"
  },
  {
    title: "全員が本音を言う世界 vs 全員が空気を読む世界",
    a: "本音の世界",
    b: "空気を読む世界"
  }
];

const debateGame = document.querySelector("#debateGame");

debateTopics.forEach((topic) => {
  const box = document.createElement("div");
  box.className = "debate-topic";

  box.innerHTML = `
    <h3>${topic.title}</h3>
    <div class="debate-buttons">
      <button type="button">${topic.a}</button>
      <button type="button">${topic.b}</button>
    </div>
    <textarea placeholder="ここに主張を書け。遠慮したら負け。"></textarea>
  `;

  debateGame.appendChild(box);
});
