const questions = [
  "退屈な会話になると、別の角度からツッコミたくなる",
  "正しいかどうかより、まず面白いかどうかを見てしまう",
  "議論で勝ちたいというより、相手の理屈を崩したくなる",
  "思いついた企画を最後までやる前に、次の企画を思いつく",
  "みんなが当然と思っているルールに『本当に？』と思う",
  "相手を怒らせるつもりはないのに、なぜか煽ってると言われる",
  "説明を聞いてる途中で『つまりこういうこと？』と先に結論を作る",
  "急に変な企画を思いついて、なぜか本当に作り始める"
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
  quizCount.textContent = `Q${currentQuestion + 1} / ${questions.length}`;
  quizQuestion.textContent = questions[currentQuestion];
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

function getDiagnosis(score) {
  const percent = Math.round((score / 16) * 100);

  if (score <= 2) {
    return {
      title: "平和な一般人",
      percent,
      catch: "ENTP度はかなり低め。",
      text: "ちゃんと空気を読めるし、無駄に議論を始めないタイプ。ENTPの暴れ方を見て『元気だな』と思う側。"
    };
  }

  if (score <= 4) {
    return {
      title: "穏やかな観察者",
      percent,
      catch: "ENTPを眺める才能あり。",
      text: "自分から火種を作るタイプではないけど、面白い話にはちゃんと反応する。安全圏からカオスを楽しめる人。"
    };
  }

  if (score <= 6) {
    return {
      title: "擬態ENTP",
      percent,
      catch: "ちょっとENTPっぽい。",
      text: "発想力やツッコミ力はある。でもまだ理性が勝ってる。場を荒らす前に一回止まれる、かなり偉いタイプ。"
    };
  }

  if (score <= 8) {
    return {
      title: "ひらめき型ENTP",
      percent,
      catch: "アイデアで場を動かすタイプ。",
      text: "変な企画、謎の提案、急な方向転換が得意。思いついた瞬間が一番楽しい。継続は知らん。"
    };
  }

  if (score <= 10) {
    return {
      title: "屁理屈クリエイター",
      percent,
      catch: "理屈をこねる才能あり。",
      text: "普通の話も別角度からこね始めるタイプ。相手を困らせるつもりはないのに、気づいたら議論になってる。"
    };
  }

  if (score <= 12) {
    return {
      title: "口だけ革命家",
      percent,
      catch: "発想だけなら世界を変えてる。",
      text: "『これ作ったら面白くね？』が多いタイプ。実行する時もあるけど、次の面白そうなことにすぐ浮気する。"
    };
  }

  if (score <= 14) {
    return {
      title: "カオス討論家",
      percent,
      catch: "かなり危険なENTP圏内。",
      text: "議論を遊び場にしてるタイプ。相手の前提を壊しながら、なぜか楽しそうにしてる。周囲はちょっと疲れる。"
    };
  }

  return {
    title: "純正ENTP",
    percent,
    catch: "ENTP度、限界突破。",
    text: "退屈を壊し、前提を疑い、思いつきで場を動かすタイプ。もはや議論の火種を持ち歩いている。危ない。"
  };
}

function showResult() {
  document.querySelector(".quiz-card").style.display = "none";

  const diagnosis = getDiagnosis(score);

  const shareText = `私は「${diagnosis.title}」でした！\nENTP度：${diagnosis.percent}%\n${diagnosis.catch}\n#ENTPJP\nhttps://entp.jp/`;
const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  
  result.innerHTML = `
    <h3>${diagnosis.title}</h3>
    <p class="score">ENTP度：${diagnosis.percent}%</p>
    <p><strong>${diagnosis.catch}</strong></p>
    <p>${diagnosis.text}</p>

    <div class="share-box">
      <p>シェア用テキスト</p>
      <textarea readonly>${shareText}</textarea>
      <button type="button" id="copyShareButton">コピーする</button>
    </div>

    <button type="button" id="retryButton">もう一回やる</button>
  `;

  document.querySelector("#retryButton").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    result.innerHTML = "";
    document.querySelector(".quiz-card").style.display = "block";
    showQuestion();
  });

  document.querySelector("#copyShareButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      document.querySelector("#copyShareButton").textContent = "コピーした！";
    } catch {
      document.querySelector("#copyShareButton").textContent = "コピー失敗";
    }
  });
}

yesButton.addEventListener("click", () => answerQuiz(2));
maybeButton.addEventListener("click", () => answerQuiz(1));
noButton.addEventListener("click", () => answerQuiz(0));

showQuestion();

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
