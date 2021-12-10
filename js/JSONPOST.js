(() => {
    const API_URL = 'https://glen-hexagonal-microraptor.glitch.me/movies';
    $(document).ready(function () {

        $('#moviebtn').click(function (e) {
            e.preventDefault();
            let newMovie = {
                title: $('#title').val().toLowerCase(),
                rating: $('#rating').val(),
                year: $('#year').val(),
                genre: $('#genre').val(),
                director: $('#director').val(),
                plot: $('#plot').val(),
                actors: $('#actors').val(),
            }
            createMovie(newMovie).then(data => console.log(data))

        })


        let createMovie = (movie) => {
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            }
            return fetch(API_URL, options).then(resp => resp.json()).catch(err => console.error(err));
        }


    })
})();