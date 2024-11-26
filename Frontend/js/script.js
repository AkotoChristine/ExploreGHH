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

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
  };

  const statusMessage = document.getElementById('statusMessage');
  
  try {
      const response = await fetch('http://localhost:5501/api/contact', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
          statusMessage.textContent = 'Message sent successfully!';
          statusMessage.className = 'success';
          document.getElementById('contactForm').reset();
      } else {
          throw new Error(data.message || 'Error sending message');
      }
  } catch (error) {
      statusMessage.textContent = error.message;
      statusMessage.className = 'error';
  }
});