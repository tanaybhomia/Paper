// Storing the Keywords
const textbox = document.querySelector(".dropdown-textbox");
let keywordsArray = [];
let dataUnsplashGlobal = null;

function addkeywords(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    let keywords = e.target.value;
    keywordsArray = keywords.split(/\s+/);
    for (let i = 0; i < keywordsArray.length; i++) {
      fetchWallpaper(keywordsArray[i]);
    }
  }
}

// API keys
const unsplashapi = "qn5kn57D8YrYKSteOKCC-k7DxnTHcFicqh1ujYwzA40";
// const wallheavenapi = "yp59LaNvfcw1XulrM9LGd9GZoniho9pB";

// Fetching the Images
async function fetchWallpaper(keyword) {
  // API Endpoints
  let unsplashAPIEndpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&client_id=${unsplashapi}`;
  // let wallhavenAPIEndpoint = `https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(keyword)}&apikey=${wallheavenapi}`;

  try {
    const [responseUnsplash] = await Promise.all([
      fetch(unsplashAPIEndpoint),
      // fetch(wallhavenAPIEndpoint),
    ]);

    dataUnsplashGlobal = await responseUnsplash.json();
    imagegen(dataUnsplashGlobal);

    // const dataWallhaven = await responseWallhaven.json();
  } catch (error) {
    console.error("Error fetching wallpapers:", error);
  }
}

// Add event listener to the textbox
textbox.addEventListener("keypress", addkeywords);

// Creating image divs and filling the container
const containerdiv = document.querySelector(".content");
function imagegen(dataUnsplashGlobal) {
  // containerdiv.innerHTML = "";
  dataUnsplashGlobal.results.forEach((image) => {
    const itemdiv = document.createElement("div");
    itemdiv.classList.add("item");

    const photodiv = document.createElement("div");
    photodiv.classList.add("photo");

    const img = document.createElement("img");
    img.src = image.urls.raw;
    img.alt = image.alt_description || "from Unsplash";

    photodiv.appendChild(img);

    const namediv = document.createElement("div");
    namediv.classList.add("name");

    const link = document.createElement("a");
    link.href = image.links.html;
    link.target = "_blank";
    link.textContent = "Unsplash";

    namediv.appendChild(link);

    itemdiv.appendChild(photodiv);
    photodiv.appendChild(namediv);

    containerdiv.appendChild(itemdiv);
  });
}
