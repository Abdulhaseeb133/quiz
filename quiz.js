var index = 0;
var score = 0;
var questions = [];

function startquiz() {
    // insertStudent();
    GetQuestions();



}


function insertStudent() {
    var name = document.getElementById("name").value;
    var phonenumber = document.getElementById("num").value;

    if (name && phonenumber) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "name": name,
            "phone_number": phonenumber
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:3000/students", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);

            })
            .catch((error) => console.error(error));
    }
    else {
        document.getElementById("msg").innerText = "Name and Phone Number are required";
    }
}

function GetQuestions() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:3000/questions", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            questions = JSON.parse(result);
            document.getElementById("quiz-question").style.display = "block";
            document.getElementById("start-quiz").style.display = "none";
            ShowNextQuestion();
        })
        .catch((error) => console.error(error));

}

function ShowNextQuestion() {

    document.getElementById("question").innerText = questions[index].question;

    document.getElementById("optA").innerText = questions[index].A;
    document.getElementById("optB").innerText = questions[index].B;
    document.getElementById("optC").innerText = questions[index].C;
    document.getElementById("optD").innerText = questions[index].D;
}

function NextQuestion() {
    Score();
    index++;
    ShowNextQuestion();
}

function Score() {
    const user_ans = document.querySelector('input[name="answer"]:checked').value;
    if (user_ans == questions[index].correct_answer) {
        score++;
    }
}

function startquiz() {
    // insertStudent();
    GetQuestions();
    startTimer(); // Start timer when quiz starts
}

// ...existing code...

var timerInterval;
var timeLeft = 30;

function startTimer() {
    timeLeft = 30;
    document.getElementById("timer").innerText = timeLeft + " sec";
    timerInterval = setInterval(function () {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft + " sec";
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            trigger();
        }
    }, 1000);
}

function trigger() {
    alert("Time's up!");
}

function ShowNextQuestion() {
    document.getElementById("question").innerText = questions[index].question;
    document.getElementById("optA").innerText = questions[index].A;
    document.getElementById("optB").innerText = questions[index].B;
    document.getElementById("optC").innerText = questions[index].C;
    document.getElementById("optD").innerText = questions[index].D;

    // Show Next button only if not last question
    const nextBtn = document.querySelector('input[value="Next"]');
    if (index < questions.length - 1) {
        nextBtn.style.display = "inline-block";
    } else {
        nextBtn.style.display = "none";
    }
}

function NextQuestion() {
    Score();
    index++;
    if (index < questions.length) {
        ShowNextQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval); // Stop timer
    document.getElementById("quiz-question").style.display = "none";
    document.getElementById("timer").style.display = "none";
    // Create result page
    const resultDiv = document.createElement("div");
    resultDiv.innerHTML = `
        <h2>Quiz Finished!</h2>
        <p>Your Score: ${score} / ${questions.length}</p>
    `;
    document.body.appendChild(resultDiv);
}


var index = 0;
var score = 0;
var questions = [];
var userAnswers = []; // Track user answers

function Score() {
    const checked = document.querySelector('input[name="answer"]:checked');
    let user_ans = "";
    if (checked) {
        user_ans = checked.value;
    }
    userAnswers[index] = user_ans; // Save user's answer
    if (user_ans == questions[index].correct_answer) {
        score++;
    }
}

// ...existing code...

function trigger() {
    alert("Time's up!");
    endQuiz();
}