// flash-cards/script.js — Flashcard logic with HSK 1 vocabulary

/* ===================================================================
   Type Definitions
   =================================================================== */

/**
 * @typedef {Object} FlashCard
 * @property {string} chinese - Chinese characters
 * @property {string} pinyin - Pinyin romanization
 * @property {string} english - English translation
 */

/**
 * @typedef {Object} AppState
 * @property {FlashCard[]} cards - Full card deck
 * @property {FlashCard[]} filteredCards - Currently filtered subset
 * @property {number} currentIndex - Index of the active card in filteredCards
 * @property {boolean} flipped - Whether the card is showing its back face
 */

/* ===================================================================
   HSK 1 Vocabulary Data (150 words)
   =================================================================== */

/** @type {FlashCard[]} */
const DEFAULT_CARDS = [
  // Nouns (63)
  { chinese: "家", pinyin: "jiā", english: "home; family" },
  { chinese: "学校", pinyin: "xuéxiào", english: "school" },
  { chinese: "医院", pinyin: "yīyuàn", english: "hospital" },
  { chinese: "老师", pinyin: "lǎoshī", english: "teacher" },
  { chinese: "学生", pinyin: "xuésheng", english: "student" },
  { chinese: "爸爸", pinyin: "bàba", english: "dad" },
  { chinese: "妈妈", pinyin: "māma", english: "mom" },
  { chinese: "哥哥", pinyin: "gēge", english: "older brother" },
  { chinese: "姐姐", pinyin: "jiějie", english: "older sister" },
  { chinese: "弟弟", pinyin: "dìdi", english: "younger brother" },
  { chinese: "妹妹", pinyin: "mèimei", english: "younger sister" },
  { chinese: "朋友", pinyin: "péngyǒu", english: "friend" },
  { chinese: "医生", pinyin: "yīshēng", english: "doctor" },
  { chinese: "服务员", pinyin: "fúwùyuán", english: "waiter; server" },
  { chinese: "记者", pinyin: "jìzhě", english: "journalist" },
  { chinese: "警察", pinyin: "jǐngchá", english: "policeman" },
  { chinese: "工人", pinyin: "gōngrén", english: "worker" },
  { chinese: "农民", pinyin: "nóngmín", english: "farmer" },
  { chinese: "作家", pinyin: "zuòjiā", english: "writer" },
  { chinese: "演员", pinyin: "yǎnyuán", english: "actor; performer" },
  { chinese: "水", pinyin: "shuǐ", english: "water" },
  { chinese: "茶", pinyin: "chá", english: "tea" },
  { chinese: "酒", pinyin: "jiǔ", english: "wine; liquor" },
  { chinese: "咖啡", pinyin: "kāfēi", english: "coffee" },
  { chinese: "牛奶", pinyin: "niúnǎi", english: "milk" },
  { chinese: "苹果", pinyin: "píngguǒ", english: "apple" },
  { chinese: "香蕉", pinyin: "xiāngjiāo", english: "banana" },
  { chinese: "梨", pinyin: "lí", english: "pear" },
  { chinese: "米饭", pinyin: "mǐfàn", english: "rice (cooked)" },
  { chinese: "面条", pinyin: "miàntiáo", english: "noodles" },
  { chinese: "饺子", pinyin: "jiǎozi", english: "dumplings" },
  { chinese: "蛋糕", pinyin: "dàngāo", english: "cake" },
  { chinese: "菜", pinyin: "cài", english: "dish; vegetables" },
  { chinese: "肉", pinyin: "ròu", english: "meat" },
  { chinese: "鱼", pinyin: "yú", english: "fish" },
  { chinese: "鸡蛋", pinyin: "jīdàn", english: "egg; chicken egg" },
  { chinese: "狗", pinyin: "gǒu", english: "dog" },
  { chinese: "猫", pinyin: "māo", english: "cat" },
  { chinese: "鸟", pinyin: "niǎo", english: "bird" },
  { chinese: "熊猫", pinyin: "xióngmāo", english: "panda" },
  { chinese: "北京", pinyin: "Běijīng", english: "Beijing" },
  { chinese: "中国", pinyin: "Zhōngguó", english: "China" },
  { chinese: "美国", pinyin: "Měiguó", english: "United States; America" },
  { chinese: "日本", pinyin: "Rìběn", english: "Japan" },
  { chinese: "英国", pinyin: "Yīngguó", english: "United Kingdom; England" },
  { chinese: "法国", pinyin: "Fǎguó", english: "France" },
  { chinese: "国家", pinyin: "guójiā", english: "country" },
  { chinese: "城市", pinyin: "chéngshì", english: "city" },
  { chinese: "商店", pinyin: "shāngdiàn", english: "shop; store" },
  { chinese: "饭店", pinyin: "fàndiàn", english: "restaurant; hotel" },
  { chinese: "银行", pinyin: "yínháng", english: "bank" },
  { chinese: "图书馆", pinyin: "túshūguǎn", english: "library" },
  { chinese: "机场", pinyin: "jīchǎng", english: "airport" },
  { chinese: "车站", pinyin: "chēzhàn", english: "station" },
  { chinese: "公园", pinyin: "gōngyuán", english: "park" },
  { chinese: "电影院", pinyin: "diànyǐngyuàn", english: "movie theater; cinema" },
  { chinese: "钱", pinyin: "qián", english: "money" },
  { chinese: "人民币", pinyin: "rénmínbì", english: "Chinese yuan (CNY)" },
  { chinese: "英语", pinyin: "Yīngyǔ", english: "English (language)" },
  { chinese: "汉语", pinyin: "Hànyǔ", english: "Chinese (language)" },
  { chinese: "语文", pinyin: "yǔwén", english: "Chinese language and literature" },
  { chinese: "数学", pinyin: "shùxué", english: "mathematics" },
  { chinese: "体育", pinyin: "tǐyù", english: "physical education; sports" },
  { chinese: "历史", pinyin: "lìshǐ", english: "history" },
  { chinese: "地理", pinyin: "dílǐ", english: "geography" },
  { chinese: "电脑", pinyin: "diànnǎo", english: "computer" },
  { chinese: "电话", pinyin: "diànhuà", english: "telephone" },
  { chinese: "手机", pinyin: "shǒujī", english: "mobile phone" },
  { chinese: "电视", pinyin: "diànshì", english: "television" },
  { chinese: "电影", pinyin: "diànyǐng", english: "movie; film" },
  { chinese: "书", pinyin: "shū", english: "book" },
  { chinese: "报纸", pinyin: "bàozhǐ", english: "newspaper" },
  { chinese: "信", pinyin: "xìn", english: "letter; mail" },
  { chinese: "衣服", pinyin: "yīfu", english: "clothes; clothing" },
  { chinese: "鞋", pinyin: "xié", english: "shoes" },
  { chinese: "汽车", pinyin: "qìchē", english: "car; automobile" },
  { chinese: "飞机", pinyin: "fēijī", english: "airplane" },
  { chinese: "火车", pinyin: "huǒchē", english: "train" },
  { chinese: "自行车", pinyin: "zìxíngchē", english: "bicycle" },
  { chinese: "地铁", pinyin: "dìtiě", english: "subway; metro" },

  // Verbs (36)
  { chinese: "是", pinyin: "shì", english: "to be" },
  { chinese: "有", pinyin: "yǒu", english: "to have; there is" },
  { chinese: "在", pinyin: "zài", english: "to be at; to exist" },
  { chinese: "来", pinyin: "lái", english: "to come" },
  { chinese: "去", pinyin: "qù", english: "to go" },
  { chinese: "吃", pinyin: "chī", english: "to eat" },
  { chinese: "喝", pinyin: "hē", english: "to drink" },
  { chinese: "看", pinyin: "kàn", english: "to look; to watch" },
  { chinese: "听", pinyin: "tīng", english: "to listen" },
  { chinese: "说", pinyin: "shuō", english: "to speak; to say" },
  { chinese: "读", pinyin: "dú", english: "to read" },
  { chinese: "写", pinyin: "xiě", english: "to write" },
  { chinese: "做", pinyin: "zuò", english: "to do; to make" },
  { chinese: "买", pinyin: "mǎi", english: "to buy" },
  { chinese: "卖", pinyin: "mài", english: "to sell" },
  { chinese: "工作", pinyin: "gōngzuò", english: "to work" },
  { chinese: "学习", pinyin: "xuéxí", english: "to study" },
  { chinese: "睡觉", pinyin: "shuìjiào", english: "to sleep" },
  { chinese: "坐", pinyin: "zuò", english: "to sit" },
  { chinese: "站", pinyin: "zhàn", english: "to stand" },
  { chinese: "走", pinyin: "zǒu", english: "to walk; to leave" },
  { chinese: "跑", pinyin: "pǎo", english: "to run" },
  { chinese: "开", pinyin: "kāi", english: "to open; to drive" },
  { chinese: "给", pinyin: "gěi", english: "to give" },
  { chinese: "帮", pinyin: "bāng", english: "to help" },
  { chinese: "认识", pinyin: "rènshi", english: "to know (a person)" },
  { chinese: "知道", pinyin: "zhīdào", english: "to know (a fact)" },
  { chinese: "想", pinyin: "xiǎng", english: "to want; to think" },
  { chinese: "要", pinyin: "yào", english: "to want; must" },
  { chinese: "喜欢", pinyin: "xǐhuān", english: "to like" },
  { chinese: "需要", pinyin: "xūyào", english: "to need" },
  { chinese: "觉得", pinyin: "juéde", english: "to feel; to think" },
  { chinese: "等", pinyin: "děng", english: "to wait" },
  { chinese: "付", pinyin: "fù", english: "to pay" },
  { chinese: "住", pinyin: "zhù", english: "to live; to stay" },
  { chinese: "叫", pinyin: "jiào", english: "to call; to be named" },

  // Adjectives (9)
  { chinese: "好", pinyin: "hǎo", english: "good" },
  { chinese: "大", pinyin: "dà", english: "big; large" },
  { chinese: "小", pinyin: "xiǎo", english: "small; little" },
  { chinese: "多", pinyin: "duō", english: "many; much" },
  { chinese: "少", pinyin: "shǎo", english: "few; little" },
  { chinese: "冷", pinyin: "lěng", english: "cold" },
  { chinese: "热", pinyin: "rè", english: "hot" },
  { chinese: "高兴", pinyin: "gāoxìng", english: "happy; glad" },
  { chinese: "漂亮", pinyin: "piàoliang", english: "pretty; beautiful" },

  // Pronouns (14)
  { chinese: "我", pinyin: "wǒ", english: "I; me" },
  { chinese: "你", pinyin: "nǐ", english: "you" },
  { chinese: "他", pinyin: "tā", english: "he; him" },
  { chinese: "她", pinyin: "tā", english: "she; her" },
  { chinese: "我们", pinyin: "wǒmen", english: "we; us" },
  { chinese: "他们", pinyin: "tāmen", english: "they; them" },
  { chinese: "这", pinyin: "zhè", english: "this" },
  { chinese: "那", pinyin: "nà", english: "that" },
  { chinese: "谁", pinyin: "shéi", english: "who" },
  { chinese: "什么", pinyin: "shénme", english: "what" },
  { chinese: "几", pinyin: "jǐ", english: "how many" },
  { chinese: "怎么", pinyin: "zěnme", english: "how" },
  { chinese: "哪里", pinyin: "nǎlǐ", english: "where" },
  { chinese: "哪儿", pinyin: "nǎr", english: "where (colloquial)" },

  // Numerals (11)
  { chinese: "零", pinyin: "líng", english: "zero; 0" },
  { chinese: "一", pinyin: "yī", english: "one; 1" },
  { chinese: "二", pinyin: "èr", english: "two; 2" },
  { chinese: "三", pinyin: "sān", english: "three; 3" },
  { chinese: "四", pinyin: "sì", english: "four; 4" },
  { chinese: "五", pinyin: "wǔ", english: "five; 5" },
  { chinese: "六", pinyin: "liù", english: "six; 6" },
  { chinese: "七", pinyin: "qī", english: "seven; 7" },
  { chinese: "八", pinyin: "bā", english: "eight; 8" },
  { chinese: "九", pinyin: "jiǔ", english: "nine; 9" },
  { chinese: "十", pinyin: "shí", english: "ten; 10" },

  // Classifiers (5)
  { chinese: "个", pinyin: "gè", english: "general classifier" },
  { chinese: "岁", pinyin: "suì", english: "classifier for years of age" },
  { chinese: "本", pinyin: "běn", english: "classifier for books" },
  { chinese: "些", pinyin: "xiē", english: "some; several" },
  { chinese: "块", pinyin: "kuài", english: "classifier for pieces; yuan (colloquial)" },

  // Adverbs (5)
  { chinese: "很", pinyin: "hěn", english: "very" },
  { chinese: "都", pinyin: "dōu", english: "all; both" },
  { chinese: "也", pinyin: "yě", english: "also; too" },
  { chinese: "就", pinyin: "jiù", english: "then; just" },
  { chinese: "才", pinyin: "cái", english: "just; only then" },

  // Conjunctions (1)
  { chinese: "和", pinyin: "hé", english: "and" },

  // Prepositions (1)
  { chinese: "从", pinyin: "cóng", english: "from" },

  // Particles (4)
  { chinese: "的", pinyin: "de", english: "possessive/modifier particle" },
  { chinese: "了", pinyin: "le", english: "completion/change particle" },
  { chinese: "吗", pinyin: "ma", english: "question particle" },
  { chinese: "呢", pinyin: "ne", english: "question/continuing state particle" },

  // Interjections (1)
  { chinese: "喂", pinyin: "wéi", english: "hello (on phone)" },
];

