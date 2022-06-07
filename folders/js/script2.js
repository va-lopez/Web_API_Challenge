var highScoresListEl = document.querySelector(".listHs");
var entry1 = document.createElement("li");
var entry2 = document.createElement("li");
var entry3 = document.createElement("li");
var entry4 = document.createElement("li");
var entry5 = document.createElement("li");
var entry6 = document.createElement("li");
var entry7 = document.createElement("li");
var entry8 = document.createElement("li");
var entry9 = document.createElement("li");
var entry10 = document.createElement("li");
var list = [];
var clearButtonEl = document.querySelector("#clearScores");

//generate HS list
var retrieveList = function(){
    list = JSON.parse(localStorage.getItem("highScores"));

    for (var i=0; i<list.length;i++){
        var listEntry = document.createElement("li");
        listEntry.textContent = ((i+1) + ". " + list[i].name + " - " + list[i].score);
        highScoresListEl.appendChild(listEntry);
    }
}

var clearStorage = function(event){
    localStorage.clear();
    highScoresListEl.remove();
    retrieveList();
}

retrieveList();
clearButtonEl.addEventListener('click',clearStorage);