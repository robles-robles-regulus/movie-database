"use strict";
(() => {
    const moviesList = document.querySelector('#movies-container');
    let output = '';
    const renderMovies = (movies) => {
        $('#spinner').addClass('hidden');
        for(let movie of movies){
            console.log(movie.title)
            let id = movie.id;
            output +=

                `
                    <div class="card m-2" style="width: 18rem;">
                        <img src="${movie.poster}" height="250" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title text-capitalize">${movie.title}</h5>
                            <small class="text-muted">${movie.genre}</small>
                            <p class="card-text">${movie.plot}</p>
                        </div>
                        <div class="card-footer">
                            <span class="float-left">
                                <button type="button" class="btn btn-secondary edit-btn" data-toggle="modal" data-target="#staticBackdrop" value="${id}">
                                  <i class="fas fa-edit"></i>
                                </button>
                                
                                <!-- Modal -->
                                <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                  <div class="modal-dialog">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                      </div>
                                      <div class="modal-body">
                                        <form action="">
                                            <div>
                                                <label class="w-25 mt-2" for="editedTitle">TITLE:</label>
                                                <input class="w-75" type="text" id="editedTitle"><br>
                                            </div>
                                            <div>
                                                <label class="w-25 mt-2" for="EditedRating">RATING:</label>
                                                <select class="w-75 movieform" id="EditedRating">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>
                                            </div>
                                            <div class="added-details">
                                                <label class="w-25 mt-2" for="year">YEAR:</label>
                                                <input class="w-75" type="text" id="year">
                                            </div>
                                            <div class="added-details">
                                                <label class="w-25 mt-2" for="genre">GENRE:</label>
                                                <input class="w-75" type="text" id="genre">
                                            </div>
                                            <div class="added-details">
                                                <label class="w-25 mt-2" for="director">DIRECTOR:</label>
                                                <input class="w-75" type="text" id="director">
                                            </div>
                                            <div class="added-details">
                                                <label class="w-25 mt-2" for="actors">ACTORS:</label>
                                                <input class="w-75" type="text" id="actors">
                                            </div>
                                            <div class="added-details">
                                                <label class="w-25 mt-2" for="plot">PLOT:</label>
                                                <textarea class="w-75 p-0 m-0" type="textarea" id="plot"></textarea>
                                            </div>
                                            <p id="movieId">MOVIE ID:</p>
                                        </form>
                                      </div>
                                      <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" data-dismiss="modal" id="editMovieBtn">Update</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </span>
                            <span class="float-right">
                                <button class="btn btn-danger delete-btn" id="delete-movie${id}" value="${id}"><i class="fas fa-trash-alt"></i></button>
                            </span>    
                        </div>
                    </div>
                `
            moviesList.innerHTML = output;
        }
        //CALLING THE DELETE BUTTON FUNCTION ONCE CLICKED ON DELETE-BTN
        $(".delete-btn").click(function (e) {
            e.preventDefault();
            console.log(this.value)
            deleteMovie(this.value).then(data => console.log(data))
        })
        //CALLING THE EDIT BUTTON FUNCTION - THIS FIRST FUNCTION IS THE ONE THAT FILLS OUT THE FORM
        $('.edit-btn').click(function (e) {

            getOneMovie(this.value).then(data => {
                e.preventDefault();
                console.log(data);
                $('#editedTitle').val(data.title);
                $('#editedRating').val(data.rating);
                $('#year').val(data.year);
                $('#genre').val(data.genre);
                $('#director').val(data.director);
                $('#plot').val(data.plot);
                $('#actors').val(data.actors);
                $('#movieId').val(data.id);
                console.log($('#movieId').val())
            })
                .catch((err) => {
                    console.log(err);
                });
        })
        //DELETE FUNCTION
        function deleteMovie(id) {
            let options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            return fetch(`${API_URL}/${id}`, options)
                .then(() => location.reload())
        }
        //GET ONE MOVIE
        const getOneMovie = (id) => {
            return fetch(`${API_URL}/${id}`).then(resp => resp.json()).catch(err => console.error(err));
        }

        $('#editMovieBtn').click(function (e){
            e.preventDefault();
            console.log("clicking")
            let movie = {
                title: $('#editedTitle').val(),
                rating: $('#editedRating').val(),
                year: $('#year').val(),
                genre: $('#genre').val(),
                director: $('#director').val(),
                plot: $('#plot').val(),
                actors: $('#actors').val(),
                id: $('#movieId').val()
            }
            let options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            }
            console.log(movie.id);
            return fetch(`${API_URL}/${movie.id}`,options)
                .then(resp => resp.json())
                .then(data => console.log(data))
                .catch(err => console.error(err))

        })

    }
    const API_URL = 'https://glen-hexagonal-microraptor.glitch.me/movies';
    fetch(API_URL)
        .then(response => response.json())
        .then(data => renderMovies(data));

    // CREATING A MOVIE
    $('#createMovieBtn').click(function (e) {
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
        return fetch(API_URL, options)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                const dataArray = [];
                dataArray.push(data);
                renderMovies(dataArray);
            })
            .catch(err => console.error(err));
    }

})();
