const questions = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Paris",
            b: "London",
            c: "Berlin"
        },
        correctAnswer: "a"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: {
            a: "Earth",
            b: "Mars",
            c: "Venus"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the largest mammal in the world?",
        answers: {
            a: "Elephant",
            b: "Blue Whale",
            c: "Giraffe"
        },
        correctAnswer: "b"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: {
            a: "Oxygen",
            b: "Carbon Dioxide",
            c: "Nitrogen"
        },
        correctAnswer: "b"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: {
            a: "William Shakespeare",
            b: "Charles Dickens",
            c: "Jane Austen"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the largest organ in the human body?",
        answers: {
            a: "Heart",
            b: "Brain",
            c: "Skin"
        },
        correctAnswer: "c"
    },
    {
        question: "Which gas do humans breathe out?",
        answers: {
            a: "Oxygen",
            b: "Carbon Dioxide",
            c: "Nitrogen"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: {
            a: "Go",
            b: "Gd",
            c: "Au"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the largest ocean in the world?",
        answers: {
            a: "Atlantic Ocean",
            b: "Indian Ocean",
            c: "Pacific Ocean"
        },
        correctAnswer: "c"
    },
    {
        question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
        answers: {
            a: "Venus",
            b: "Mars",
            c: "Jupiter"
        },
        correctAnswer: "a"
    }
];

let currentQuestion = 0;
let score = 0;
let timer = 20; // Extended timer value in seconds
let timerInterval;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("next-button");
const resultContainer = document.querySelector(".result-container");

// Function to display the current question
function displayQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = `Question ${currentQuestion + 1}: ${current.question}`;
    
    answersElement.innerHTML = "";
    for (const option in current.answers) {
        const answer = current.answers[option];
        answersElement.innerHTML += `<li><input type="radio" name="q${currentQuestion}" value="${option}"> ${option}) ${answer}</li>`;
    }
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer === 0) {
            clearInterval(timerInterval);
            checkAnswer();
        }
    }, 1000);
}

// Function to check the selected answer
function checkAnswer() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    if (selectedOption) {
        const selectedAnswer = selectedOption.value;
        const current = questions[currentQuestion];
        
        if (selectedAnswer === current.correctAnswer) {
            score++;
        }
        
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            displayQuestion();
            timer = 20; // Reset the timer for the next question
            timerElement.textContent = timer;
            startTimer();
        } else {
            displayFinalScore();
        }
    }
}

// Function to display the final score
function displayFinalScore() {
    resultContainer.style.display = "block";
    resultContainer.innerHTML = `<p>Your score: <span id="score">${score}</span> out of ${questions.length}</p>`;
    clearInterval(timerInterval);
    nextButton.style.display = "none";
}

// Initial setup
displayQuestion();
startTimer();

// Event listener for the "Next" button
nextButton.addEventListener("click", checkAnswer);
const notesList = document.getElementById("notes-list");
const noteInput = document.getElementById("note-input");
const addNoteButton = document.getElementById("add-note-button");
// Function to get notes from local storage
function getNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    return notes;
}

// Function to save notes to local storage
function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to add a new note
function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();

    if (noteText === '') {
        alert('Please enter a valid note.');
        return;
    }

    const notes = getNotes();
    notes.push(noteText);
    saveNotes(notes);

    noteInput.value = '';
    displayNotes();
}

// Function to delete a note
function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    displayNotes();
}

// Function to display notes
function displayNotes() {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = '';

    const notes = getNotes();
    notes.forEach((note, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${note}
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        noteList.appendChild(listItem);
    });
}

// Initial display of notes
displayNotes();
