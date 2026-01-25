const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
app.use(cors());
app.use(bodyParser.json());




function checkDbConnection() {
    db.query("SELECT 1", (error) => {
        if (error) {
            console.error("Unable to connect to the database:", error);
        } else {
            console.log("Database connection successful!");
        }
    });
}

checkDbConnection();



app.post('/students', async (req, res) => {

    const { name, phone_number } = req.body;

    // 1️⃣ Validate input
    if (!name || !phone_number) {
        return res.status(400).json({
            message: "Name and phone number are required"
        });
    }

    // 3️⃣ Insert user
    const sql = `
            INSERT INTO student(name, phone_number)
            VALUES (?, ?)
        `;

    db.query(
        sql,
        [name, phone_number],
        (error, result) => {
            if (error) {
                // Duplicate username/email
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        message: " or email already exists"
                    });
                }
                return res.status(500).json({ message: "Server error", error: error.message });
            }

            res.status(201).json({
                message: "User registered successfully",
                student_id: result.insertId
            });
        }
    );


});
app.get('/questions', (req, res) => {
    db.query(
        'SELECT * FROM quiz_question',
        (error, rows) => {
            if (error) {
                console.error('Error fetching questions:', error);
                return res.status(500).json({ error: 'Failed to fetch questions' });
            }
            res.json(rows);
        }
    );
});
app.get('/students', (req, res) => {
    db.query(
        "select * from student",
        (error, students) => {
            if (error) {
                console.error("Error fetching students:", error);
                return res.status(500).json({ error: "Failed to fetch students" });
            }
            res.json(students);
        }
    );
});


// ------------------ START SERVER ------------------


app.listen(3000, () => {
    console.log("Server running on port 3000");
});