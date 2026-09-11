# SkyFlix - Weather & Movie Search App

SkyFlix is a responsive web application that combines real-time weather information with movie discovery in a single interface.

The project was developed using HTML5, CSS3 and modern JavaScript concepts. It uses REST APIs and asynchronous JavaScript to fetch and display dynamic information.

---

## Features

### Weather App

* Search weather by city name
* Current temperature
* Weather condition
* Humidity
* Wind speed
* Feels-like temperature
* Atmospheric pressure
* Weather icons
* Loading state
* Error handling
* Responsive design

### Movie Search App

* Search movies by title
* Display movie posters
* Release year
* Movie details
* IMDb rating
* Genre
* Director
* Cast
* Plot
* Movie details modal
* Invalid search handling
* Loading state
* Responsive movie grid

---

## Technologies Used

* HTML5
* CSS3
* JavaScript ES6+
* Fetch API
* REST APIs
* JSON
* Git
* GitHub

---

## JavaScript Concepts Demonstrated

This project demonstrates several modern JavaScript concepts:

* Arrow functions
* Template literals
* Destructuring
* ES6 modules
* Import and export
* Async/Await
* Promises
* Try/Catch error handling
* Fetch API
* DOM manipulation
* Event handling
* Form processing
* Dynamic rendering

---

## APIs Used

### Weather API

Open-Meteo API is used to retrieve location and current weather information.

### Movie API

OMDb API is used to search for movies and retrieve movie details.

An OMDb API key is required to use the movie search functionality.

---

## Project Structure

```text
Weather-Movie-App/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   ├── weather.js
│   └── movies.js
│
├── assets/
│   └── images/
│
└── README.md
```

---

## How to Run

1. Download or clone the repository.

2. Open the project folder in Visual Studio Code.

3. Open `js/movies.js`.

4. Replace:

```javascript
const API_KEY = "YOUR_OMDB_API_KEY";
```

with your OMDb API key.

5. Install the Live Server extension in VS Code.

6. Right-click `index.html`.

7. Select "Open with Live Server".

8. The SkyFlix application will open in the browser.

---

## Error Handling

The application handles common API and user errors, including:

* Empty search input
* Invalid city names
* Movies not found
* API failures
* Missing movie posters
* Network errors

---

## Responsive Design

The interface is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

---

## Project Objective

The objective of this project is to demonstrate practical implementation of:

1. REST API integration
2. Asynchronous JavaScript
3. Dynamic DOM manipulation
4. ES6+ JavaScript features
5. Responsive web design
6. Error handling
7. Modular JavaScript development

---

## Author

Mrunmayi Modhave

Minor Project - Weather & Movie Search Application
