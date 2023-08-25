const questions = [
    {
        question: '"Which one is the smallest ocean in the World?',
        answers: [
            {text: 'Indian',correct: false}, 
            {text: 'Pacific',correct: false},
            {text: 'Artic',correct: true},
            {text: 'Atlantic',correct: false}
        ]
    },
    {
        question: 'Which country gifted the ‘Statue of Liberty’ to USA in 1886?',
        answers: [
            {text: 'AMERICA',correct: false}, 
            {text: 'INDIA',correct: false},
            {text: 'FRANCE',correct: true},
            {text: 'LONDON',correct: false}
        ]
    },
    {
        question: '"In which ocean ‘Bermuda Triangle’ region is located',
        answers: [
            {text: 'Indian',correct: false}, 
            {text: 'Pacific',correct: false},
            {text: 'Artic',correct: false},
            {text: 'Atlantic',correct: true}
        ]
    },
   
];
const questionElement=document.getElementById('question')
const answerButtons=document.getElementById('answer-btns')
const nextButton=document.getElementById('next-btn')

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML='Next';
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1
    questionElement.innerHTML=questionNo+'. '+currentQuestion.question

    currentQuestion.answers.forEach(answer =>{
       const button=document.createElement('button')
       button.innerHTML=answer.text 
       button.classList.add('btn')
       answerButtons.appendChild(button)
       if (answer.correct){
        button.dataset.correct=answer.correct
       }
       button.addEventListener('click',selectAnswer)
    })
}

function resetState(){
    nextButton.style.display='none'
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect=selectedBtn.dataset.correct==='true'
    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++;
    }else{
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct ==='true'){
            button.classList.add('correct')
        }
        button.disabled=true;
    })
    nextButton.style.display='block'
}

function showScore(){
    resetState();
    questionElement.innerHTML='You scored '+score+' out of '+questions.length;
    nextButton.innerHTML='Attempt again'
    nextButton.style.display='block'
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})

startQuiz();
