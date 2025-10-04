const quizData = [
  {
    question: "The Zama Creator Program is run by which type of company?",
    a: "AI-powered marketing company",
    b: "Open-source cryptography company",
    c: "Social media platform",
    d: "Blockchain gaming company",
    correct: "b"
  },
  {
    question: "What is the main focus of the Zama Creator Program?",
    a: "Quantity of content",
    b: "Genuine educational contributions",
    c: "Viral social media posts",
    d: "Paid advertisements",
    correct: "b"
  },
  {
    question: "What is the maximum monthly reward for top creators?",
    a: "$10,000",
    b: "$25,000",
    c: "$56,000",
    d: "$100,000",
    correct: "c"
  },
  {
    question: "In Season 3, what NFT is given to the top 1,000 creators?",
    a: "Zama NFT 001",
    b: "Zama OG 003",
    c: "FHE Collector NFT",
    d: "Crypto Creator NFT",
    correct: "b"
  },
  {
    question: "What educational support is available in the program?",
    a: "Pre-written blogs",
    b: "Library of clips, podcast segments, and technical demonstrations",
    c: "Free webinars only",
    d: "Paid video courses",
    correct: "b"
  },
  {
    question: "What is the purpose of community engagement in the program?",
    a: "Social media marketing",
    b: "Building a network of creators passionate about confidential blockchain technology",
    c: "Selling NFTs",
    d: "Fundraising",
    correct: "b"
  },
  {
    question: "Which platform is used to participate in the Zama Creator Program?",
    a: "Discord",
    b: "Guild.xyz",
    c: "Twitter",
    d: "Medium",
    correct: "b"
  },
  {
    question: "What is the main difference between the Zama Creator Program and traditional airdrops?",
    a: "Rewards are given weekly",
    b: "Focus on genuine contributions instead of quantity",
    c: "Only for influencers",
    d: "Only crypto trading knowledge required",
    correct: "b"
  },
  {
    question: "What benefit do creators get through seasonal recognition?",
    a: "Paid internship",
    b: "Early access to alpha features",
    c: "Free merchandise",
    d: "Exclusive chat access",
    correct: "b"
  },
  {
    question: "Who can participate in the Zama Creator Program?",
    a: "Only developers",
    b: "Anyone producing high-quality educational content about Zama and FHE",
    c: "Only NFT collectors",
    d: "Only investors",
    correct: "b"
  }
];

const quiz = document.getElementById('quiz');
const submitBtn = document.getElementById('submit');
const result = document.getElementById('result');
const leaderboardList = document.getElementById('leaderboardList');
const correctSound = document.getElementById('correctSound');

let startTime;

function loadQuiz() {
  quiz.innerHTML = '';
  startTime = new Date();
  quizData.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
      <p><strong>${index + 1}. ${q.question}</strong></p>
      <div class="options">
        <label><input type="radio" name="q${index}" value="a"> ${q.a}</label>
        <label><input type="radio" name="q${index}" value="b"> ${q.b}</label>
        <label><input type="radio" name="q${index}" value="c"> ${q.c}</label>
        <label><input type="radio" name="q${index}" value="d"> ${q.d}</label>
      </div>
    `;
    quiz.appendChild(questionDiv);
  });
}

submitBtn.addEventListener('click', () => {
  let score = 0;
  quizData.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if(selected && selected.value === q.correct){
      score++;
      correctSound.play();
    }
  });

  const endTime = new Date();
  const timeTaken = Math.round((endTime - startTime)/1000); // seconds

  result.innerHTML = `You scored ${score} out of ${quizData.length} in ${timeTaken} seconds!`;

  // Save to leaderboard in localStorage
  const leaderboard = JSON.parse(localStorage.getItem('zamaLeaderboard')) || [];
  leaderboard.push({score, time: timeTaken});
  leaderboard.sort((a,b) => b.score - a.score || a.time - b.time); // high score first, then faster
  localStorage.setItem('zamaLeaderboard', JSON.stringify(leaderboard));

  displayLeaderboard();
});

function displayLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem('zamaLeaderboard')) || [];
  leaderboardList.innerHTML = '';
  leaderboard.slice(0, 10).forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = `${index+1}. Score: ${entry.score}, Time: ${entry.time}s`;
    leaderboardList.appendChild(li);
  });
}

loadQuiz();
displayLeaderboard();
