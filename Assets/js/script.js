var startBtn = document.querySelector('#start_btn');
var content = document.querySelector('#page-content');
var page_title = document.querySelector('.title');
var page_text = document.querySelector('')
var count = 0;
var questionObj = [
    {
        question:"Who is the first ghost to visit Ebenezer Scrooge in A Christmas Carol?",
        ansA:"Jacob Marley",
        ansB:"the Ghost of Christmas Past",
        ansC:"the Ghost of Christmas Present",
        ansD:"the Ghost of Christmas Future",
        correctAns:"Jacob Marley"
    },
    {
        question:"Who is the author of The Haunting of Hill House, a novel about a house rife with supernatural horrors?",
        ansA:"Anne Rice",
        ansB:"Carmen Maria Machado",
        ansC:"Stephen King",
        ansD:"Shirley Jackson",
        correctAns:"Shirley Jackson"
    },
    {
        question:"What U.S. state has horror writer Stephen King set many of his novels and short stories in?",
        ansA:"Florida",
        ansB:"Oregon",
        ansC:"Virgina",
        ansD:"Maine",
        correctAns:"Maine"
    },
    {
        question:"What hotel is Jack hired as caretaker of (and later possesses him) in Stephen King's 'The Shining'?",
        ansA:"Hotel Excelsior",
        ansB:"the Bates Motel",
        ansC:"the Dolphin Hotel",
        ansD:"the Overlook Hotel",
        correctAns:"the Overlook Hotel"
    },
    {
        question:"In Bram Stoker's Dracula, what does the monster allegedly need from his home country to stay healthy?",
        ansA:"clothing",
        ansB:"bedding",
        ansC:"food",
        ansD:"dirt",
        correctAns:"dirt"
    },
]
var switchToQuestions = function (){
    //content.setAttribute("content-type",question);
    page_title.textContent = questionObj[count].question;
    page_title.className = "question";
    console.log("in switchToQuestion function");
}

var startQuiz = function(event){
    console.log("button was clicked, in StartQuiz");
    switchToQuestions();
};

startBtn.addEventListener('click',startQuiz);