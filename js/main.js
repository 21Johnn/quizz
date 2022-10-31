// variables
const question = document.querySelector("#question");
const answerBox = document.querySelector("#answer-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// questions
const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
    {
        "question": "Qual a sintaxe correta do CSS?",
        "answers": [
          {
            "answer": "backgroundColor: ####,",
            "correct": false
          },
          {
            "answer": "background-color: ####,",
            "correct": true
          },
          {
            "answer": "beckground-color: ####,",
            "correct": false
          },
          {
            "answer": "background-color = ####,",
            "correct": false
          },
        ]
      },
      {
        "question": "Qual das opções NÃO é um tipo de dado em JS",
        "answers": [
          {
            "answer": "boolean",
            "correct": false
          },
          {
            "answer": "Number",
            "correct": false
          },
          {
            "answer": "tag",
            "correct": true
          },
          {
            "answer": "object",
            "correct": false
          },
        ]
      },
  ];


//   subtituition quizz
function init(){

    createQuestion(0);
}

// cria uma pergunta
function createQuestion(i){
    
    // clean previous
    const onldButtons = answerBox.querySelectorAll("button");

    onldButtons.forEach(function(btn){
        btn.remove();
        
    });

    // change text
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");
    

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;


    // insert answer

    questions[i].answers.forEach(function (answer, i){

        // create template button

        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterbtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterbtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // remove hide class

        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("wrong-answer");
        answerTemplate.classList.remove("answer-template");

        // insert answers on screen
        answerBox.appendChild(answerTemplate);

        // insert click envent
        answerTemplate.addEventListener("click", function(){
            checkAnswer(this);
        });

    });

    // increase question number
    actualQuestion++;

}


// verify answer

function checkAnswer(btn){
    const buttons = document.querySelectorAll("button");


    buttons.forEach(function(button){
        if(button.getAttribute("correct-answer") === "true"){
            
            button.classList.add("correct-answer");

            if(btn === button){
                points++;
            }
        }else{
            button.classList.add("wrong-answer");
        }
    });

    // show next call
    nextQuestion()
    

};



// show next function

function nextQuestion(){
    setTimeout(function(){

      
        if(actualQuestion >= questions.length){
            showSuccsessMEssage();
            return;            
        }

        createQuestion(actualQuestion);
       

    }, 1500)
}

// final screen
function showSuccsessMEssage(){

    hideOrShowQuizz();    

    // change points


    // calc score
    const score = ((points / questions.length)* 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    const correct = document.querySelector("#correct-answer");

    correct.textContent = points;


    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}

function hideOrShowQuizz(){
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

// restart
const restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", function(){
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
})

// init
init();