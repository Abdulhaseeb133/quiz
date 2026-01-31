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

    ShowNextQuestion();
}

// ...existing code...

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUp();
            // This already calls NextQuestion(), so remove the duplicate below
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

    // Hide quiz questions
    document.getElementById("quiz-question").style.display = "none";
    document.getElementById("timer").style.display = "none";

    // Show result
    const percentage = (score / questions.length) * 100;
    const resultHTML = `
        <div style="text-align: center; margin-top: 50px;">
            <h1>Quiz Completed!</h1>
            <h2>Your Score: ${score} / ${questions.length}</h2>
            <h2>Percentage: ${percentage.toFixed(2)}%</h2>
            <p style="font-size: xx-large; margin-top: 30px;">
                ${percentage >= 70 ? '🎉 Congratulations! You Passed!' : '😔 Keep Learning!'}
            </p>
            <button onclick="location.reload()" style="margin-top: 30px; padding: 15px 30px; font-size: large; cursor: pointer;">
                Restart Quiz
            </button>
        </div>
    `;

    document.body.innerHTML += resultHTML;
}

// ...existing code...
// when last question is display, then need a logic for ->

// next button not show
// show a button to show score and  finish the quiz
//