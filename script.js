// DOM elements
const eventName = document.querySelector("#eventName");
const eventMonth = document.querySelector("#eventMonth");
const eventDay = document.querySelector("#eventDay");
const eventYear = document.querySelector("#eventYear");
const eventHour = document.querySelector("#eventHour");
const eventMinute = document.querySelector("#eventMinute");
const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
const outputDisplay = document.querySelector("#outputDisplay");
const inputForm = document.querySelector("#inputForm");
const timeLeftDisplay = document.querySelector("#timeLeftDisplay");

// Hold the AM or PM value
const amPm = document.querySelector("input[name=amPm]:checked").value;

// DOM ready
document.addEventListener("DOMContentLoaded", () => {
  createFormOptions();

  startButton.addEventListener("click", handleStart);
  stopButton.addEventListener("click", handleStop);
});

const handleStop = (e) => {
  e.preventDefault();
  outputDisplay.classList.add("hidden");
  inputForm.classList.remove("hidden");
};

const handleStart = (e) => {
  // Keep page from refreshing
  e.preventDefault();

  const now = Date.now();

  const timeLeftText = getTimeLeft(now);

  timeLeftDisplay.appendChild(timeLeftText);

  outputDisplay.classList.remove("hidden");
  inputForm.classList.add("hidden");
};

const getTimeLeft = (timestamp) => {
  console.log(timestamp);
  // Dummy values for now
  let yearsLeft = 2;
  let monthsLeft = 2;
  let daysLeft = 3;
  let hoursLeft = 4;
  let minutesLeft = 5;
  let secondsLeft = 20;

  // Create time left string
  const timeLeftText = document.createTextNode(
    `${yearsLeft} years ${monthsLeft} months ${daysLeft} days
    ${hoursLeft} hours ${minutesLeft} minutes and ${secondsLeft} seconds left until
    ${eventName.value}!`
  );

  return timeLeftText;
};

const createFormOptions = () => {
  // Array of months of the year
  const months = [
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
    "December",
  ];

  // Create month options
  months.forEach((month, index) => {
    // Index + 1 so that January is 1, February is 2, etc.
    const option = new Option(month, index + 1);
    document.querySelector("#eventMonth").appendChild(option);
  });

  // Create day options, 1-indexed
  const days = new Array(31);
  for (let i = 1; i < days.length + 1; i++) {
    const option = new Option(i, i);
    document.querySelector("#eventDay").appendChild(option);
  }

  // Create year options
  const years = new Array(25);
  for (let i = 0; i < years.length; i++) {
    const option = new Option(i + 2020, i + 2020);
    document.querySelector("#eventYear").appendChild(option);
  }

  // Create hour options, 1-indexed
  const hours = new Array(12);
  for (let i = 1; i < hours.length + 1; i++) {
    const option = new Option(i, i);
    option.selected = 12;
    document.querySelector("#eventHour").appendChild(option);
  }

  // Create minute options
  const minutes = new Array(60);
  for (let i = 0; i < minutes.length; i++) {
    // Numbers less than 10 have a leading zero
    const option = new Option((i < 10 ? "0" : "") + i, (i < 10 ? "0" : "") + i);
    document.querySelector("#eventMinute").appendChild(option);
  }
};
