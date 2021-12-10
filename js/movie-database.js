"use strict";
(() => {
    const API_URL = 'https://glen-hexagonal-microraptor.glitch.me/movies';
    let getAllMovies = () => {
        return fetch(API_URL).then(resp => resp.json()).catch(err => console.error(err));
    }

    getAllMovies().then(response => {
        console.log(response);
        for (let movie of response) {
            console.log(movie.title)
            let output =
                `<div class="moviecard">
<div class="card" style="width: 18rem;">
            <img src="${movie.poster}" height="250" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-capatilize">${movie.title}</h5>
                <p class="card-text">${movie.plot}</p>
            </div>
        </div>
</div>`
            $('#movies').append(output)
        }
    })
        .catch((err) => {
            console.log(err);
        });
})();
