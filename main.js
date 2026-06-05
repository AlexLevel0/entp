const questions = [
  "退屈な会話になると、別の角度からツッコミたくなる",
  "正しいかどうかより、まず面白いかどうかを見てしまう",
  "議論で勝ちたいというより、相手の理屈を崩したくなる",
  "思いついた企画を最後までやる前に、次の企画を思いつく",
  "みんなが当然と思っているルールに『本当に？』と思う",
  "相手を怒らせるつもりはないのに、なぜか煽ってると言われる",
  "説明を聞いてる途中で『つまりこういうこと？』と先に結論を作る",
  "急に変な企画を思いついて、なぜか本当に作り始める",
  "相手の意見を聞くと、賛成より先に反例を探してしまう",
  "普通に褒めるより、少し茶化した方が楽しい",
  "ルールを見ると、破りたいというより抜け道を探したくなる",
  "ひとつの答えより、いくつも可能性を出す方が好き"
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

  const progressBar = document.querySelector("#quizProgressBar");
  if (progressBar) {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
}
function answerQuiz(point) {
  score += point;

  const quizCard = document.querySelector(".quiz-card");
  quizCard.classList.add("flip-out");

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      showQuestion();
      quizCard.classList.remove("flip-out");
      quizCard.classList.add("flip-in");

      setTimeout(() => {
        quizCard.classList.remove("flip-in");
      }, 250);
    } else {
  quizCard.classList.remove("flip-out", "flip-in");
  showResult();
}
  }, 220);
}

function getDiagnosis(score) {
  const percent = Math.round((score / 24) * 100);

  if (score <= 3) {
    return {
      title: "平和な一般人",
      percent,
      catch: "ENTP度はかなり低め。",
      text: "ちゃんと空気を読めるし、無駄に議論を始めないタイプ。ENTPの暴れ方を見て『元気だな』と思う側。",
      badges: ["平和", "常識", "安全圏"]
    };
  }

  if (score <= 6) {
    return {
      title: "穏やかな観察者",
      percent,
      catch: "ENTPを眺める才能あり。",
      text: "自分から火種を作るタイプではないけど、面白い話にはちゃんと反応する。安全圏からカオスを楽しめる人。",
      badges: ["観察", "聞き役", "ほどよい好奇心"]
    };
  }

  if (score <= 9) {
    return {
      title: "擬態ENTP",
      percent,
      catch: "ちょっとENTPっぽい。",
      text: "発想力やツッコミ力はある。でもまだ理性が勝ってる。場を荒らす前に一回止まれる、かなり偉いタイプ。",
      badges: ["擬態", "ツッコミ", "理性あり"]
    };
  }

  if (score <= 12) {
    return {
      title: "ひらめき型ENTP",
      percent,
      catch: "アイデアで場を動かすタイプ。",
      text: "変な企画、謎の提案、急な方向転換が得意。思いついた瞬間が一番楽しい。継続は知らん。",
      badges: ["ひらめき", "企画", "飽き性"]
    };
  }

  if (score <= 15) {
    return {
      title: "屁理屈クリエイター",
      percent,
      catch: "理屈をこねる才能あり。",
      text: "普通の話も別角度からこね始めるタイプ。相手を困らせるつもりはないのに、気づいたら議論になってる。",
      badges: ["屁理屈", "別角度", "言葉遊び"]
    };
  }

  if (score <= 18) {
    return {
      title: "口だけ革命家",
      percent,
      catch: "発想だけなら世界を変えてる。",
      text: "『これ作ったら面白くね？』が多いタイプ。実行する時もあるけど、次の面白そうなことにすぐ浮気する。",
      badges: ["革命", "企画倒れ", "夢はでかい"]
    };
  }

  if (score <= 21) {
    return {
      title: "カオス討論家",
      percent,
      catch: "かなり危険なENTP圏内。",
      text: "議論を遊び場にしてるタイプ。相手の前提を壊しながら、なぜか楽しそうにしてる。周囲はちょっと疲れる。",
      badges: ["議論", "前提破壊", "カオス"]
    };
  }

  return {
    title: "純正ENTP",
    percent,
    catch: "ENTP度、限界突破。",
    text: "退屈を壊し、前提を疑い、思いつきで場を動かすタイプ。もはや議論の火種を持ち歩いている。危ない。",
    badges: ["純正", "爆発", "危険人物"]
  };
}

