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
  },
  {
    title: "正論だけの人 vs ノリだけの人",
    a: "正論だけの人",
    b: "ノリだけの人"
  },
  {
    title: "未来が読める能力 vs 相手の本音が読める能力",
    a: "未来が読める能力",
    b: "相手の本音が読める能力"
  }
];

let currentDebate = 0;
let selectedChoice = "";

const debateCount = document.querySelector("#debateCount");
const debateTitle = document.querySelector("#debateTitle");
const choiceA = document.querySelector("#choiceA");
const choiceB = document.querySelector("#choiceB");
const selectedSide = document.querySelector("#selectedSide");
const debateText = document.querySelector("#debateText");
const judgeButton = document.querySelector("#judgeButton");
const nextDebateButton = document.querySelector("#nextDebateButton");
const debateResult = document.querySelector("#debateResult");

function showDebate() {
  const topic = debateTopics[currentDebate];

  debateCount.textContent = `Theme ${currentDebate + 1} / ${debateTopics.length}`;
  debateTitle.textContent = topic.title;
  choiceA.textContent = topic.a;
  choiceB.textContent = topic.b;

  selectedChoice = "";
  selectedSide.textContent = "立場を選べ。逃げるな。";
  debateText.value = "";
  debateResult.innerHTML = "";

  choiceA.classList.remove("selected");
  choiceB.classList.remove("selected");
}

function selectSide(side) {
  const topic = debateTopics[currentDebate];

  selectedChoice = side;

  if (side === "A") {
    selectedSide.textContent = `選択中：${topic.a}`;
    choiceA.classList.add("selected");
    choiceB.classList.remove("selected");
  } else {
    selectedSide.textContent = `選択中：${topic.b}`;
    choiceB.classList.add("selected");
    choiceA.classList.remove("selected");
  }
}

function judgeDebate() {
  const text = debateText.value.trim();

  if (!selectedChoice) {
    debateResult.innerHTML = `
      <h3>立場未選択</h3>
      <p>まずAかBを選べ。そこから戦え。</p>
    `;
    return;
  }

  if (text.length < 10) {
    debateResult.innerHTML = `
      <h3>主張が短い</h3>
      <p>それはディベートじゃなくて一言コメント。もう少し屁理屈を盛れ。</p>
    `;
    return;
  }

  let score = 0;

  score += Math.min(40, text.length);

  const entpWords = [
    "でも",
    "逆に",
    "そもそも",
    "つまり",
    "例えば",
    "なぜなら",
    "本当に",
    "前提",
    "可能性",
    "視点",
    "論理",
    "矛盾"
  ];

  entpWords.forEach((word) => {
    if (text.includes(word)) {
      score += 5;
    }
  });

  if (text.includes("？") || text.includes("?")) {
    score += 8;
  }

  if (text.includes("ｗ") || text.includes("笑")) {
    score += 5;
  }

  if (score > 100) {
    score = 100;
  }

  let title = "";
  let comment = "";

  if (score <= 35) {
    title = "平和な主張";
    comment = "まだ優しい。ENTPというより、ちゃんとした人間の文章。危険度は低い。";
  } else if (score <= 60) {
    title = "議論の芽あり";
    comment = "いい感じに理屈が出てる。あと少し前提を壊せばENTPっぽくなる。";
  } else if (score <= 80) {
    title = "かなりENTP";
    comment = "論点をずらしながらも妙に納得させるタイプ。相手はちょっと嫌がる。";
  } else {
    title = "カオス討論家";
    comment = "危険。議論を遊び場にしてる。相手の前提ごと爆破するタイプ。";
  }

  debateResult.innerHTML = `
    <h3>${title}</h3>
    <p class="score">ENTPっぽさ：${score}%</p>
    <p>${comment}</p>
  `;
}

function nextDebate() {
  currentDebate++;

  if (currentDebate >= debateTopics.length) {
    currentDebate = 0;
  }

  showDebate();
}

choiceA.addEventListener("click", () => selectSide("A"));
choiceB.addEventListener("click", () => selectSide("B"));
judgeButton.addEventListener("click", judgeDebate);
nextDebateButton.addEventListener("click", nextDebate);

showDebate();
