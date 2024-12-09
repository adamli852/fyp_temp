const questions = [
    {
        question: "What are the two major festivals celebrated in Hinduism mentioned in the article?",
        options: ["Diwali and Holi","Eid and Christmas","Thanksgiving and New Year","Guru Nanak Jayanti and Vaisakhi"],
        answer: "Diwali and Holi"
    },
    {
        question: "During which month do Muslims observe fasting as part of their religious practices?",
        options: ["Ramadan"," Muharram","Shawwal","Safar"],
        answer: "Ramadan"
    },
    {
        question: "What is the purpose of Gurpurbs in Sikhism?",
        options: ["To celebrate the harvest","To mark the anniversaries of the births or deaths of Gurus","To welcome the New Year","To honor the community service"],
        answer: "To mark the anniversaries of the births or deaths of Gurus"
    },
    {
        question: "Sikhs generally avoid which of the following?",
        options: ["Fish","Alcohol and smoking","Dairy products","Fruits and vegetables" ],
        answer: "Alcohol and smoking"
    },
    {
        question: "What does the turban symbolize in Sikh culture?",
        options: ["Wealth","Spirituality and identity","Political power","Seasonal change"],
        answer: "Spirituality and identity"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const nextButton = document.querySelector('.next-btn');
const resetButton = document.querySelector('.reset-btn');
const resultElement = document.querySelector('.result');

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
    nextButton.classList.remove('hidden');
}

function selectOption(option) {
    const currentQuestion = questions[currentQuestionIndex];
    if (option === currentQuestion.answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.style.display = 'none';
    optionsElement.style.display = 'none';
    nextButton.classList.add('hidden');
    resetButton.classList.remove('hidden');
    resultElement.style.display = 'block';
    resultElement.textContent = `Your score: ${score} out of ${questions.length}`;
}

function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.style.display = 'none';
    questionElement.style.display = 'block';
    optionsElement.style.display = 'block';
    nextButton.classList.remove('hidden');
    resetButton.classList.add('hidden');
    loadQuestion();
}

nextButton.addEventListener('click', loadQuestion);
resetButton.addEventListener('click', resetGame);

loadQuestion();

function getTopicFromURL() {
    // Get the URL parameters
    const params = new URLSearchParams(window.location.search);
    const topicId = params.get('topic'); // Get the value of the 'topic' parameter
    return topicId; // Return the topic ID
}

async function loadTopic() {
    const topicId = getTopicFromURL(); // Retrieve the topic ID

    // Fetch JSON data
    const response = await fetch('topics.json');
    const data = await response.json();

    // Display the relevant topic information
    const topicInfo = data.topics[topicId - 1]; // Assuming topics are 0-indexed
    document.getElementById('topicTitle').innerText = topicInfo.title;
    document.getElementById('topicDescription').innerText = topicInfo.description;
}

window.onload = loadTopic;