/* ===================================================================
   Application State
   =================================================================== */

/** @type {AppState} */
const state = {
  cards: [...DEFAULT_CARDS],
  filteredCards: [...DEFAULT_CARDS],
  currentIndex: 0,
  flipped: false,
};

/* ===================================================================
   DOM References
   =================================================================== */

/** @type {HTMLInputElement | null} */
const searchInput = document.getElementById("search-input");

/** @type {HTMLButtonElement | null} */
const shuffleBtn = document.getElementById("shuffle-btn");

/** @type {HTMLElement | null} */
const cardCounter = document.getElementById("card-counter");

/** @type {HTMLElement | null} */
const chineseText = document.getElementById("chinese-text");

/** @type {HTMLElement | null} */
const pinyinText = document.getElementById("pinyin-text");

/** @type {HTMLElement | null} */
const englishText = document.getElementById("english-text");

/** @type {HTMLElement | null} */
const cardElement = document.getElementById("card");

/** @type {HTMLElement | null} */
const cardScene = document.getElementById("card-scene");

/** @type {HTMLButtonElement | null} */
const prevBtn = document.getElementById("prev-btn");

/** @type {HTMLButtonElement | null} */
const nextBtn = document.getElementById("next-btn");

/* ===================================================================
   Utility Functions
   =================================================================== */

