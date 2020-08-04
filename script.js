// Constants
const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
const MILLISECONDS_IN_AN_HOUR = 1000 * 60 * 60;
const MILLISECONDS_IN_A_MINUTE = 1000 * 60;

// DOM elements
const eventDate = document.querySelector("input[type='date']");
const eventTime = document.querySelector("input[type='time']");
const form = document.querySelector("form");
const timer = document.querySelector("#timer");

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

  // Hide form and show timer
  form.classList.add("hidden");
  timer.classList.remove("hidden");

  // Start timer
  setInterval(() => {
    // Get timestamp for now and calculate difference between event and now
    const now = Date.now();
    let timeLeft = end - now;

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

    // TODO - Display the countdown timer
    console.log(daysLeft, hoursLeft, minutesLeft, secondsLeft);
  }, 1000);
});
