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

function GetQuestions(){
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

function ShowNextQuestion(){

    document.getElementById("question").innerText = questions[index].question;

    document.getElementById("optA").innerText = questions[index].A;
    document.getElementById("optB").innerText = questions[index].B;
    document.getElementById("optC").innerText = questions[index].C;
    document.getElementById("optD").innerText = questions[index].D;
}

function NextQuestion(){   
    Score();
    index++;
    ShowNextQuestion();
}

function Score(){
    const user_ans = document.querySelector('input[name="answer"]:checked').value;
    if(user_ans == questions[index].correct_answer){
        score++;
    }
}

// when last question is display, then need a logic for -> 

// next button not show
// show a button to show score and  finish the quiz 
//