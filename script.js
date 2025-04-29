const cardsData = {
  en: [
    {
      title: "Newton's First Law",
      description: "An object in motion stays in motion unless acted upon by an external force.",
      image: "img/1.png"
    },
    {
      title: "Newton's Second Law",
      description: "Force equals mass times acceleration (F = ma).",
      image: "img/2.png"
    },
    {
      title: "Newton's Third Law",
      description: "For every action, there is an equal and opposite reaction.",
      image: "img/3.png"
    },
    {
      title: "Law of Universal Gravitation",
      description: "Every mass attracts every other mass with a force proportional to the product of their masses.",
      image: "img/4.png"
    },
    {
      title: "Law of Conservation of Energy",
      description: "Energy cannot be created or destroyed, only transformed.",
      image: "img/5.png"
    },
    {
      title: "Ohm's Law",
      description: "Voltage equals current times resistance (V = IR).",
      image: "img/6.png"
    },
    {
      title: "Hooke's Law",
      description: "The force needed to extend or compress a spring is proportional to its extension.",
      image: "img/7.png"
    }
  ],
  ru: [
    {
      title: "Первый закон Ньютона",
      description: "Тело сохраняет состояние покоя или равномерного движения, если на него не действует сила.",
      image: "img/1.png"
    },
    {
      title: "Второй закон Ньютона",
      description: "Сила равна произведению массы на ускорение (F = ma).",
      image: "img/2.png"
    },
    {
      title: "Третий закон Ньютона",
      description: "На каждое действие есть равное и противоположное противодействие.",
      image: "img/3.png"
    },
    {
      title: "Закон всемирного тяготения",
      description: "Каждое тело притягивает другое тело с силой, пропорциональной их массам.",
      image: "img/4.png"
    },
    {
      title: "Закон сохранения энергии",
      description: "Энергия не создаётся и не уничтожается, а только переходит из одной формы в другую.",
      image: "img/5.png"
    },
    {
      title: "Закон Ома",
      description: "Напряжение равно произведению силы тока на сопротивление (V = IR).",
      image: "img/6.png"
    },
    {
      title: "Закон Гука",
      description: "Сила упругости прямо пропорциональна деформации тела.",
      image: "img/7.png"
    }
  ],
  kz: [
    {
      title: "Ньютонның бірінші заңы",
      description: "Дене тыныштық күйінде немесе бірқалыпты қозғалыста болады, егер оған сыртқы күш әсер етпесе.",
      image: "img/1.png"
    },
    {
      title: "Ньютонның екінші заңы",
      description: "Күш массаның үдеуге көбейтіндісіне тең (F = ma).",
      image: "img/2.png"
    },
    {
      title: "Ньютонның үшінші заңы",
      description: "Әрбір әрекетке тең әрі қарама-қарсы қарсы әрекет болады.",
      image: "img/3.png"
    },
    {
      title: "Әлемдік тартылыс заңы",
      description: "Әрбір масса басқа массаны өзіне пропорционалды күшпен тартады.",
      image: "img/4.png"
    },
    {
      title: "Энергияның сақталу заңы",
      description: "Энергия жойылмайды және пайда болмайды, тек бір түрден екінші түрге ауысады.",
      image: "img/5.png"
    },
    {
      title: "Ом заңы",
      description: "Кернеу ток күші мен кедергіге тең (V = IR).",
      image: "img/6.png"
    },
    {
      title: "Гук заңы",
      description: "Серпімділік күші деформацияға пропорционал.",
      image: "img/7.png"
    }
  ]
};  
let currentLang = 'en';
let currentIndex = 0;
let testStarted = false;
let testIndex = 0;
let score = 0;
let testAnswers = [];

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const container = document.getElementById("card-placeholder");
const counter = document.getElementById('card-counter');
const startTestBtn = document.getElementById('startTestBtn');
const testSection = document.getElementById('test-section');
const testCard = document.getElementById('test-card');
const testOptions = document.getElementById('test-options');
const testProgress = document.getElementById('test-progress');
const testScore = document.getElementById('test-score');

function updateCounter() {
  counter.textContent = `${currentIndex + 1} / ${cardsData[currentLang].length}`;
}

