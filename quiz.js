function startquiz() {
    insertStudent();
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
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }
    else {
        document.getElementById("msg").innerText = "Name and Phone Number are required";
    }
}