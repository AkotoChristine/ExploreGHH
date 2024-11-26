let navbarDiv = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40){
        navbarDiv.classList.add('navbar-cng');
    } else {
        navbarDiv.classList.remove('navbar-cng');
    }
});


const navbarCollapseDiv = document.getElementById('navbar-collapse');
const navbarShowBtn = document.getElementById('navbar-show-btn');
const navbarCloseBtn = document.getElementById('navbar-close-btn');
// show navbar
navbarShowBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.add('navbar-collapse-rmw');
});

// hide side bar
navbarCloseBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
});

document.addEventListener('click', (e) => {
    if(e.target.id != "navbar-collapse" && e.target.id != "navbar-show-btn" && e.target.parentElement.id != "navbar-show-btn"){
        navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
    }
});

// stop transition and animatino during window resizing
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
});

// Get references to the video and play button
const video = document.querySelector('.video-wrapper video');
const playButton = document.getElementById('play-btn');

// Play the video and hide the play button when it's clicked
playButton.addEventListener('click', () => {
    video.play(); // Start the video
    playButton.style.display = 'none'; // Completely hide the button
});

// Toggle pause/play by clicking the video
video.addEventListener('click', () => {
    if (video.paused) {
        video.play(); // Resume playback
    } else {
        video.pause(); // Pause the video
    }
});

// Function to handle form submission

  // Attach the function to the form
document.getElementById('contact').addEventListener('submit', submitContactForm);

  document.getElementById('contact').addEventListener('submit', async (event) => {
    event.preventDefault(); // Stop the form from refreshing the page

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
});

async function submitContactForm(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Send data to the backend
    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Success message
      } else {
        alert(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
}


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendContactUsData(formData);
      console.log('Backend response:', response); // Check the response in the browser console
      alert(response.message); // Notify user
    } catch (error) {
      console.error('Submission error:', error); // Log the error in the browser console
      alert('Submission failed. Please try again.');
    }
  };
  