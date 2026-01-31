-- =========================
-- Database setup
-- =========================
DROP DATABASE IF EXISTS quiz_db;
CREATE DATABASE quiz_db;
USE quiz_db;

SET FOREIGN_KEY_CHECKS = 0;

-- =========================
-- Student table (FIRST)
-- =========================
DROP TABLE IF EXISTS student;
CREATE TABLE student (
  student_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45),
  phone_number VARCHAR(45),
  PRIMARY KEY (student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO student (student_id, name, phone_number) VALUES
(1,'Aarav Sharma','9876543210'),
(2,'Ananya Verma','9123456780'),
(3,'Rohan Gupta','9988776655'),
(4,'Priya Singh','9090909090'),
(5,'Kabir Mehta','9345678123'),
(6,'Sneha Patel','9567891234'),
(7,'Aditya Kumar','9012345678'),
(8,'Neha Jain','9888123456'),
(9,'Arjun Malhotra','9234567812'),
(10,'Ishita Roy','9797979797'),
(11,'Pande Verma','91542454610'),
(12,'Haseeb','0987654321');

-- =========================
-- Quiz Question table
-- =========================
DROP TABLE IF EXISTS quiz_question;
CREATE TABLE quiz_question (
  question_id INT NOT NULL,
  question VARCHAR(500),
  A VARCHAR(45),
  B VARCHAR(45),
  C VARCHAR(45),
  D VARCHAR(45),
  correct_answer VARCHAR(45),
  PRIMARY KEY (question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO quiz_question VALUES
(1,'What number comes next in the sequence: 3, 6, 9, 12, ?','13','14','15','16','C'),
(2,'Which one is the odd one out?','Dog','Cat','Cow','Car','D'),
(3,'If 5 + 3 = 28, then 9 + 1 = ?','10','20','90','19','C'),
(4,'What comes next: 2, 4, 8, 16, ?','18','24','30','32','D'),
(5,'Which shape has 5 sides?','Square','Triangle','Pentagon','Hexagon','C'),
(6,'If today is Monday, what day will it be after 3 days?','Tuesday','Wednesday','Thursday','Friday','C'),
(7,'Which number is the largest?','0','-10','5','1','C'),
(8,'Find the missing letter: A, C, E, G, ?','H','I','J','K','B'),
(9,'Which object is used to measure time?','Ruler','Scale','Clock','Thermometer','C'),
(10,'If all Roses are flowers and some flowers fade quickly, are all roses flowers?','Yes','No','Only some','Cannot be determined','A');

-- =========================
-- Quiz Result table (LAST)
-- =========================
DROP TABLE IF EXISTS quiz_result;
CREATE TABLE quiz_result (
  result_id INT NOT NULL,
  student_id INT,
  save VARCHAR(45),
  attempt_time DATETIME,
  PRIMARY KEY (result_id),
  CONSTRAINT fk_student_id
    FOREIGN KEY (student_id)
    REFERENCES student(student_id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
