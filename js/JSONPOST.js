(() => {
    const API_URL = 'https://glen-hexagonal-microraptor.glitch.me/movies';
    $(document).ready(function () {
        // CREATING A MOVIE
        $('#createmoviebtn').click(function (e) {
            e.preventDefault();
            if ($('#title').val() === '') {
                alert('... what?')
            } else {
                let newMovie = {
                    title: $('#title').val().toLowerCase(),
                    rating: $('#rating').val(),
                }
                fetch(`http://www.omdbapi.com/?t=${newMovie.title}&apikey=${OMDB_KEY}`).then(resp => resp.json()).then(data => {
                    newMovie.poster = data.Poster;
                    newMovie.title = data.Title;
                    newMovie.year = data.Year;
                    newMovie.plot = data.Plot;
                    newMovie.genre = data.Genre;
                    newMovie.director = data.Director;
                    newMovie.actors= data.Actors;

                }).then(() => {
                    console.log(newMovie.poster)
                    createMovie(newMovie).then(data => console.log(data))
                })
                // createMovie(newMovie).then(data => console.log(data))
            }
        })
        const createMovie = (movie) => {
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            }
            return fetch(API_URL, options).then(resp => resp.json()).catch(err => console.error(err));
        }

        $('#editmoviebtn').click(function (e){
            e.preventDefault();
            let movie = {

                title: $('#title').val(),
                rating: $('#rating').val(),
                year: $('#year').val(),
                genre: $('#genre').val(),
                director: $('#director').val(),
                plot: $('#plot').val(),
                actors: $('#actors').val(),
                id: $('#movieid').val()
            }
            let options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            }
            $('.edit-btn').toggleClass('hidden');
            $('.added-details').toggleClass('hidden');
            $('#editmoviebtn').toggleClass('hidden');
            $('#createmoviebtn').toggleClass('hidden');
            console.log(movie.id);
            return fetch(`${API_URL}/${movie.id}`,options).then(resp => resp.json()).then(data => console.log(data)).catch(err => console.error(err))

        })


    })
})();