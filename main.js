document.querySelector("#open-nav-menu").addEventListener("click", function () {
  //   alert("helloworld");
  document.querySelector("header nav .wrapper ").classList.toggle("nav-open");
});
document
  .querySelector("#close-nav-menu")
  .addEventListener("click", function () {
    //   alert("helloworld");
    document.querySelector("header nav .wrapper ").classList.toggle("nav-open");
  });

let currentHour = new Date().getHours();
let greetingText;
if (currentHour < 12) {
  greetingText = "Good Morning";
} else if (currentHour < 18) {
  greetingText = "Good Afternoon";
} else {
  greetingText = "Good Evening";
}

const weatherCondition = "suny";
const userLocation = "Kabul";
let temperature = 30;

let celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(1)}°C outside`;
let fahrText = `The weather is ${weatherCondition} in ${userLocation} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside`;
document.querySelector("#greeting").innerHTML = greetingText;
document.querySelector("p#weather").innerHTML = celsiusText;

function celsiusToFahr(temperature) {
  let fahr = (temperature * 9) / 5 + 32;
  return fahr;
}

document
  .querySelector(".weather-group")
  .addEventListener("click", function (event) {
    if (event.target.id == "celsius") {
      document.querySelector("p#weather").innerHTML = celsiusText;
    } else {
      document.querySelector("p#weather").innerHTML = fahrText;
    }
  });

// new Date().getHours()
// new Date().getMinutes()
// new Date().getSeconds()

setInterval(function () {
  let localTime = new Date();
  document.querySelector("span[data-time=hours]").textContent = localTime
    .getHours()
    .toString()
    .padStart(2, "0");

  document.querySelector("span[data-time=minutes]").textContent = localTime
    .getMinutes()
    .toString()
    .padStart(2, "0");

  document.querySelector("span[data-time=seconds]").textContent = localTime
    .getSeconds()
    .toString()
    .padStart(2, "0");
}, 1000);

const galleryImages = [
  {
    src: "./assets/gallery/image1.jpg",
    alt: "Thumbnail Image 1",
  },
  {
    src: "./assets/gallery/image2.jpg",
    alt: "Thumbnail Image 2",
  },
  {
    src: "./assets/gallery/image3.jpg",
    alt: "Thumbnail Image 3",
  },
];

// for (let i in galleryImages) {
//   console.log(galleryImages[i]);
// }

let mainImage = document.querySelector("#gallery > img");
let thumbnails = document.querySelector("#gallery .thumbnails");
//  <img src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1" data-array-index="0" data-selected="true">
mainImage.src = galleryImages[0].src;
mainImage.alt = galleryImages[0].alt;
galleryImages.forEach(function (image, index) {
  let thumb = document.createElement("img");
  thumb.src = image.src;
  thumb.alt = image.alt;
  thumb.dataset.arrayIndex = index;
  thumb.dataset.selected = index === 0 ? true : false;
  thumb.addEventListener("click", function (event) {
    let selectedIndex = event.target.dataset.arrayIndex;
    let selectedImage = galleryImages[selectedIndex];
    mainImage.src = selectedImage.src;
    mainImage.alt = selectedImage.alt;

    thumbnails.querySelectorAll("img").forEach(function (img) {
      img.dataset.selected = false;
    });
    event.target.dataset.selected = true;
  });
  thumbnails.appendChild(thumb);
});
