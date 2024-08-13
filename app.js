let currentCategory = ""; // Track the current category being displayed
const songUrlsMap = {}; // Store song URLs for each category
let currentAudio = null; // Track the current playing audio instance

// New base URL
const baseUrl = 'https://sushantpokhrel.github.io/Music-App'; 

function fetchSongs(category) {
  const songsContainer = document.querySelector(".songs-container");

  // If the same category is clicked, don't re-fetch or re-render
  if (currentCategory === category) {
    return;
  }

  // Clear the container if a new category is selected
  songsContainer.innerHTML = "";
  currentCategory = category;

  fetch(`${baseUrl}/songs/${category}`)
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      const div = document.createElement("div");
      div.innerHTML = data;
      const lis = div.getElementsByTagName("a");

      // Initialize or clear the song URLs map for the category
      songUrlsMap[category] = [];

      for (let i = 0; i < lis.length; i++) {
        if (lis[i].href.endsWith(".mp3")) {
          songUrlsMap[category].push(lis[i].href); // Store song URL

          songsContainer.innerHTML += `
            <div class="song" data-url="${lis[i].href}">
              <img
                src="${baseUrl}/img/music.svg"
                alt="Music Icon"
              />
              <span class="song-title">${lis[i].title}</span>
              <strong>Play Now</strong>
              <img
                src="${baseUrl}/img/play.svg"
                alt="Play Icon"
              />
            </div>`;
        }
      }
      songsContainer.style.display = "flex";

      // Add event listener to newly created song elements
      document.querySelectorAll(".song").forEach((item) => {
        item.addEventListener("click", () => {
          const songUrl = item.getAttribute("data-url");
          console.log("Playing song:", songUrl);
          playAudio(songUrl);
        });
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

const cards = document.querySelectorAll(".card");
cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    const categories = ["hindi-songs", "english-songs", "nepali-songs"]; // for category index
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
    console.log(currentAudio.duration); //due to browser not loading tracks
  };
  modifyTime(currentAudio);

  // Update play status
  currentAudio.onended = () => {
    // reset the current audio to null
    currentAudio = null;
  };
}

function modifyTime(song) {
  document
    .querySelector(".play-barIcon-container")
    .addEventListener("click", () => {
      if (song.paused) {
        song.play();
      } else {
        song.pause();
      }
    });
  document
    .querySelector(".pre-icon-container")
    .addEventListener("click", () => {
      song.currentTime -= 10;
    });
  document
    .querySelector(".post-icon-container")
    .addEventListener("click", () => {
      song.currentTime += 10;
    });
}
