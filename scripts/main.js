// Creates a map at a set longitude and latitude
var map = L.map('map').setView([40.6795092, -73.9972808], 18);


// Creates a OpenStreetMap tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Creates a pin at a set longitude and latitude
var marker = L.marker([40.6794082, -73.9972808]).addTo(map);

// Creates a text bubble at a set longitude and
var popup = L.popup()
    .setLatLng([40.6795092, -73.9972808])
    .setContent("Come to our Stoop Sale for amazing vibes and great deals.<br> 2nd Pl & Court St · Brooklyn, NY 11231")
    .openOn(map);

dayjs.extend(dayjs_plugin_duration);

// activation of the countdown
function activateCountdown(element, dateString) {
    const targetDate = dayjs(dateString);

    setInterval(() => {
        const now = dayjs();
        const duration = dayjs.duration(targetDate.diff(now));

        // sort out the case where the date has passed
        if (duration.asMilliseconds() <= 0) return;

        element.querySelector(".until__numeric--seconds").textContent = duration.seconds().toString().padStart(2, "0");
        element.querySelector(".until__numeric--minutes").textContent = duration.minutes().toString().padStart(2, "0");
        element.querySelector(".until__numeric--hours").textContent = duration.hours().toString().padStart(2, "0");
        element.querySelector(".until__numeric--days").textContent = duration.asDays().toFixed(0).toString().padStart(2, "0");
    }, 250);
}

activateCountdown(document.getElementById("myCountdown"), "2024-07-13");

const facebookButton = document.querySelector(
    ".social-share-container .facebook-button"
)
const linkedinButton = document.querySelector(
    ".social-share-container .linkedin-button"
)
const twitterButton = document.querySelector(
    ".social-share-container .twitter-button"
)
const messengerButton = document.querySelector(
    ".social-share-container .messenger-button"
)
const whatsappButton = document.querySelector(
    ".social-share-container .whatsapp-button"
)
const shareButton = document.querySelector(
    ".social-share-container .share-button"
)
    
const toast = document.querySelector(".toast");

const url = encodeURIComponent(window.location.href);
const title = encodeURIComponent(document.title);

const shareLink = window.location.href;

twitterButton.href = `http://twitter.com/intent/tweet?url=${url}&text=${title}`;
facebookButton.href = `https://www.facebook.com/sharer.php?u=${url}`;
linkedinButton.href = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
messengerButton.href = `https://www.facebook.com/dialog/send?link=${url}`;
whatsappButton.href = `https://api.whatsapp.com/send?text=${title}:${url}`;

const displayToast = (message) => {
    toast.textContent = message;
    toast.classList.add("active");
    setTimeout(() => {
        toast.classList.remove("active");
    }, 3000)
};

shareButton.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(shareLink).then(() => {
        display.Toast("Link copied");
    }).catch(() => displayToast("Error copying link"))
});