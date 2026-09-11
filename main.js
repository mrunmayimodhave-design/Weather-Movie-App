import { getWeather } from "./weather.js";
import { searchMovies, getMovieDetails } from "./movie.js";

// Weather elements
const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const weatherButton = document.getElementById("weather-button");
const weatherMessage = document.getElementById("weather-message");
const weatherResult = document.getElementById("weather-result");

// Movie elements
const movieForm = document.getElementById("movie-form");
const movieInput = document.getElementById("movie-input");
const movieButton = document.getElementById("movie-button");
const movieMessage = document.getElementById("movie-message");
const movieResults = document.getElementById("movie-results");

// Modal elements
const movieModal = document.getElementById("movie-modal");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");


// ==================== WEATHER ====================

weatherForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") {
    showMessage(weatherMessage, "Please enter a city name.");
    return;
  }

  showMessage(weatherMessage, "");
  setButtonLoading(weatherButton, true, "Searching...");

  weatherResult.innerHTML = `
    <div class="loading">
      Loading weather...
    </div>
  `;

  try {
    const weather = await getWeather(city);

    renderWeather(weather);
  } catch (error) {
    weatherResult.innerHTML = "";
    showMessage(weatherMessage, error.message);
  } finally {
    setButtonLoading(weatherButton, false, "Search");
  }
});


// Display weather data
function renderWeather(data) {
  const {
    name,
    country,
    region,
    temperature,
    feelsLike,
    humidity,
    windSpeed,
    pressure,
    condition,
    icon,
    temperatureUnit,
    windUnit
  } = data;

  weatherResult.innerHTML = `
    <div class="weather-card">

      <div class="weather-top">

        <div class="weather-location">
          <h3>${escapeHTML(name)}, ${escapeHTML(country)}</h3>
          <p>${escapeHTML(region)}</p>
        </div>

        <div class="weather-main">
          <div class="weather-icon">${icon}</div>

          <div class="temperature">
            ${temperature}°${temperatureUnit}
          </div>

          <div class="condition">
            ${escapeHTML(condition)}
          </div>
        </div>

      </div>

      <div class="weather-details">

        <div class="detail-box">
          <span>Feels like</span>
          <strong>
            ${feelsLike}°${temperatureUnit}
          </strong>
        </div>

        <div class="detail-box">
          <span>Humidity</span>
          <strong>${humidity}%</strong>
        </div>

        <div class="detail-box">
          <span>Wind speed</span>
          <strong>
            ${windSpeed} ${windUnit}
          </strong>
        </div>

        <div class="detail-box">
          <span>Pressure</span>
          <strong>${pressure} hPa</strong>
        </div>

      </div>

    </div>
  `;
}


// ==================== MOVIES ====================

movieForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const query = movieInput.value.trim();

  if (query === "") {
    showMessage(movieMessage, "Please enter a movie name.");
    return;
  }

  showMessage(movieMessage, "");
  setButtonLoading(movieButton, true, "Searching...");

  movieResults.innerHTML = `
    <div class="loading">
      Finding movies...
    </div>
  `;

  try {
    const movies = await searchMovies(query);

    renderMovies(movies);
  } catch (error) {
    movieResults.innerHTML = "";
    showMessage(movieMessage, error.message);
  } finally {
    setButtonLoading(movieButton, false, "Search Movies");
  }
});


// Display movie cards
function renderMovies(movies) {
  if (!movies || movies.length === 0) {
    movieResults.innerHTML = `
      <div class="loading">
        No movies found.
      </div>
    `;
    return;
  }

  movieResults.innerHTML = movies
    .slice(0, 8)
    .map(function (movie) {

      let poster;

      if (movie.Poster && movie.Poster !== "N/A") {
        poster = `
          <img
            src="${escapeHTML(movie.Poster)}"
            alt="${escapeHTML(movie.Title)} poster"
          >
        `;
      } else {
        poster = `
          <div class="no-poster">
            No poster available
          </div>
        `;
      }

      return `
        <article class="movie-card">

          <div class="poster">
            ${poster}
          </div>

          <div class="movie-info">

            <h3>
              ${escapeHTML(movie.Title)}
            </h3>

            <p class="movie-meta">
              ${escapeHTML(movie.Year)} • Movie
            </p>

            <button
              class="details-btn"
              type="button"
              data-id="${escapeHTML(movie.imdbID)}"
            >
              View Details
            </button>

          </div>

        </article>
      `;
    })
    .join("");

  // Add click event to every View Details button
  const detailButtons =
    movieResults.querySelectorAll(".details-btn");

  detailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      openMovieDetails(button.dataset.id);
    });
  });
}


// ==================== MOVIE DETAILS ====================

async function openMovieDetails(imdbId) {
  movieModal.classList.add("show");
  movieModal.setAttribute("aria-hidden", "false");

  modalContent.innerHTML = `
    <div class="loading">
      Loading movie details...
    </div>
  `;

  try {
    const movie = await getMovieDetails(imdbId);

    renderMovieModal(movie);
  } catch (error) {
    modalContent.innerHTML = `
      <p class="message">
        ${escapeHTML(error.message)}
      </p>
    `;
  }
}


// Display movie details inside modal
function renderMovieModal(movie) {
  const {
    Title,
    Poster,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Actors,
    Plot,
    imdbRating
  } = movie;

  let poster;

  if (Poster && Poster !== "N/A") {
    poster = `
      <img
        class="modal-poster"
        src="${escapeHTML(Poster)}"
        alt="${escapeHTML(Title)} poster"
      >
    `;
  } else {
    poster = `
      <div class="no-poster">
        No poster available
      </div>
    `;
  }

  modalContent.innerHTML = `
    <div class="modal-layout">

      <div>
        ${poster}
      </div>

      <div>

        <h2 class="modal-title">
          ${escapeHTML(Title)}
        </h2>

        <div class="modal-meta">
          <span>${escapeHTML(Year || "N/A")}</span>
          <span>•</span>
          <span>${escapeHTML(Rated || "N/A")}</span>
          <span>•</span>
          <span>${escapeHTML(Runtime || "N/A")}</span>
        </div>

        <div class="rating">
          ⭐ IMDb ${escapeHTML(imdbRating || "N/A")}
        </div>

        <p class="modal-description">
          ${escapeHTML(Plot || "No plot available.")}
        </p>

        <p>
          <strong>Released:</strong>
          ${escapeHTML(Released || "N/A")}
        </p>

        <p>
          <strong>Genre:</strong>
          ${escapeHTML(Genre || "N/A")}
        </p>

        <p>
          <strong>Director:</strong>
          ${escapeHTML(Director || "N/A")}
        </p>

        <p>
          <strong>Actors:</strong>
          ${escapeHTML(Actors || "N/A")}
        </p>

      </div>

    </div>
  `;
}


// ==================== MODAL ====================

function closeModal() {
  movieModal.classList.remove("show");
  movieModal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);

movieModal.addEventListener("click", function (event) {
  if (event.target === movieModal) {
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});


// ==================== HELPERS ====================

function showMessage(element, message) {
  element.textContent = message;
}


function setButtonLoading(button, loading, text) {
  button.disabled = loading;
  button.textContent = text;
}


function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}