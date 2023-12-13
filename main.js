let song = document.getElementById("song");
let progress = document.getElementById("progress");
let play = document.getElementById("play");
let pause = document.getElementById("pause");

// let pussy = document.querySelector(".pussy");

let after = document.querySelector(".after");
let aftercontainer = document.querySelector(".after-container");

// let width = 0;
let refreshIntervalId;

song.onloadedmetadata = () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
  aftercontainer.style.width = `${song.duration + "px"}`;
};
const playPause = () => {
  if (pause.classList.contains("active")) {
    song.play();
    play.classList.add("active");
    pause.classList.remove("active");
    ProgressRange();
  } else {
    song.pause();
    play.classList.remove("active");
    pause.classList.add("active");
    ProgressRange();
  }
};
progress.onchange = () => {
  song.play();
  song.currentTime = progress.value;
  play.classList.add("active");
  pause.classList.remove("active");
  after.style.width = `${song.currentTime + "px"}`;
};

const ProgressRange = () => {
  let song = document.getElementById("song");
  if (isPlaying(song)) {
    refreshIntervalId = setInterval(() => {
      progress.value = song.currentTime;
      console.log(song.currentTime);
      after.style.width = `${progress.value + "px"}`;
    }, 500);
  } else {
    clearInterval(refreshIntervalId);
  }
};
function isPlaying(audelem) {
  return !audelem.paused;
}