function renderCard(index, animationClass = "") {
  container.innerHTML = ""; // Удаляем все старые карточки

  const cardData = cardsData[currentLang][index];

  const card = document.createElement("div");
  card.className = `card ${animationClass}`;
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="${cardData.image}" alt="${cardData.title}">
        <div class="caption">${cardData.title}</div>
      </div>
      <div class="card-back">
        <p>${cardData.description}</p>
      </div>
    </div>
  `;
  container.appendChild(card);

  const cardInner = card.querySelector(".card-inner");
  cardInner.addEventListener("click", () => {
    if (!testStarted) {
      cardInner.classList.toggle("flipped");
    }
  });

  updateCounter();
}

function transitionCard(direction) {
  const oldCard = document.querySelector(".card");
  if (!oldCard) return;

  const outClass = direction === "next" ? "slide-out-left" : "slide-out-right";
  const inClass = direction === "next" ? "slide-in-right" : "slide-in-left";

  oldCard.classList.add(outClass);

  oldCard.addEventListener("animationend", () => {
    currentIndex = (direction === "next")
      ? (currentIndex + 1) % cardsData[currentLang].length
      : (currentIndex - 1 + cardsData[currentLang].length) % cardsData[currentLang].length;
    renderCard(currentIndex, inClass);
  }, { once: true });
}

nextBtn.addEventListener("click", () => { if (!testStarted) transitionCard("next"); });
backBtn.addEventListener("click", () => { if (!testStarted) transitionCard("back"); });

document.querySelectorAll('[data-lang]').forEach(button => {
  button.addEventListener('click', () => {
    if (!testStarted) {
      currentLang = button.getAttribute('data-lang');
      currentIndex = 0;
      renderCard(currentIndex, "slide-in-right");
    }
  });
});

function startTest() {
  testStarted = true;
  container.innerHTML = "";
  counter.textContent = "";
  document.querySelector(".buttons").style.display = "none";
  document.querySelector(".lang-switcher").style.display = "none";
  document.querySelector(".test-start").style.display = "none";
  testSection.classList.remove('hidden');
  testIndex = 0;
  score = 0;
  testAnswers = [];
  renderTestQuestion();
}

function renderTestQuestion() {
  if (testIndex >= cardsData[currentLang].length) {
    showTestResults();
    return;
  }

  testCard.innerHTML = "";
  testOptions.innerHTML = "";

  const cardData = cardsData[currentLang][testIndex];

  const card = document.createElement("div");
  card.className = "card slide-in-right";
  card.innerHTML = `<div class="card-front"><div class="caption">${cardData.title}</div></div>`;
  testCard.appendChild(card);

  const options = shuffle([
    cardData.description,
    ...getRandomDescriptions(3, cardData.description)
  ]);

  options.forEach(optionText => {
    const optionButton = document.createElement("button");
    optionButton.className = "option-button";
    optionButton.textContent = optionText;
    optionButton.addEventListener('click', () => selectAnswer(optionButton, optionText, cardData.description));
    testOptions.appendChild(optionButton);
  });
}

function selectAnswer(button, selected, correct) {
  const card = testCard.querySelector('.card');

  if (selected === correct) {
    button.classList.add('correct-answer');
    testAnswers.push(true);
    score++;
  } else {
    button.classList.add('wrong-answer');
    testAnswers.push(false);
  }

  const allButtons = testOptions.querySelectorAll('button');
  allButtons.forEach(btn => btn.disabled = true);

  setTimeout(() => {
    card.classList.add('slide-out-left');
    card.addEventListener("animationend", () => {
      testIndex++;
      renderTestQuestion();
    }, { once: true });
  }, 800);

  updateProgress();
}

function getRandomDescriptions(count, exclude) {
  const descriptions = cardsData[currentLang].map(c => c.description).filter(d => d !== exclude);
  return shuffle(descriptions).slice(0, count);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function updateProgress() {
  testProgress.innerHTML = "";
  testAnswers.forEach(ans => {
    const bar = document.createElement('div');
    bar.className = 'progress-item';
    bar.classList.add(ans ? 'correct' : 'wrong');
    testProgress.appendChild(bar);
  });
}

function showTestResults() {
  testScore.textContent = `Your Score: ${score} / ${cardsData[currentLang].length}`;
}

startTestBtn.addEventListener('click', startTest);
renderCard(currentIndex);