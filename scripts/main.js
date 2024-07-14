// Creates a map at a set longitude and latitude
const map = L.map('map').setView([40.6795092, -73.9972808], 18);

// Creates a OpenStreetMap tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Creates a pin at a set longitude and latitude
const marker = L.marker([40.6794082, -73.9972808]).addTo(map);
document.querySelector('.leaflet-marker-icon').src =
  '../assets/marker-icon.png';

// Creates a text bubble at a set longitude and
const popup = L.popup()
  .setLatLng([40.6795092, -73.9972808])
  .setContent(
    'Come to our Stoop Sale for amazing vibes and great deals.<br> 2nd Pl & Court St · Brooklyn, NY 11231'
  )
  .openOn(map);

// Creates a method to add hours to a date object
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};
const eventDate = new Date().addHours(42);
const countDownDate = new Date(eventDate).getTime();

const countdown = setInterval(function () {
  const now = new Date().getTime();
  const timeLeft = countDownDate - now;
  const days = document.querySelector('#days');
  const hours = document.querySelector('#hours');
  const minutes = document.querySelector('#minutes');
  const seconds = document.querySelector('#seconds');

  let daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hoursLeft = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

  days.textContent = daysLeft;
  hours.textContent = hoursLeft;
  minutes.textContent = minutesLeft;
  seconds.textContent = secondsLeft;
  // Theoretically it stops and removes the timer, but on load, the event date is always 42 hours from now
  if (timeLeft < 0) {
    clearInterval(countdown);
    document.querySelector('count-down').innerHTML =
      "<strong>Aaand we're off!</strong>";
  }
}, 1000);

// Updating the event date and time on the page
function updateEventDateTime() {
  const optionsDay = {
    weekday: 'long',
    timeZone: 'America/New_York',
  };
  const optionsDate = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'America/New_York',
  };
  const optionsTime = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/New_York',
    timeZoneName: 'short',
  };
  // Format date and time
  const formattedDay = eventDate.toLocaleDateString('en-US', optionsDay);
  const formattedDate = eventDate.toLocaleDateString('en-US', optionsDate);
  const formattedTime = eventDate.toLocaleTimeString('en-US', optionsTime);
  // Update HTML
  document.querySelector('#event-day').textContent = formattedDay;
  document.querySelector('#event-date').textContent = formattedDate;
  document.querySelector('#event-time').textContent = formattedTime;
}

// Call the function to update the date and time on page load
document.addEventListener('DOMContentLoaded', updateEventDateTime);
