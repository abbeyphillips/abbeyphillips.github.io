
let videoElement = document.getElementById("videoElement");
// the buttons for the controls
let playButton = document.getElementById("playButton");
let stopButton = document.getElementById("stopButton");
// the progress element
let progressBar = document.getElementById("progressBar");


videoElement.removeAttribute("controls");

document.getElementById("controlsWrapper").style.display = "flex";

videoElement.addEventListener('loadedmetadata', () => {
  progressBar.setAttribute('max', videoElement.duration);
});

videoElement.addEventListener("playing", () => {
 
  if (!progressBar.getAttribute('max')){
    progressBar.setAttribute('max', videoElement.duration);
  }
});

/* The fullscreen element is particularly important in the context of a tutorial video as users may want to zoom in
in order to see / understand the process better */

var elem = document.getElementById("videoElement");
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
/* The loop will allow users to replay or restart the video if they need to restart the tutorial */

let vid = document.getElementById("videoElement");

function enableLoop() { 
  vid.loop = true;
  vid.load(); }

/* LOADING */

videoElement.addEventListener("waiting", () => {
  progressBar.classList.add("timeline-loading");
});
videoElement.addEventListener("canplay", () => {
  progressBar.classList.remove("timeline-loading");
});

/* MEDIA FINSIHED */

videoElement.addEventListener("ended", () => {
  playButton.style.backgroundImage = "url('./icons/play.svg')";
});


/* PLAY/PAUSE */

function playPause(){
  if (videoElement.paused || videoElement.ended) {
   
    videoElement.play();
    
    playButton.style.backgroundImage = "url('./icons/pause.svg')";
  } else {
    
    videoElement.pause();
    
    playButton.style.backgroundImage = "url('./icons/play.svg')";
  }
}


playButton.addEventListener('click', playPause);

videoElement.addEventListener('click', playPause);

/* TIMELINE */

videoElement.addEventListener('timeupdate', () => {
  
  progressBar.value = videoElement.currentTime;
});

function scrubToTime(e){

  let x = e.clientX - (progressBar.getBoundingClientRect().left + window.scrollX);
  videoElement.currentTime = clampZeroOne(x / progressBar.offsetWidth) * videoElement.duration;
}

progressBar.addEventListener('mousedown', scrubToTime);
progressBar.addEventListener('mousedown', (e) => {
 
  window.addEventListener('mousemove', scrubToTime);
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', scrubToTime);
  });
});



/* HELPER FUNCTIONS */

function clampZeroOne(input){
  return Math.min(Math.max(input, 0), 1);
}

function logEvent(e){
  console.log(e);
}

