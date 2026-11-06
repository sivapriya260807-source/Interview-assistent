let questions = [];

let currentIndex = 0;

let score = 0;

let time = 60;

let timer;

let currentQuestion;
async function startQuiz() {

    let category =
        document.getElementById("category").value;

    let amount =
        document.getElementById("amount").value;


    let url =
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`;


    try {

        let response = await fetch(url);

        let data = await response.json();

        questions = data.results;

        currentIndex = 0;

        score = 0;

        document.getElementById("score").innerText = score;

        document.getElementById("quiz").style.display = "block";

        document.getElementById("result").style.display = "none";

        showQuestion();

    }

    catch (error) {

        alert("Unable to get questions from API.");

        console.log(error);

    }

}

function showQuestion() {

    clearInterval(timer);


    currentQuestion =
        questions[currentIndex];


    document.getElementById("question").innerHTML =
        currentQuestion.question;


    document.getElementById("hint").innerText = "";

    document.getElementById("correctAnswer").innerText = "";


    document.getElementById("questionNumber").innerText =

        `Question ${currentIndex + 1}/${questions.length}`;


    let percentage =

        ((currentIndex + 1) / questions.length) * 100;


    document.getElementById("progress").style.width =

        percentage + "%";


    createAnswers();

    startTimer();

}

function createAnswers() {

    let box =
        document.getElementById("answers");

    box.innerHTML = "";


    let answers = [

        currentQuestion.correct_answer,

        ...currentQuestion.incorrect_answers

    ];


    answers.sort(() => Math.random() - 0.5);


    answers.forEach(answer => {

        let button =
            document.createElement("button");


        button.className = "answer-btn";


        button.innerHTML = answer;


        button.onclick = function () {

            checkAnswer(answer);

        };


        box.appendChild(button);

    });

}

function checkAnswer(answer) {

    if (answer === currentQuestion.correct_answer) {

        score++;

        document.getElementById("score").innerText = score;

        alert("✅ Correct!");

    }

    else {

        alert("❌ Wrong!");

    }

}

function startTimer() {

    time = 60;

    document.getElementById("timer").innerText = time;


    timer = setInterval(function () {

        time--;

        document.getElementById("timer").innerText = time;


        if (time <= 0) {

            clearInterval(timer);

            alert("⏰ Time's Up!");

        }

    }, 1000);

}


function showHint() {

    document.getElementById("hint").innerText =

        "💡 Think carefully about the question!";

}

function showAnswer() {

    document.getElementById("correctAnswer").innerText =

        "✅ Answer: " +
        currentQuestion.correct_answer;

}

function nextQuestion() {

    clearInterval(timer);

    currentIndex++;


    if (currentIndex >= questions.length) {

        finishQuiz();

    }

    else {

        showQuestion();

    }

}

function finishQuiz() {

    clearInterval(timer);


    document.getElementById("quiz").style.display = "none";

    document.getElementById("result").style.display = "block";


    document.getElementById("finalScore").innerText =

        `${score}/${questions.length}`;


    let percentage =

        (score / questions.length) * 100;


    if (percentage >= 80) {

        document.getElementById("performance").innerText =

            "Excellent! 🎉";

    }

    else if (percentage >= 50) {

        document.getElementById("performance").innerText =

            "Good! Keep practicing 👍";

    }

    else {

        document.getElementById("performance").innerText =

            "Keep practicing! 💪";

    }

}
function bookmarkQuestion() {

    let bookmarks =

        JSON.parse(
            localStorage.getItem("bookmarks")
        ) || [];


    bookmarks.push(
        currentQuestion.question
    );


    localStorage.setItem(

        "bookmarks",

        JSON.stringify(bookmarks)

    );


    displayBookmarks();


    alert("⭐ Question bookmarked!");

}

function displayBookmarks() {

    let bookmarks =

        JSON.parse(
            localStorage.getItem("bookmarks")
        ) || [];


    let box =
        document.getElementById("bookmarks");


    if (bookmarks.length === 0) {

        box.innerText = "No bookmarks yet.";

        return;

    }


    box.innerHTML = "";


    bookmarks.forEach(question => {

        let div =
            document.createElement("div");


        div.className =
            "history-item";


        div.innerText =
            "⭐ " + question;


        box.appendChild(div);

    });

}

function saveHistory() {

    let history =

        JSON.parse(
            localStorage.getItem("history")
        ) || [];


    history.push({

        score: score,

        total: questions.length,

        date: new Date().toLocaleDateString()

    });


    localStorage.setItem(

        "history",

        JSON.stringify(history)

    );
    displayHistory();


    alert("✅ Result saved!");

}

function displayHistory() {

    let history =

        JSON.parse(
            localStorage.getItem("history")
        ) || [];

    let box =
        document.getElementById("historyList");

    if (history.length === 0) {

        box.innerText =
            "No previous attempts.";

        return;

    }


    box.innerHTML = "";


    history.forEach(item => {

        let div =
            document.createElement("div");
        div.className =
            "history-item";
        div.innerText =

            `${item.date} → ${item.score}/${item.total}`;
        box.appendChild(div);
    });
}
function toggleDarkMode() {

    document.body.classList.toggle("dark");
    if (
        document.body.classList.contains("dark")
    ) {

        document.getElementById("darkBtn").innerText =
            "☀️ Light Mode";

    }
    else {

        document.getElementById("darkBtn").innerText =
            "🌙 Dark Mode";

    }

}
function restartQuiz() {

    document.getElementById("result").style.display =
        "none";

    startQuiz();

}
displayHistory();
displayBookmarks();