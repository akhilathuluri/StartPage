const accessKey = 'kG6hiIrIQ6sYgVjF-mOvr60XREK5l_3NrhS8fjW5RMo';
const apiUrl = `https://api.unsplash.com/photos/random?query=technology&client_id=${accessKey}`;
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

// Function to get the user's name from local storage or prompt them for it
function getUserName() {
  let name = localStorage.getItem('name');
  if (!name) {
    name = prompt("Please enter your name:");
    localStorage.setItem('name', name);
  }
  return name;
}

// Function to display the greeting message based on the user's name and the current time
function displayGreeting() {
  const name = getUserName();
  const currentHour = new Date().getHours();
  let greeting;
  if (currentHour < 12) {
    greeting = `Good morning, ${name}!`;
  } else if (currentHour < 18) {
    greeting = `Good afternoon, ${name}!`;
  } else {
    greeting = `Good evening, ${name}!`;
  }
  document.getElementById("greeting").textContent = greeting;
  document.title = `${name}'s Home Page`;
}

// Function to display a random quote
function displayQuote() {
  fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(data => {
      // Display the quote and author
      document.getElementById("quote").textContent = data.content;
      document.getElementById("author").textContent = `— ${data.author}`;
    })
    .catch(error => {
      console.log(error);
      document.getElementById("quote").textContent = "Sorry, something went wrong. Please try again later.";
    });
}

// Function to set the background image of the page
function setBackgroundImage() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const imageWidth = screenWidth;
      let imageHeight = Math.round((screenWidth / data.width) * data.height);
      if (imageHeight < screenHeight) {
        imageHeight = screenHeight;
      }
      document.body.style.backgroundImage = `url(${data.urls.full})`;
      document.body.style.backgroundSize = `${imageWidth}px ${imageHeight}px`;
    })
    .catch(error => console.log(error));
}

// Call the display functions when the page loads
window.onload = function() {
  displayGreeting();
  displayQuote();
  setBackgroundImage();
};
