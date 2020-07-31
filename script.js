// DOM elements
const eventName = document.querySelector("#eventName");
const eventDateTime = document.querySelector("#eventDateTime");
const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
const outputDisplay = document.querySelector("#outputDisplay");
const inputForm = document.querySelector("#inputForm");
const timeLeftDisplay = document.querySelector("#timeLeftDisplay");

// DOM ready
document.addEventListener("DOMContentLoaded", () => {
  startButton.addEventListener("click", handleStart);
  stopButton.addEventListener("click", handleStop);
});

const handleStop = (e) => {
  // Keep page from refreshing
  e.preventDefault();

  eventName.value = "";
  eventDateTime.value = "";
  // TODO - Remove all child nodes from outputDisplay
  outputDisplay.classList.add("hidden");
  inputForm.classList.remove("hidden");
};

const handleStart = (e) => {
  // Keep page from refreshing
  e.preventDefault();

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

  timeLeftDisplay.appendChild(timeLeftText);

  outputDisplay.classList.remove("hidden");
  inputForm.classList.add("hidden");
  // Required attribute must be removed on hidden input elements - https://stackoverflow.com/a/7264966/6520955
  eventName.removeAttribute("required");
};
