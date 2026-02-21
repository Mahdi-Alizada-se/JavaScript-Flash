// Weather API Key
const weatherApiKey = "b7446b49769e7d7f8a13e374d39f004c";
// Weather API URL
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

// We need these images at the top of the file because we will use them in the gallery handler function
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

// We Need this array for the product section
const products = [
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 49.9,
    image: "./assets/products/img6.png",
  },
  {
    title: "Space Odissey",
    author: "Marie Anne",
    price: 35,
    image: "./assets/products/img1.png",
  },
  {
    title: "Doomed City",
    author: "Jason Cobert",
    price: 0,
    image: "./assets/products/img2.png",
  },
  {
    title: "Black Dog",
    author: "John Doe",
    price: 85.35,
    image: "./assets/products/img3.png",
  },
  {
    title: "My Little Robot",
    author: "Pedro Paulo",
    price: 0,
    image: "./assets/products/img5.png",
  },
  {
    title: "Garden Girl",
    author: "Ankit Patel",
    price: 45,
    image: "./assets/products/img4.png",
  },
];
// ************************************************************************************************************
// Menu Part
function menuHandler() {
  document
    .querySelector("#open-nav-menu")
    .addEventListener("click", function () {
      //   alert("helloworld");
      document
        .querySelector("header nav .wrapper ")
        .classList.toggle("nav-open");
    });
  document
    .querySelector("#close-nav-menu")
    .addEventListener("click", function () {
      //   alert("helloworld");
      document
        .querySelector("header nav .wrapper ")
        .classList.toggle("nav-open");
    });
}
// *************************************************************************************************************
// Celsius to Fahrnhiet Function

function celsiusToFahr(temperature) {
  let fahr = (temperature * 9) / 5 + 32;
  return fahr;
}
// ****************************************************************************************************************
// Greeting Part
function greetingHandler() {
  // Part 1 Time
  let currentHour = new Date().getHours();
  let greetingText;
  if (currentHour < 12) {
    greetingText = "Good Morning";
  } else if (currentHour < 18) {
    greetingText = "Good Afternoon";
  } else {
    greetingText = "Good Evening";
  }
  // The part 2 Text

  // Part 3 Text
  document.querySelector("#greeting").innerHTML = greetingText;
}

// ***********************************************************************************************************
// Weather Handler
function weatherHandler() {
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let url = weatherApiUrl
      .replace("{lat}", latitude)
      .replace("{lon}", longitude)
      .replace("{API key}", weatherApiKey);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const weatherCondition = data.weather[0].description;
        const userLocation = data.name;
        let temperature = data.main.temp;

        let celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(1)}°C outside`;
        let fahrText = `The weather is ${weatherCondition} in ${userLocation} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside`;

        document.querySelector("p#weather").innerHTML = celsiusText;

        // Part 4 Temperature Switch

        document
          .querySelector(".weather-group")
          .addEventListener("click", function (event) {
            if (event.target.id == "celsius") {
              document.querySelector("p#weather").innerHTML = celsiusText;
            } else {
              document.querySelector("p#weather").innerHTML = fahrText;
            }
          });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        document.querySelector("p#weather").innerHTML =
          "Unable to retrieve weather data.";
      });
  });
}
// ************************************************************************************************************
// Local Time Handler

function clockHandler() {
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
}
// ****************************************************************************************************************
// Gallery Handler

function galleryHandler() {
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
}
// ******************************************************************************************************************
// Product Section Handler
// Populate the product section with all products
function populateProducts(productList) {
  let productSection = document.querySelector(".products-area");
  productSection.textContent = "";

  productList.forEach(function (product, index) {
    // Create the HTML structure for each product and append it to the product section
    let productItem = document.createElement("div");
    productItem.classList.add("product-item");

    // Create the product image for product item
    let productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = "Image for " + product.title;

    // Create the product details for product item
    let productDetails = document.createElement("div");
    productDetails.classList.add("product-details");
    // Adding the title, author, price title and price to the product details
    // Titel part
    let productTitle = document.createElement("h3");
    productTitle.classList.add("product-title");
    productTitle.textContent = product.title;
    // Author part
    let productAuthor = document.createElement("p");
    productAuthor.classList.add("product-author");
    productAuthor.textContent = product.author;
    // Price Title part
    let priceTitle = document.createElement("p");
    priceTitle.classList.add("price-title");
    priceTitle.textContent = "Price";
    // Product Price value part
    let productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent =
      product.price > 0 ? "$" + product.price.toFixed(2) : "Free";
    // Add title, author, price title and price to the product details
    productDetails.append(productTitle);
    productDetails.append(productAuthor);
    productDetails.append(priceTitle);
    productDetails.append(productPrice);

    // Add all child HTML elements to the products Item
    productItem.append(productImage);
    productItem.append(productDetails);

    // Add complete individual product details to the product section
    productSection.append(productItem);
  });
}

function productHandler() {
  // filtering for free products
  let freeProducts = products.filter(function (item) {
    return !item.price || item.price <= 0;
  });

  // filtering for paid products

  let paidProducts = products.filter(function (item) {
    return item.price > 0;
  });

  // Adding that Populate Part
  populateProducts(products);
  let productsFilter = document.querySelector(".products-filter");
  productsFilter.addEventListener("click", function (event) {
    if (event.target.id === "all") {
      populateProducts(products);
    } else if (event.target.id === "free") {
      populateProducts(freeProducts);
    } else {
      populateProducts(paidProducts);
    }
  });

  // Adding The filtering part of Products

  // Filter  the Number of all Products
  document.querySelector(
    ".products-filter label[for=all] span.product-amount",
  ).textContent = products.length;
  // Filter the Number of Free Products
  document.querySelector(
    ".products-filter label[for=free] span.product-amount",
  ).textContent = freeProducts.length;
  // Filter the Number of Paid Products
  document.querySelector(
    ".products-filter label[for=paid] span.product-amount",
  ).textContent = paidProducts.length;
}

// ****************************************************************************************************************
// Footer Handler
function footerHandler() {
  let currentYear = new Date().getFullYear();
  document.querySelector("footer").textContent =
    `© ${currentYear} All rights reserved.`;
}
// ************************************************************************************************************

// Page Load Handler
menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHandler();
productHandler();
footerHandler();