/**
 * Fisher-Yates shuffle algorithm.
 * @param {FlashCard[]} array - The array to shuffle in place.
 * @returns {void}
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-unused-vars
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* ===================================================================
   Rendering
   =================================================================== */

/**
 * Display the current card in the filtered set.
 * Resets flip state when changing cards.
 * @returns {void}
 */
function renderCard() {
  const cards = state.filteredCards;

  if (cards.length === 0) {
    // No results — clear all text and hide navigation
    chineseText.textContent = "No matches";
    pinyinText.textContent = "";
    englishText.textContent = "";
    cardCounter.textContent = "0 / 0";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  // Clamp index
  if (state.currentIndex >= cards.length) {
    state.currentIndex = cards.length - 1;
  }

  const currentCard = cards[state.currentIndex];

  chineseText.textContent = currentCard.chinese;
  pinyinText.textContent = currentCard.pinyin;
  englishText.textContent = currentCard.english;
  cardCounter.textContent = `${state.currentIndex + 1} / ${cards.length}`;

  // Update button states
  prevBtn.disabled = state.currentIndex === 0 && cards.length <= 1;
  nextBtn.disabled = state.currentIndex === cards.length - 1 && cards.length <= 1;

  // Reset flip
  state.flipped = false;
  cardElement.classList.remove("is-flipped");
}

/**
 * Filter the card deck based on the search query.
 * Matches against chinese, pinyin, and english fields (case-insensitive).
 * @param {string} query - The search term.
 * @returns {void}
 */
function filterCards(query) {
  const normalized = query.toLowerCase().trim();

  if (!normalized) {
    state.filteredCards = [...state.cards];
  } else {
    state.filteredCards = state.cards.filter(
      (card) =>
        card.chinese.includes(normalized) ||
        card.pinyin.toLowerCase().includes(normalized) ||
        card.english.toLowerCase().includes(normalized)
    );
  }

  state.currentIndex = 0;
  renderCard();
}

/* ===================================================================
   Event Handlers
   =================================================================== */

// Flip card on click
cardScene.addEventListener("click", () => {
  state.flipped = !state.flipped;
  cardElement.classList.toggle("is-flipped", state.flipped);
});

// Previous button
prevBtn.addEventListener("click", () => {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    renderCard();
  }
});

// Next button
nextBtn.addEventListener("click", () => {
  if (state.currentIndex < state.filteredCards.length - 1) {
    state.currentIndex++;
    renderCard();
  }
});

// Shuffle button
shuffleBtn.addEventListener("click", () => {
  shuffleArray(state.cards);
  filterCards(searchInput.value);
});

// Search input — live filter on typing
searchInput.addEventListener("input", () => {
  filterCards(searchInput.value);
});

// Keyboard navigation
document.addEventListener("keydown", (event) => {
  if (event.target === searchInput) return; // Don't navigate while typing in search

  switch (event.key) {
    case "ArrowLeft":
      event.preventDefault();
      prevBtn.click();
      break;
    case "ArrowRight":
      event.preventDefault();
      nextBtn.click();
      break;
    case " ":
      event.preventDefault();
      cardScene.click();
      break;
  }
});

/* ===================================================================
   Initialization
   =================================================================== */

renderCard();