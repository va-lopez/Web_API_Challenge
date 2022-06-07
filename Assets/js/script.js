//questions
var questionObj = [
    {
        question:"Indicates the beginning and the end of a JavaScript section.",
        ansA:"<html></html>",
        ansB:"<style></style>",
        ansC:"<article></article>",
        ansD:"<script></script>",
        correctAns:"4"
    },
    {
        question:"A JavaScript file has an extension name of",
        ansA:".jscp",
        ansB:".js",
        ansC:".css",
        ansD:".Jp",
        correctAns:"2"
    },
    {
        question:"Which keyword do we need to define a function?",
        ansA:"function",
        ansB:"method",
        ansC:"onclick",
        ansD:"functionName()",
        correctAns:"1"
    },
    {
        question:"Which 1 of the following symbols is used for JavaScript comments?",
        ansA:"\\",
        ansB:"^",
        ansC:"?",
        ansD:"//",
        correctAns:"4"
    },
    {
        question:"How can a developer show a pop-up message to the user?",
        ansA:"alert",
        ansB:"prompt",
        ansC:"console.log",
        ansD:"<p> tag",
        correctAns:"1"
    }
]
//index for navigating through questions obj
count = 0;

//for timer
var showTimer = document.querySelector('#timer');
var timer = 100;
var startCountDown;
//for starting page
var pageContentEl = document.querySelector('#pageContent');
var titleEl = document.createElement('h2');
var instructions = document.createElement("p");
var buttonEl = document.createElement('button');

//for end of test display
var displayScore = document.createElement("p");
var enterScore = document.createElement("form");
var initialLable = document.createElement("lable");
var enterInitials = document.createElement("input");
var linkToHsPage = document.createElement("a");
var submitBtn = document.createElement('button');

//for questions page
var answerChoices = document.createElement('div');
var answerA = document.createElement('button');
var answerB = document.createElement('button');
var answerC = document.createElement('button');
var answerD = document.createElement('button');
var correctAnswer;

//get HS list
var highScores = [];


//generates the html elements for the "main page"
var mainPage = function(){
    //append the elements to be on main page
    pageContentEl.appendChild(titleEl);
    pageContentEl.appendChild(instructions);
    pageContentEl.appendChild(buttonEl);

    //set up class names for CSS and change text content
    titleEl.className = ('title');
    buttonEl.className = ('btn');

    titleEl.textContent = 'Coding Quiz Challenge';
    instructions.textContent = ('Try to answer the following questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!');
    buttonEl.textContent = 'Start Quiz';
}
//function to start timer
var startTimer = function (){
    startCountDown = setInterval(counter, 1000);
}

var loadHS = function(){
    var savedHS = localStorage.getItem("highScores");
    if(!savedHS)
        return false;
    highScores = JSON.parse(savedHS);
}

//counter decreases everytime called
var counter = function(){
    if(timer === 0){
        clearInterval(startCountDown);
        showFinalScore();
    }

    timer--;
    updateTimer();

    //displayQuestions is only called once from the counter and thats when the counter starts
    if(timer===99)
        displayQuestions();
}

var updateTimer = function(){
    showTimer.textContent = "Time: " + timer;
}

//deletes the starting page elements and creates and updates question elements
var displayQuestions = function(){
    //removes previous starting page elements, creates question elements, updates classnames for css
    if(count === 0){
        instructions.remove();
        buttonEl.remove();
        //append these new buttons under the page content's div
        pageContentEl.appendChild(answerChoices);
        answerChoices.appendChild(answerA);
        answerChoices.appendChild(answerB);
        answerChoices.appendChild(answerC);
        answerChoices.appendChild(answerD);

        titleEl.className = 'question';
        answerChoices.className = "choices";
        //add attributes for each button, event listener looks for clicks with this classname
        answerA.setAttribute("data-choice","1");
        answerA.className ='answerChoice';
        answerB.setAttribute("data-choice","2");
        answerB.className = 'answerChoice';
        answerC.setAttribute("data-choice","3");
        answerC.className = 'answerChoice';
        answerD.setAttribute("data-choice","4");
        answerD.className = 'answerChoice';
    }

    //replace the text with the objects answer choices
    titleEl.textContent = questionObj[count].question;
    answerA.textContent = questionObj[count].ansA;
    answerB.textContent = questionObj[count].ansB;
    answerC.textContent = questionObj[count].ansC;
    answerD.textContent = questionObj[count].ansD;
}

//checks to see if button clicked is correct answer
var checkAnswers = function(){
    //get target element from event then get the number associated with it
    var targetEl = event.target;
    var choicePicked = targetEl.getAttribute("data-choice");
    event.stopPropagation;

    //get the correct answer for this question
    correctAnswer = questionObj[count].correctAns;
    
    //check to see if the answer is correct ,if not subtract points from score.
    if (choicePicked != correctAnswer){
        timer-=10;
        updateTimer();
    }   
    //check to see if reached the last question
    if(count===questionObj.length-1){
        showFinalScore();
    }
    count++;
    displayQuestions();
}

var showFinalScore = function(){
    clearInterval(startCountDown);
    score = timer;

    //remove the answer buttons
    answerA.remove();
    answerB.remove();
    answerC.remove();
    answerD.remove();
    //replace with ending page elements
    pageContentEl.appendChild(displayScore);
    pageContentEl.appendChild(enterScore);
    enterScore.appendChild(initialLable);
    enterScore.appendChild(enterInitials);
    pageContentEl.appendChild(linkToHsPage);
    linkToHsPage.appendChild(submitBtn);

    //rename classes and text content
    titleEl.className = ('heading');
    displayScore.className = ('display');
    enterScore.className =('formSubmit');
    initialLable.className = ('label');
    enterInitials.className = ('inputEl');
    submitBtn.className = ('toHsPage');


    titleEl.textContent = "All done!";
    submitBtn.textContent = "Submit";
    linkToHsPage.setAttribute("href", "highscores.html");
    submitBtn.setAttribute("type", "submit");
    displayScore.textContent = ("Your final score is " + score);
    initialLable.textContent = ("Enter initials: ");
    
}

//Saves your highscore and then calls a function to sort it before saving to local storage
var saveYourHs = function(event){
    event.preventDefault();
    var inputName = enterInitials.value;

    //check to see if initials were entered
    if(!inputName){
        alert("You need to enter Initials");
        return false;
    }

    var entry = {
        name:inputName,
        score: timer
    }

    sortHS(entry);
    //cut the length of array at 10
    if(highScores.length>10){
        highScores.splice(-1,1);
    }

    localStorage.setItem("highScores", JSON.stringify(highScores));
}

//Sort through the high scores to put them in descending order
var sortHS = function(entry){
    if(!highScores){
        highScores.push(entry);
        return true;
    }

    //compare to put entry into the correct index
    for (let i = 0; i < highScores.length; i++){
        //check to see if the current entry is greater than any on the exsisting list
        if(entry.score>highScores[i].score){
            highScores.splice(i,0,entry);
            return true;
        }
    }
    highScores.push(entry);   
}

loadHS();
mainPage();
buttonEl.addEventListener('click',startTimer);
answerChoices.addEventListener('click', checkAnswers);
submitBtn.addEventListener('click', saveYourHs);