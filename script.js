// DOM elements
const eventName = document.querySelector("#eventName");
const eventMonth = document.querySelector("#eventMonth");
const eventDay = document.querySelector("#eventDay");
const eventYear = document.querySelector("#eventYear");
const eventHour = document.querySelector("#eventHour");
const eventMinute = document.querySelector("#eventMinute");
const amPm = document.querySelector("input[name=amPm]:checked").value;
const start = document.querySelector("#start");
const outputDisplay = document.querySelector("#outputDisplay");
const inputForm = document.querySelector("#inputForm");

// DOM ready
document.addEventListener("DOMContentLoaded", () => {
  createFormOptions();

  start.addEventListener("click", onStart);
});

const onStart = () => {
  console.log(
    `${eventName.value} on ${eventMonth.value}/${eventDay.value}/${eventYear.value} at ${eventHour.value}:${eventMinute.value}${amPm}`
  );
  outputDisplay.classList.remove("hidden");
  inputForm.classList.add("hidden");
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

  // Create day options
  const days = new Array(31);
  for (let i = 0; i < days.length; i++) {
    const option = new Option(i + 1, i + 1);
    document.querySelector("#eventDay").appendChild(option);
  }

  // Create year options
  const years = new Array(25);
  for (let i = 0; i < years.length; i++) {
    const option = new Option(i + 2020, i + 2020);
    document.querySelector("#eventYear").appendChild(option);
  }

  // Create hour options
  const hours = new Array(12);
  for (let i = 0; i < hours.length; i++) {
    const option = new Option(i + 1, i + 1);
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
