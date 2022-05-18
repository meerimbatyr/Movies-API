"use strict";
// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const moviesSearchInput = document.querySelector(".form-control");
const placeForMovies = document.querySelector(".search-list");
const movieDescription = document.querySelector("#result-grid");

async function callAPI(movie) {
  //   console.log(movie);
  try {
    const req = await fetch(
      `https://omdbapi.com/?s=${movie}&page=1&apikey=9a2e7435`
    );
    const res = await req.json();
    //  console.log(res);
    //try to display the error message
    showAllMovies(res.Search);
  } catch (err) {
    console.log(err.message);
  }
}

//this pasrt is added and event everytime that i press akey on the input is calling the function callAPI

moviesSearchInput.addEventListener("keyup", function () {
  callAPI(moviesSearchInput.value);
});

function showAllMovies(movies) {
  // console.log(movies, "I will show all these movies"); //it is an array

  const allMyMovies = movies.map((el) => {
    return `<div class = "search-list-item" data-id=${el.imdbID}>
<div class = "search-item-thumbnail">
    <img src = ${el.Poster}>
</div>
<div class = "search-item-info">
    <h3>${el.Title}</h3>
    <p>${el.Year}</p>
</div>
</div>`;
  });
  //   console.log(allMyMovies.join(""));
  placeForMovies.innerHTML = allMyMovies.join("");

  const myArray = document.getElementsByClassName("search-list-item"); //is not an array is html collection
  //and it doesnt have the forEach method
  //   console.log(listOfMovies);

  const listOfMovies = Array.from(myArray);
  listOfMovies.forEach((el) => {
    document
      .querySelector(`[data-id=${el.dataset.id}]`)
      .addEventListener("click", function () {
        getOneMovie(el.dataset.id);
      });
  });
}
async function getOneMovie(movieId) {
  const req = await fetch(
    `http://www.omdbapi.com/?i=${movieId}&apikey=9a2e7435`
  );
  const res = await req.json();
  console.log(res);
  const movieToShow = `
  <div class = "movie-poster">
                        <img src = ${res.Poster} alt = "movie poster">
                    </div>
                    <div class = "movie-info">
                        <h3 class = "movie-title">${res.Title}</h3>
                        <ul class = "movie-misc-info">
                            <li class = "year">Year: ${res.Year}</li>
                            <li class = "rated">Ratings: ${res.Rated}</li>
                            <li class = "released">Released: ${res.Released}</li>
                        </ul>
                        <p class = "genre"><b>Genre:</b> ${res.Genre}</p>
                        <p class = "writer"><b>Writer:</b> ${res.Writer}</p>
                        <p class = "actors"><b>Actors: </b> ${res.Actors}</p>
                        <p class = "plot"><b>Plot:</b> ${res.Plot}.</p>
                        <p class = "language"><b>Language:</b> ${res.Language}</p>
                        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${res.Awards}</p>
                    </div>
  `;
  placeForMovies.innerHTML = "";
  movieDescription.innerHTML = movieToShow;
  moviesSearchInput.innerHTML = "";
}
