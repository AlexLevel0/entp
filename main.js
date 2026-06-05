const questions = [
  "退屈な会話になると、別の角度からツッコミたくなる",
  "正しいかどうかより、まず面白いかどうかを見てしまう",
  "議論で勝ちたいというより、相手の理屈を崩したくなる",
  "思いついた企画を最後までやる前に、次の企画を思いつく",
  "みんなが当然と思っているルールに『本当に？』と思う",
  "相手を怒らせるつもりはないのに、なぜか煽ってると言われる"
];

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

const quiz = document.querySelector("#quiz");

questions.forEach((text, index) => {
  const label = document.createElement("label");
  label.className = "question";

  label.innerHTML = `
    <input type="checkbox">
    <span>${index + 1}. ${text}</span>
  `;

  quiz.appendChild(label);
});

document.querySelector("#resultButton").addEventListener("click", () => {
  const checkedCount = document.querySelectorAll("#quiz input:checked").length;

  let title = "";
  let text = "";

  if (checkedCount <= 1) {
    title = "穏やかな観察者";
    text = "ENTP度は低め。混沌を見るのは好きだけど、自分から火をつけるタイプではなさそう。";
  } else if (checkedCount <= 3) {
    title = "擬態ENTP";
    text = "ENTPっぽさあり。議論や発想は好きだけど、まだ理性が勝っている。えらい。";
  } else if (checkedCount <= 5) {
    title = "かなりENTP";
    text = "退屈を壊す才能あり。面白そうな話題を見ると、黙っていられないタイプ。";
  } else {
    title = "純正カオスENTP";
    text = "危険。アイデアと屁理屈で場を支配するタイプ。議論の火種を持ち歩くな。";
  }

  document.querySelector("#result").innerHTML = `
    <h3>${title}</h3>
    <p>${text}</p>
  `;
});

const debateGame = document.querySelector("#debateGame");

debateTopics.forEach((topic) => {
  const box = document.createElement("div");
  box.className = "debate-topic";

  box.innerHTML = `
    <h3>${topic.title}</h3>
    <button>${topic.a}</button>
    <button>${topic.b}</button>
    <textarea placeholder="ここに主張を書け。遠慮したら負け。"></textarea>
  `;

  debateGame.appendChild(box);
});
