var index = 0;
var score = 0;
var questions = [];
var timer;
var timeLeft = 30; // seconds
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
            document.getElementById("timer").style.display = "block";
            document.getElementById("progress-container").style.display = "block";
            updateProgressBar();
            ShowNextQuestion();
            startTimer();
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

    // Check if this is the last question
    if (index >= questions.length) {
        endQuiz();
        return;
    }

    // Uncheck all radio buttons
    const radios = document.querySelectorAll('input[name="answer"]');
    radios.forEach(radio => {
        radio.checked = false;
    });

    clearInterval(timer);
    timeLeft = 30;
    startTimer();

    updateProgressBar();
    ShowNextQuestion();
}

function updateProgressBar() {
    const progress = ((index + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
    document.getElementById("progress-text").innerText = `Question ${index + 1} of ${questions.length}`;
}

// ...existing code...

function startTimer() {
    const timerElement = document.getElementById("timer");
    timerElement.classList.remove("warning");

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time Left: ${timeLeft}s`;

        // Add warning class when time is low
        if (timeLeft <= 10) {
            timerElement.classList.add("warning");
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}
function timeUp() {
    alert("Time is up for this question!");
    NextQuestion();
}
function Score() {
    const checkanswer = document.querySelector('input[name="answer"]:checked');

    if (checkanswer) {
        const user_ans = checkanswer.value;
        console.log(user_ans);
        if (user_ans == questions[index].correct_answer) {
            score++;
        }
    }

}

function endQuiz() {
    // Stop the timer
    clearInterval(timer);

    // Hide quiz questions, timer, and progress bar
    document.getElementById("quiz-question").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("progress-container").style.display = "none";

    // Show result section
    document.getElementById("result").style.display = "block";

    // Calculate and display score
    const percentage = (score / questions.length) * 100;
    document.getElementById("final-score").innerText = `${score}/${questions.length}`;
    document.getElementById("percentage").innerText = percentage.toFixed(1);

    // Show message based on score
    const messageElement = document.getElementById("result-message");
    if (percentage >= 70) {
        messageElement.innerText = "🎉 Congratulations! You Passed!";
        messageElement.className = "message pass";
    } else {
        messageElement.innerText = "😔 Keep Learning! You can do better!";
        messageElement.className = "message fail";
    }
}

// ...existing code...
// when last question is display, then need a logic for ->

// next button not show
// show a button to show score and  finish the quiz
//