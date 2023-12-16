let song = document.getElementById("song");
let progress = document.getElementById("progress");
let play = document.getElementById("play");
let pause = document.getElementById("pause");
let songImg = document.querySelector(".imgs img");
let songName = document.querySelector(".music-content h3");
let artistName = document.querySelector(".music-content p");
let after = document.querySelector(".after");
let aftercontainer = document.querySelector(".after-container");
let playedTime = document.querySelector(".played-time");
let durationTime = document.querySelector(".duration-time");

let refreshIntervalId;

song.onloadedmetadata = () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
  aftercontainer.style.width = song.duration;
  durationTime.textContent = convertTimeToString(song.duration);
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
  after.style.width = `${progress.value / (song.duration / 100) + "%"}`;
};

const ProgressRange = () => {
  let song = document.getElementById("song");
  if (isPlaying(song)) {
    refreshIntervalId = setInterval(() => {
      progress.value = song.currentTime;
      after.style.width = `${progress.value / (song.duration / 100) + "%"}`;
      playedTime.textContent = convertTimeToString(song.currentTime);
    }, 500);
  } else {
    clearInterval(refreshIntervalId);
  }
};
function isPlaying(audelem) {
  return !audelem.paused;
}

let myPlayList = {
  names: ["just the two of us", "fly me to the moon", "million years ago"],
  songs: [
    "music/Just-The-Two-Of-Us.mp3",
    "music/Fly-Me-To-The-Moon.mp3",
    "music/Million-Years-Ago.mp3",
  ],
  images: [
    "imgs/just-the-two-of-us.png",
    "imgs/fly-me-to-the-moon.png",
    "imgs/million-years-ago.png",
  ],
  artists: ["Grover Washington Jr.", "Frank Sinatra", "adele"],
  currentIndex: 0,
};

function playNextSong() {
  myPlayList.currentIndex =
    (myPlayList.currentIndex + 1) % myPlayList.songs.length;

  song.src = myPlayList.songs[myPlayList.currentIndex];
  songImg.src = myPlayList.images[myPlayList.currentIndex];
  songName.textContent = myPlayList.names[myPlayList.currentIndex];
  artistName.textContent = myPlayList.artists[myPlayList.currentIndex];
  progress.value = song.currentTime;
  after.style.width = `${progress.value + "px"}`;
  song.play();
  ProgressRange();
  play.classList.add("active");
  pause.classList.remove("active");
}
function playpervSong() {
  myPlayList.currentIndex =
    (myPlayList.currentIndex - 1 + myPlayList.songs.length) %
    myPlayList.songs.length;

  song.src = myPlayList.songs[myPlayList.currentIndex];
  songImg.src = myPlayList.images[myPlayList.currentIndex];
  songName.textContent = myPlayList.names[myPlayList.currentIndex];
  artistName.textContent = myPlayList.artists[myPlayList.currentIndex];
  progress.value = song.currentTime;
  after.style.width = `${progress.value + "px"}`;
  song.play();
  ProgressRange();
  play.classList.add("active");
  pause.classList.remove("active");
}
function convertTimeToString(time) {
  totalNumberOfSeconds = Math.floor(time);
  let hours = parseInt(totalNumberOfSeconds / 3600);
  let minutes = parseInt((totalNumberOfSeconds - hours * 3600) / 60);
  let seconds = Math.floor(
    totalNumberOfSeconds - (hours * 3600 + minutes * 60)
  );
  let result =
    (minutes < 10 ? +minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  return result;
}
