const questions = [
    {
        question: "What are the two major festivals celebrated in Hinduism mentioned in the article?",
        options: ["Diwali and Holi", "Eid and Christmas", "Thanksgiving and New Year", "Guru Nanak Jayanti and Vaisakhi"],
        answer: "Diwali and Holi",
        explanation: "The festivals mentioned are Diwali and Holi. Diwali symbolizes the victory of light over darkness and is celebrated with lamps, while Holi marks the arrival of spring and the triumph of good over evil, celebrated with colored powders."
    },
    {
        question: "During which month do Muslims observe fasting as part of their religious practices?",
        options: ["Ramadan", "Muharram", "Shawwal", "Safar"],
        answer: "Ramadan",
        explanation: "Ramadan is the ninth month of the Islamic lunar calendar, during which Muslims fast from dawn to sunset."
    },
    {
        question: "What is the purpose of Gurpurbs in Sikhism?",
        options: ["To celebrate the harvest", "To mark the anniversaries of the births or deaths of Gurus", "To welcome the New Year", "To honor the community service"],
        answer: "To mark the anniversaries of the births or deaths of Gurus",
        explanation: "Gurpurbs commemorate the anniversaries of the births or deaths of the ten Sikh Gurus."
    },
    {
        question: "Sikhs generally avoid which of the following?",
        options: ["Fish", "Alcohol and smoking", "Dairy products", "Fruits and vegetables"],
        answer: "Alcohol and smoking",
        explanation: "Sikhs are generally advised to avoid alcohol and smoking."
    },
    {
        question: "What does the turban symbolize in Sikh culture?",
        options: ["Wealth", "Spirituality and identity", "Political power", "Seasonal change"],
        answer: "Spirituality and identity",
        explanation: "The turban represents spirituality, identity, and equality in Sikh culture."
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const nextButton = document.querySelector('.next-btn');
const resetButton = document.querySelector('.reset-btn');
const explanationBox = document.getElementById('explanationBox');
const explanationText = document.getElementById('explanationText');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        li.classList.add('list-group-item', 'list-group-item-action');
        li.addEventListener('click', () => selectOption(option));
        optionsElement.appendChild(li);
    });
    nextButton.classList.add('d-none');
    explanationBox.style.display = 'none'; // Hide explanation initially
}

function selectOption(option) {
    const currentQuestion = questions[currentQuestionIndex];
    if (option === currentQuestion.answer) {
        score++;
    }
    showExplanation(currentQuestion.explanation);
    nextButton.classList.remove('d-none'); // Show next button after selection
}

function showExplanation(explanation) {
    explanationText.textContent = explanation;
    explanationBox.style.display = 'block'; // Show explanation box
}

function showResult() {
    questionElement.style.display = 'none';
    optionsElement.style.display = 'none';
    nextButton.classList.add('d-none');
    resetButton.classList.remove('d-none');
    explanationBox.style.display = 'none'; // Hide explanation box
    resultElement.textContent = `Your score: ${score} out of ${questions.length}`;
}

function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.style.display = 'none';
    questionElement.style.display = 'block';
    optionsElement.style.display = 'block';
    nextButton.classList.add('d-none');
    resetButton.classList.add('d-none');
    loadQuestion();
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

resetButton.addEventListener('click', resetGame);

loadQuestion();