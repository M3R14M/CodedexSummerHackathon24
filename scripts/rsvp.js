import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js';
import {
  getDatabase,
  ref,
  onValue,
  runTransaction,
} from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js';

// Config for Firebase (expires in 30 days)
const firebaseConfig = {
  apiKey: 'AIzaSyBR7fMUzbazILtKjhcu0BE-V0YXvJdekQc',
  authDomain: 'stoop-sale-96830.firebaseapp.com',
  databaseURL: 'https://stoop-sale-96830-default-rtdb.firebaseio.com',
  projectId: 'stoop-sale-96830',
  storageBucket: 'stoop-sale-96830.appspot.com',
  messagingSenderId: '214046009340',
  appId: '1:214046009340:web:bfc9dca16717ca5f373479',
};

// Initialize Firebase
const APP = initializeApp(firebaseConfig);
const DB = getDatabase(APP);
const database = ref(DB, 'rsvp');

// Elements on page
const rsvpCount = document.querySelector('rsvp-count');
const rsvpButton = document.querySelector('#rsvp');

// Function to update the counter display
function updateCounterDisplay(count) {
  rsvpCount.textContent = count;
}

// Function to update the button in case user has already clicked
function updateButton() {
  rsvpButton.disabled = true;
  rsvpButton.textContent = 'See you there!';
}

// Get the current counter value and update the display
onValue(database, (snapshot) => {
  const count = snapshot.val() || 0;
  updateCounterDisplay(count);
});

// Check if the user has already clicked the button
const hasClicked = localStorage.getItem('hasClicked');
if (hasClicked) {
  updateButton();
}

// Increment counter function
function incrementCounter() {
  runTransaction(database, (currentValue) => {
    return (currentValue || 0) + 1;
  })
    .then(() => {
      // Update the button and set local storage
      updateButton();
      localStorage.setItem('hasClicked', 'true');
    })
    .catch((error) => {
      console.error('Error updating counter:', error);
    });
}

// Attach click event listener to the button
rsvpButton.addEventListener('click', incrementCounter);