function showResult() {
  const quizCard = document.querySelector(".quiz-card");
  quizCard.style.display = "none";
  quizCard.classList.remove("flip-out", "flip-in");

  const diagnosis = getDiagnosis(score);

  const shareText = `私は「${diagnosis.title}」でした！
ENTP度：${diagnosis.percent}%
${diagnosis.catch}
#ENTPJP
https://entp.jp/`;

  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

const badgesHtml = diagnosis.badges
  .map((badge) => `<span>${badge}</span>`)
  .join("");

result.innerHTML = `
  <div class="result-card">
    <p class="result-label">あなたの結果</p>

    <h3>${diagnosis.title}</h3>

    <div class="result-percent">
      <span>${diagnosis.percent}</span>%
    </div>

    <p class="result-catch">${diagnosis.catch}</p>
    <p class="result-text">${diagnosis.text}</p>

    <div class="result-badges">
      ${badgesHtml}
    </div>
  </div>

  <div class="share-box">
    <p>シェア用テキスト</p>
    <textarea readonly>${shareText}</textarea>

    <div class="share-actions">
      <button type="button" id="copyShareButton">コピーする</button>
      <a class="share-link" href="${xShareUrl}" target="_blank" rel="noopener">Xでシェア</a>
    </div>
  </div>

  <button type="button" id="retryButton">もう一回やる</button>
`;

  document.querySelector("#retryButton").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    result.innerHTML = "";
    const quizCard = document.querySelector(".quiz-card");
quizCard.style.display = "";
quizCard.classList.remove("flip-out", "flip-in");
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

const debateTopics = [
  { title: "一生スマホ禁止 vs 一生ゲーム禁止", a: "スマホ禁止の方がマシ", b: "ゲーム禁止の方がマシ" },
  { title: "天才だけど飽き性 vs 凡人だけど継続力最強", a: "天才だけど飽き性", b: "凡人だけど継続力最強" },
  { title: "全員が本音を言う世界 vs 全員が空気を読む世界", a: "本音の世界", b: "空気を読む世界" },
  { title: "正論だけの人 vs ノリだけの人", a: "正論だけの人", b: "ノリだけの人" },
  { title: "未来が読める能力 vs 相手の本音が読める能力", a: "未来が読める能力", b: "相手の本音が読める能力" },
  { title: "一生退屈しないけど貧乏 vs 一生安定だけど退屈", a: "一生退屈しないけど貧乏", b: "一生安定だけど退屈" },
  { title: "論破されるけど人気者 vs 論破できるけど嫌われ者", a: "論破されるけど人気者", b: "論破できるけど嫌われ者" },
  { title: "才能だけで生きる vs 努力だけで生きる", a: "才能だけで生きる", b: "努力だけで生きる" },
  { title: "友達100人 vs 親友1人", a: "友達100人", b: "親友1人" },
  { title: "世界一面白い人 vs 世界一頭がいい人", a: "世界一面白い人", b: "世界一頭がいい人" },
  { title: "ENTPだけの学校 vs ISTJだけの学校", a: "ENTPだけの学校", b: "ISTJだけの学校" },
  { title: "ESTPと無人島 vs INTPと密室", a: "ESTPと無人島", b: "INTPと密室" },
  { title: "MBTIは当たる vs MBTIはただの遊び", a: "MBTIは当たる", b: "MBTIはただの遊び" },
  { title: "好きなことで稼ぐ vs 得意なことで稼ぐ", a: "好きなことで稼ぐ", b: "得意なことで稼ぐ" },
  { title: "一生ツッコミ役 vs 一生ボケ役", a: "一生ツッコミ役", b: "一生ボケ役" },
  { title: "自由だけど孤独 vs 不自由だけど仲間がいる", a: "自由だけど孤独", b: "不自由だけど仲間がいる" },
  { title: "全員が自分を好きな世界 vs 自分が全員を好きな世界", a: "全員が自分を好きな世界", b: "自分が全員を好きな世界" },
  { title: "すぐ飽きる天才 vs ずっと続ける凡人", a: "すぐ飽きる天才", b: "ずっと続ける凡人" },
  { title: "会話が上手い人 vs 沈黙が心地いい人", a: "会話が上手い人", b: "沈黙が心地いい人" },
  { title: "最強のひらめき vs 最強の実行力", a: "最強のひらめき", b: "最強の実行力" }
];

const todayTopic = document.querySelector("#todayTopic");
const playTodayTopic = document.querySelector("#playTodayTopic");

let todayTopicIndex = 0;

function showTodayTopic() {
  if (!todayTopic) return;

  const today = new Date();
  const seed = today.getFullYear() + today.getMonth() + today.getDate();

  todayTopicIndex = seed % debateTopics.length;

  const topic = debateTopics[todayTopicIndex];
  todayTopic.textContent = topic.title;
}

showTodayTopic();

if (playTodayTopic) {
  playTodayTopic.addEventListener("click", () => {
    currentDebate = todayTopicIndex;
    showDebate();
  });
}

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

  let debateScore = 0;

  debateScore += Math.min(40, text.length);

  const entpWords = [
    "でも", "逆に", "そもそも", "つまり", "例えば", "なぜなら",
    "本当に", "前提", "可能性", "視点", "論理", "矛盾",
    "仮に", "一方で", "だから", "むしろ", "要するに",
    "根拠", "証拠", "例外", "比較", "構造", "本質",
    "問題", "定義", "目的", "効率", "リスク", "メリット",
    "デメリット", "合理的", "感情論", "別に", "それって",
    "なんで", "どうせ", "ありえる", "おかしくない",
    "破綻", "反論", "結論"
  ];

  entpWords.forEach((word) => {
    if (text.includes(word)) {
      debateScore += 3;
    }
  });

  if (text.includes("そもそも") || text.includes("前提")) {
    debateScore += 8;
  }

  if (text.includes("逆に") || text.includes("むしろ")) {
    debateScore += 6;
  }

  if (text.includes("例えば") || text.includes("仮に")) {
    debateScore += 6;
  }

  if (text.includes("？") || text.includes("?")) {
    debateScore += 8;
  }

  if (text.includes("ｗ") || text.includes("笑")) {
    debateScore += 5;
  }

  if (text.length >= 80) {
    debateScore += 10;
  }

  if (text.length >= 140) {
    debateScore += 10;
  }

  if (debateScore > 100) {
    debateScore = 100;
  }

  let title = "";
  let comment = "";

  if (debateScore <= 35) {
    title = "平和な主張";
    comment = "まだ優しい。ENTPというより、ちゃんとした人間の文章。危険度は低い。";
  } else if (debateScore <= 60) {
    title = "議論の芽あり";
    comment = "いい感じに理屈が出てる。あと少し前提を壊せばENTPっぽくなる。";
  } else if (debateScore <= 80) {
    title = "かなりENTP";
    comment = "論点をずらしながらも妙に納得させるタイプ。相手はちょっと嫌がる。";
  } else {
    title = "カオス討論家";
    comment = "危険。議論を遊び場にしてる。相手の前提ごと爆破するタイプ。";
  }

  const shareText = `ディベート結果は「${title}」でした！
ENTPっぽさ：${debateScore}%
${comment}
#ENTPJP
https://entp.jp/`;

  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  debateResult.innerHTML = `
  <h3>${title}</h3>
  <p class="score">ENTPっぽさ：${debateScore}%</p>
  <p>${comment}</p>

  <div class="share-box debate-share-box">
    <p>シェア用テキスト</p>
    <textarea readonly>${shareText}</textarea>

    <div class="share-actions">
      <button type="button" id="copyDebateShareButton">コピーする</button>
      <a class="share-link" href="${xShareUrl}" target="_blank" rel="noopener">Xでシェア</a>
    </div>
  </div>
`;

  document.querySelector("#copyDebateShareButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      document.querySelector("#copyDebateShareButton").textContent = "コピーした！";
    } catch {
      document.querySelector("#copyDebateShareButton").textContent = "コピー失敗";
    }
  });
}

function nextDebate() {
  let nextIndex = Math.floor(Math.random() * debateTopics.length);

  while (nextIndex === currentDebate && debateTopics.length > 1) {
    nextIndex = Math.floor(Math.random() * debateTopics.length);
  }

  currentDebate = nextIndex;
  showDebate();
}

choiceA.addEventListener("click", () => selectSide("A"));
choiceB.addEventListener("click", () => selectSide("B"));
judgeButton.addEventListener("click", judgeDebate);
nextDebateButton.addEventListener("click", nextDebate);

showDebate();
