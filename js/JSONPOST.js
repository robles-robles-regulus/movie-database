(() => {
    const API_URL = 'https://glen-hexagonal-microraptor.glitch.me/movies';
    $(document).ready(function () {
        // CREATING A MOVIE
        $('#moviebtn').click(function (e) {
            e.preventDefault();
            if ($('#title').val() === '') {
                alert('... what?')
            } else {
                let newMovie = {
                    title: $('#title').val().toLowerCase(),
                    rating: $('#rating').val(),
                    year: $('#year').val(),
                    genre: $('#genre').val(),
                    director: $('#director').val(),
                    plot: $('#plot').val(),
                    actors: $('#actors').val(),
                }
                fetch(`http://www.omdbapi.com/?t=${newMovie.title}&apikey=${OMDB_KEY}`).then(resp => resp.json()).then(data => {
                    newMovie.poster = data.Poster

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


        // EDIT MOVIE FUNCTIONALITY

        $('#editmoviebtn').click(function () {
            editMovie(this.value).then(data => console.log(data))
        })

        const editMovie = (movie) => {
            let options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movie)
            }
            return fetch(`${API_URL}/${movie.id}`, options).then(resp => resp.json()).catch(err => console.error(err));
        }
    })
})();