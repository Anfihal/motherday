const foods = {
    porridge: { reaction: "ммм... вкусненько!", mood: "happy", img: "baby-happy.png" },
    cookie: { reaction: "ура! любимое!", mood: "happy", img: "baby-happy.png" },
    soup: { reaction: "тёплый и ароматный — спасибо, мама!", mood: "happy", img: "baby-happy.png" },
    carrot: { reaction: "фу... не хочу!", mood: "sad", img: "baby-sad.png" },
    broccoli: { reaction: "эээ... нет!", mood: "crying", img: "baby-crying.png" },
    chips: { reaction: "ой, нельзя!", mood: "sad", img: "baby-sad.png" }
};

let attempts = 0;
const maxAttempts = 3;
let lovePoints = 0;

const foodsContainer = document.getElementById('foods');
const babyImg = document.getElementById('baby');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart');

foodsContainer.addEventListener('click', (e) => {
    if (attempts >= maxAttempts) return;

    const foodCard = e.target.closest('.food-card');
    if (!foodCard || !foodCard.dataset.food) return;

    const foodKey = foodCard.dataset.food;
    const food = foods[foodKey];

    babyImg.className = 'baby';
    babyImg.src = `images/${food.img}`;
    babyImg.classList.add(food.mood);

    resultDiv.textContent = `Малыш говорит: "${food.reaction}"`;

    if (food.mood === 'happy') {
        lovePoints++;
    }

    attempts++;

    if (attempts >= maxAttempts) {
        document.querySelectorAll('.food-card').forEach(card => {
            card.style.pointerEvents = 'none';
            card.style.opacity = '0.65';
        });
        setTimeout(showFinalResult, 1500);
    }
});

function showFinalResult() {
    if (lovePoints >= 2) {
        resultDiv.innerHTML = "🎉 Малыш обнимает тебя и говорит:<br><strong>«Лучшая мама на свете!»</strong> 💖";
        babyImg.src = "images/baby-happy.png";
        babyImg.className = "baby happy";
    } else {
        resultDiv.textContent = "Малыш всё равно тебя любит... но в следующий раз приготовь что-то вкусненькое! 💕";
        babyImg.src = "images/baby-sad.png";
        babyImg.className = "baby sad";
    }
    restartBtn.style.display = 'inline-block';
}

restartBtn.addEventListener('click', () => {
    attempts = 0;
    lovePoints = 0;
    resultDiv.textContent = '';
    babyImg.src = "images/baby-happy.png";
    babyImg.className = "baby";
    document.querySelectorAll('.food-card').forEach(card => {
        card.style.pointerEvents = 'auto';
        card.style.opacity = '1';
    });
    restartBtn.style.display = 'none';
});