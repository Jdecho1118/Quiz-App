const questions = [
    {
        question : "Which OSI model layer is responsible for routing and forwarding of data?",
        answers:[
            { Text : " Physical Layer " , correct : false },
            { Text : " Network Layer " , correct : true },
            { Text : "  Data Link Layer " , correct : false },
            { Text : "  Transport Layer " , correct : false },
        ]
    },
    {
        question : "In object-oriented programming, what is the term for the ability of a class to have multiple methods with the same name but different parameters?",
        answers:[
            { Text : "  Polymorphism " , correct : true },
            { Text : " Encapsulation " , correct : false },
            { Text : "  Inheritance " , correct : false },
            { Text : "  Abstraction " , correct : false },
        ]
    },
    {
        question : "What is the purpose of an SQL JOIN operation?",
        answers:[
            { Text : "  Combine rows from two or more tables based on a related column " , correct : true },
            { Text : " Create a new table by merging data from multiple databases " , correct : false },
            { Text : "  Filter rows in a table based on a specific condition " , correct : false },
            { Text : "  Sort rows in a table in ascending or descending order " , correct : false },
        ]
    },
    {
        question : "What is a zero-day vulnerability?",
        answers:[
            { Text : "  A vulnerability that has been known for zero days" , correct : false },
            { Text : "  A security measure that blocks all incoming traffic" , correct : false },
            { Text : "  A type of antivirus software " , correct : false },
            { Text : "  A security hole in software that is unknown to the vendor " , correct : true },
        ]
    },
    {
        question : "Which of the following is not a valid MIME type for a web page?",
        answers:[
            { Text : "  text/html" , correct : false },
            { Text : "  application/json" , correct : false },
            { Text : "  audio/mp3 " , correct : true },
            { Text : "  image/png " , correct : false },
        ]
    },
    {
        question : "What does the acronym IaaS stand for in the context of cloud computing?",
        answers:[
            { Text : "  Internet as a Service" , correct : false },
            { Text : "   Infrastructure as a Service" , correct : true },
            { Text : "   Integration as a Service " , correct : false },
            { Text : "   Information as a Service " , correct : false },
        ]
    },
    {
        question : "What is the purpose of the chmod command in Unix/Linux?",
        answers:[
            { Text : "  Change system time" , correct : false },
            { Text : "  Change file permissions" , correct : true },
            { Text : "  Change the owner of a file " , correct : false },
            { Text : "   Change the file extension " , correct : false },
        ]
    },
    {
        question : "Which programming language is commonly used for developing Android applications?",
        answers:[
            { Text : " Java" , correct : true },
            { Text : "  Swift " , correct : false },
            { Text : "  Objective-C " , correct : false },
            { Text : "  C# " , correct : false },
        ]
    },
    {
        question : "What is the time complexity of searching for an element in a binary search tree (BST) with n nodes?",
        answers:[
            { Text : "  O(1)" , correct : false },
            { Text : "  O(n)" , correct : false },
            { Text : "  O(n log n) " , correct : false },
            { Text : "  O(log n) " , correct : true },
        ]
    },
    {
        question : "What is the purpose of the Git version control system?",
        answers:[
            { Text : "  Manage and track changes in source code" , correct : true },
            { Text : "  Create graphical user interfaces" , correct : false },
            { Text : "  Monitor system performance " , correct : false },
            { Text : "  Design user interfaces " , correct : false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.answers.forEach (answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
       handleNextButton(); 
    }else{
        startQuiz();
    }
});


startQuiz();
