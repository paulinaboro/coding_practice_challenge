"use strict";

window.addEventListener("DOMContentLoaded", showTheCurrentWeekday);
window.addEventListener("DOMContentLoaded", fetchJSON);
window.addEventListener("DOMContentLoaded", loadSVG);

//All the variables needed for displaying the date and time
let date = new Date();
let currentWeekday = document.querySelector("#currentWeekday");
let currentDayNumber = document.querySelector("#currentDayNumber");
let dayNumber = date.getDay();
let currentTime = document.querySelector("#currentTime");
let currentYear = document.querySelector("#currentYear");

const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const weekDaysList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Saturday",
  "Friday"
];

//All the variables needed for changing the page title
let newTitle = document.querySelector("#newTitle");
let newTitleButton = document.querySelector("#newTitleButton");
newTitleButton.addEventListener("click", changeThePageTitle);

//All the variables needed for changing the page background color
let colorPicker = document.querySelector("#colorPicker");
let baseColor = "";

//All the variables needed for fetching and cloning JSON task list
const tasksListSource = "src/json/tasks.json";
const parent = document.querySelector("main");
const tasksTemplate = document.querySelector("#tasksTemplate").content;

//All the variables neede for playing and pausing audio
//Loading the audio source
let audio = new Audio();
audio.src = "src/audio/queen_audio.mp3";
let playButton = document.querySelector("#playButton");
let pauseButton = document.querySelector("#pauseButton");

//Variables needed for displaying the specific weekday name
let dayName = date.getDay();
let currentWeekdayName = weekDaysList[dayName];

function showTheCurrentWeekday() {
  currentWeekday.innerHTML = currentWeekdayName;
  showTheCurrentDayNumber();
}

//Showing the current day number in ordinal suffix (for example: 1st, 2nd, 3rd etc.):
function showTheCurrentDayNumber() {
  let dayNumber = date.getDate();

  if (dayNumber == 1) {
    currentDayNumber.innerHTML = dayNumber + "st";
  } else if (dayNumber == 21) {
    currentDayNumber.innerHTML = dayNumber + "st";
  } else if (dayNumber == 31) {
    currentDayNumber.innerHTML = dayNumber + "st";
  } else if (dayNumber == 2) {
    currentDayNumber.innerHTML = dayNumber + "nd";
  } else if (dayNumber == 22) {
    currentDayNumber.innerHTML = dayNumber + "nd";
  } else if (dayNumber == 3) {
    currentDayNumber.innerHTML = dayNumber + "rd";
  } else if (dayNumber == 23) {
    currentDayNumber.innerHTML = dayNumber + "rd";
  } else {
    currentDayNumber.innerHTML = dayNumber + "th";
  }
  showTheCurrentMonthName();
}

//Showing the month name on a base of current month number-displaying current month name from the monthList
function showTheCurrentMonthName() {
  let month = date.getMonth();
  let currentMonth = monthsList[month];
  showCurrentMonth.innerHTML = " " + currentMonth + " ";
  showTheCurrentYear();
}

function showTheCurrentYear() {
  let year = date.getFullYear();
  currentYear.innerHTML = year;
  showTheCurrentTime();
}

//Showing the current time and updating every 1000ms
function showTheCurrentTime() {
  setInterval(function() {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";

    //We call the function checkTime to check if the number is less than 10
    minutes = checkTime(minutes);

    currentTime.innerHTML = hours + ":" + minutes + " " + ampm;
  }, 1000);
}

//if the number in the current time is less than 10 we add the zero in front of it
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } //adding zero in front of minutes < 10
  return i;
}

//Taking the written value from the input text and displaying it on the page
function changeThePageTitle() {
  document.getElementById("currentPageTitle").innerHTML = newTitle.value;
}

//Changing the background color
colorPicker.addEventListener("input", chosenColor);

function chosenColor(color) {
  // Taking the value of the chosen color from the color picker
  baseColor = colorPicker.value;
  //Setting up the chosen value as the background color
  document.body.style.backgroundColor = baseColor;
}

//Fetching JSON obviously :D and passing data to the next function
function fetchJSON() {
  fetch(tasksListSource)
    .then(promise => promise.json())
    .then(tasks => showTasksForToday(tasks));
}

//From the passed JSON data cloning the template for each object
function showTasksForToday(tasks) {
  tasks.forEach(task => {
    const clone = tasksTemplate.cloneNode(true);
    clone.querySelector("#timeTable").textContent = task.time;
    clone.querySelector("#taskTable").textContent = task.description;

    //Cloning the tasks only for the current weekday otherwise hiding objects
    if (task.day == currentWeekdayName) {
      parent.appendChild(clone);
    } else {
      clone.querySelector("#timeTable").classList.add("hidden");
      clone.querySelector("#taskTable").classList.add("hidden");
    }
  });
}

//Animation, loading svg file
function loadSVG() {
  fetch("src/svg/animation.svg")
    .then(response => response.text())
    .then(svgdata => {
      document
        .querySelector("#svgAnimation")
        .insertAdjacentHTML("afterbegin", svgdata);
    });
}

//Playing and pausing audio on the click event
playButton.addEventListener("click", hidePlayButton);
pauseButton.addEventListener("click", hidePauseButton);

function hidePlayButton() {
  playButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
}

function hidePauseButton() {
  pauseButton.classList.add("hidden");
  playButton.classList.remove("hidden");
}
