"use strict";
(()=>{
    const API_URL = 'https://glen-hexagonal-microraptor.glitch.me/movies';
    let getAllMovies = () => {
        return fetch(API_URL).then(resp => resp.json()).catch(err => console.error(err));
    }

    getAllMovies().then(response => {
        console.log(response);
        for (let movie of response) {
            console.log(movie.title)
            let output =`
        <div class="row">
          <div class="col-4">
            <img src="${movie.poster}" class="thumbnail">
          </div>
          <div class="col-8">
            <h2>${movie.title}</h2>
            </div>`
            $('#movies').append(output)
        }
    })
        .catch((err) => {
            console.log(err);
        });
})();
