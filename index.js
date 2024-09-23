// Storing the Keywords
const textbox = document.querySelector(".dropdown-textbox");
let keywordsArray = [];

function addkeywords(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    let keywords = e.target.value;
    let keywordsArray = keywords.split(/\s+/);
    console.log(keywordsArray);
  }
}

// API keys0
const unsplashapi = "qn5kn57D8YrYKSteOKCC - k7DxnTHcFicqh1ujYwzA40";
const wallheavenapi = "yp59LaNvfcw1XulrM9LGd9GZoniho9pB";

// Creating and Storing endpoints
let UnsplashAPIendpoint = `https://api.unsplash.com/search/photos?query=${keywordsArray}&client_id=${unsplashapi}`;
let WallheavenAPIendpoint = `https://wallhaven.cc/api/v1/search?q=${keywordsArray}&apikey=${wallheavenapi}`;

// Fetch
async function fetch(UnsplashAPIendpoint) {
  try {
    const responseUnsplash = await fetch(UnsplashAPIendpoint);
    const dataUnsplash = await responseUnsplash.json();

    const responseWallheaven = await fetch(WallheavenAPIendpoint);
    const dataWallheaven = await responseWallheaven.json();

    console.log(dataUnsplash, dataWallheaven);
  } catch (error) {
    console.log("Error Fetching wallpapers ", error);
  }
}
