document.addEventListener("DOMContentLoaded", () => {

let timer = null;
let remainingSeconds = 0;
let studyMinutes = 0;

const timerDisplay = document.getElementById("timer");
const plant = document.getElementById("plant");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");
const resetBtn = document.getElementById("reset");

const finishSound = document.getElementById("finishSound");


// START
startBtn.addEventListener("click", () => {

    const minutesInput = document.getElementById("minutes").value;

    if(minutesInput === "" || minutesInput <= 0){
        alert("لطفا زمان معتبر وارد کن");
        return;
    }

    clearInterval(timer);

    remainingSeconds = minutesInput * 60;

    updateDisplay();

    timer = setInterval(runTimer, 1000);
});


// PAUSE
pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
});


// RESUME
resumeBtn.addEventListener("click", () => {

    clearInterval(timer);

    timer = setInterval(runTimer, 1000);
});


// RESET
resetBtn.addEventListener("click", () => {

    clearInterval(timer);

    remainingSeconds = 0;

    timerDisplay.innerHTML = "00:00";

    studyMinutes = 0;

    document.getElementById("studyReport").innerHTML = "0";

    plant.src = "images/plant1.png";
});


// TIMER FUNCTION
function runTimer(){

    if(remainingSeconds <= 0){

        clearInterval(timer);

        finishSound.play();

        alert("زمان مطالعه تموم شد 🔥");

        return;
    }

    remainingSeconds--;

    studyMinutes++;

    updateDisplay();

    updatePlant();

    document.getElementById("studyReport").innerHTML =
        Math.floor(studyMinutes / 60);
}


// UPDATE DISPLAY
function updateDisplay(){

    const minutes = Math.floor(remainingSeconds / 60);

    const seconds = remainingSeconds % 60;

    timerDisplay.innerHTML =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}


// GROW PLANT
function updatePlant(){

    if(studyMinutes >= 60){
        plant.src = "images/plant4.png";
    }
    else if(studyMinutes >= 40){
        plant.src = "images/plant3.png";
    }
    else if(studyMinutes >= 20){
        plant.src = "images/plant2.png";
    }
    else{
        plant.src = "images/plant1.png";
    }
}


// TASKS
document.getElementById("addTask").addEventListener("click", () => {

    const taskInput = document.getElementById("taskInput");

    if(taskInput.value.trim() === ""){
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${taskInput.value}</span>
        <input type="checkbox">
    `;

    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";
});

});