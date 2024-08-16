let currentCategory = ""; // Track the current category being displayed
const songUrlsMap = {}; // Store song URLs for each category
let currentAudio = null; // Track the current playing audio instance
const playBar = document.querySelector(".play-barIcon-container img");
const playPauseToolTip = document.querySelector(".play-barIcon-container")
let songs = {
  "english-songs": [
    {
      url: "songs/english-songs/Arctic Monkeys - I Wanna Be Yours.mp3",
      title: "Arctic Monkeys - I Wanna Be Yours",
    },
    {
      url: "songs/english-songs/Ed Sheeran - Shape of You (Official Music Video).mp3",
      title: "Ed Sheeran - Shape of You (Official Music Video)",
    },
    {
      url: "songs/english-songs/Ruth B. - Dandelions (Lyrics).mp3",
      title: "Ruth B. - Dandelions (Lyrics)",
    },
    {
      url: "songs/english-songs/Luis Fonsi - Despacito ft. Daddy Yankee.mp3",
      title: "Luis Fonsi - Despacito ft. Daddy Yankee",
    },
  ],
  "nepali-songs": [
    {
      url: "songs/nepali-songs/KUTU MA KUTU (Movie Song) Rajanraj Shiwakoti _ DUI RUPAIYAN _ Asif Shah, Nischal, Swastima, Buddhi.mp3",
      title:
        "KUTU MA KUTU (Movie Song) Rajanraj Shiwakoti _ DUI RUPAIYAN _ Asif Shah, Nischal, Swastima, Buddhi",
    },
    {
      url: "songs/nepali-songs/Nepathya - Resham (रेशम).mp3",
      title: "Nepathya - Resham (रेशम)",
    },
    {
      url: "songs/nepali-songs/Resham firiri famous Nepali song.mp3",
      title: "Resham firiri famous Nepali song",
    },
  ],
  "hindi-songs": [
    {
      url: "songs/hindi-songs/JAWAN_ Chaleya (Hindi) _ Shah Rukh Khan _ Nayanthara _ Atlee _ Anirudh _ Arijit S, Shilpa R _ Kumaar.mp3",
      title:
        "JAWAN_ Chaleya (Hindi) _ Shah Rukh Khan _ Nayanthara _ Atlee _ Anirudh _ Arijit S, Shilpa R _ Kumaar",
    },
    {
      url: "songs/hindi-songs/Ve Kamleya Mere Nadan Dil (LYRICS) Arijit Singh & Shreya Ghoshal _ Ranveer, Alia _ Pritam.mp3",
      title:
        "Ve Kamleya Mere Nadan Dil (LYRICS) Arijit Singh & Shreya Ghoshal _ Ranveer, Alia _ Pritam",
    },
  ],
};

function fetchSongs(category) {
  const songsContainer = document.querySelector(".songs-container");

  // If the same category is clicked, don't re-fetch or re-render
  if (currentCategory === category) {
    return;
  }

  // Clear the container if a new category is selected
  songsContainer.innerHTML = "";
  currentCategory = category;

  // Initialize or clear the song URLs map for the category
  songUrlsMap[category] = [];

  for (let i in songs) {
    if (i === category) {
      songs[i].forEach((item) => {
        songsContainer.innerHTML += `
          <div class="song" data-url="${item.url}">
            <img
              src="https://spotify.freewebhostmost.com/img/music.svg"
              alt="Music Icon"
            />
            <span class="song-title">${item.title}</span>
            <strong>Play Now</strong>
            <img
              src="https://spotify.freewebhostmost.com/img/play.svg"
              alt="Play Icon"
            />
          </div>
        `;
      });
    }
  }
  songsContainer.style.display = "flex";

  // Add event listeners to the newly created song elements
  document.querySelectorAll(".song").forEach((item) => {
    item.addEventListener("click", () => {
      const songUrl = item.getAttribute("data-url");
      console.log("Playing song:", songUrl);
      playAudio(songUrl);
     playBar.src = "https://spotify.freewebhostmost.com/img/pause.svg";
   
    });
  });

}

const cards = document.querySelectorAll(".card");
cards.forEach((card, index) => {
  const categories = ["hindi-songs", "english-songs", "nepali-songs"]; // for category index
  card.addEventListener("click", () => {
    fetchSongs(categories[index]);
  });
});

function playAudio(url) {
  // If there's already an audio playing, pause it
  if (currentAudio) {
    currentAudio.pause();
    if (currentAudio.src === url) {
      // If the same song is clicked again, just pause and return
      currentAudio = null;
      return;
    }
  }

  // Create a new audio instance and play it
  currentAudio = new Audio(url);
  currentAudio.play();
  currentAudio.onloadedmetadata = () => {
    console.log("Duration:", currentAudio.duration);
  };

  // Synchronize the modifyTime function with the current audio
  modifyTime(currentAudio);

  // Update play status
  currentAudio.onended = () => {
    // Reset the current audio to null when the song ends
    currentAudio = null;
  };
}
function modifyTime(audio) {
  const preIcon = document.querySelector(".pre-icon-container");
  const postIcon = document.querySelector(".post-icon-container");

  // Assign new event listeners directly
  playBar.onclick = () => {
    if (audio.paused) {
      audio.play();
      playBar.src = "https://spotify.freewebhostmost.com/img/pause.svg"; // Change to pause icon when playing
    } else {
      audio.pause();
      playBar.src = "icons/play-btn.svg"; // Change to play icon when paused
    }
  };

  preIcon.onclick = () => {
    audio.currentTime -= 10;
  };

  postIcon.onclick = () => {
    audio.currentTime += 10;
  };

  // Update the playBar icon when the audio ends
  audio.onended = () => {
    playBar.src = "icons/play-btn.svg"; // Reset to play icon when audio ends
  };
}
document.querySelector(".hamburger").addEventListener("click",toggleNav)

function toggleNav(){
 const sideBar =  document.querySelector(".left");
if(!sideBar.classList.contains("side-bar")){
  sideBar.classList.add("side-bar");

}
else sideBar.classList.remove("side-bar")

}
