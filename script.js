// Constants
const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
const MILLISECONDS_IN_AN_HOUR = 1000 * 60 * 60;
const MILLISECONDS_IN_A_MINUTE = 1000 * 60;

// DOM elements
const eventName = document.querySelector("input[name='eventName']");
const eventDate = document.querySelector("input[type='date']");
const eventTime = document.querySelector("input[type='time']");
const form = document.querySelector("form");
const timer = document.querySelector("#timer");
const app = document.querySelector(".app");

// Form submit handler
form.addEventListener("submit", (event) => {
  // Prevent page from refreshing on submit
  event.preventDefault();

  // Get UNIX timestamp for event date (Midnight in UTC)
  let end = eventDate.valueAsNumber;

  // Calculate timezone offset (in minutes) and apply to end time
  const date = new Date();
  const timezoneOffset = date.getTimezoneOffset();
  end += timezoneOffset * MILLISECONDS_IN_A_MINUTE;

  // Get optional time values, if they exist, and apply them to end value
  if (eventTime.value) {
    const time = eventTime.value.split(":");
    const hours = Number(time[0]);
    const minutes = Number(time[1]);
    end += hours * MILLISECONDS_IN_AN_HOUR + minutes * MILLISECONDS_IN_A_MINUTE;
  }

  // Check for a valid end time and start timer
  if (end > Date.now()) {
    startTimer(end);

    // Hide form, show timer
    app.classList.toggle("hidden");
    timer.classList.toggle("hidden");
  } else {
    alert("Please enter an event in the future");
  }
});

// Timer function
const startTimer = (end) => {
  // Run every second
  const theTimer = setInterval(() => {
    // Get timestamp for now and calculate difference between event and now
    const now = Date.now();
    let timeLeft = end - now;

    // Stop timer when we reach the event
    if (timeLeft < 0) return clearInterval(theTimer);

    // Calculate days left
    const daysLeft = Math.floor(timeLeft / MILLISECONDS_IN_A_DAY);
    timeLeft -= daysLeft * MILLISECONDS_IN_A_DAY;

    // Calculate hours left
    const hoursLeft = Math.floor(timeLeft / MILLISECONDS_IN_AN_HOUR);
    timeLeft -= hoursLeft * MILLISECONDS_IN_AN_HOUR;

    // Calculate minutes left
    const minutesLeft = Math.floor(timeLeft / MILLISECONDS_IN_A_MINUTE);
    timeLeft -= minutesLeft * MILLISECONDS_IN_A_MINUTE;

    // Calculate seconds left
    const secondsLeft = Math.floor(timeLeft / 1000);

    // Update time left string
    while (timer.firstChild) {
      timer.removeChild(timer.firstChild);
    }
    timer.appendChild(
      document.createTextNode(
        formatTimeLeftString(daysLeft, hoursLeft, minutesLeft, secondsLeft)
      )
    );
  }, 1000);
};

// Formats the time left string, accounting for singular/plural time left
const formatTimeLeftString = (d, h, m, s) => {
  return (
    (d < 1 ? "" : d + " day" + (d === 1 ? ", " : "s, ")) +
    (h < 1 ? "" : h + " hour" + (h === 1 ? ", " : "s, ")) +
    (m < 1 ? "" : m + " minute" + (m === 1 ? " and " : "s and ")) +
    s +
    " second" +
    (s === 1 ? " " : "s ") +
    "left until " +
    eventName.value +
    "!"
  );
};
