"use strict";
(() => {
    const moviesList = document.querySelector('#movies-container');
    const dropdownStatus = document.querySelector('#dropdownStatus');
    let output = '';
    const renderMovies = (movies) => {
        $('#spinner').addClass('hidden');
        for(let movie of movies){
            console.log(movie.title)
            let id = movie.id;
            output +=

                `
                    <div class="card mb-2 ml-2" style="width: 18rem;">
                        <img src="${movie.poster}" height="250" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title text-capitalize">${movie.title}</h5>
                            <small class="text-muted">${movie.genre}</small>
                            <p class="card-text">${movie.plot}</p>
                        </div>
                        <div class="card-footer">
                            <span class="float-left">
                                <button class="ml-2 mt-2 mb-2 justify-self-right bg-primary edit-btn" id="edit-movie" value="${id}">Edit</button>
                            </span>
                            <span class="float-right">
                                <button class="mr-2 mt-2 mb-2 justify-self-right bg-danger delete-btn" id="delete-movie${id}" value="${id}">Delete</button>
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
                $('#title').val(data.title);
                $('#rating').val(data.rating);
                $('#year').val(data.year);
                $('#genre').val(data.genre);
                $('#director').val(data.director);
                $('#plot').val(data.plot);
                $('#actors').val(data.actors);
                $('#movieid').val(data.id);
                console.log($('#movieid').val())
                $('.added-details').toggleClass('hidden');
                $('#createmoviebtn').toggleClass('hidden');
                $('#editmoviebtn').toggleClass('hidden');
                $('.card-footer').toggleClass('hidden');
                dropdownStatus.innerHTML = 'EDIT MOVIE'
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
    }
    const API_URL = 'https://glen-hexagonal-microraptor.glitch.me/movies';
    fetch(API_URL)
        .then(response => response.json())
        .then(data => renderMovies(data));

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
        return fetch(API_URL, options)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                const dataArray = [];
                dataArray.push(data);
                renderMovies(dataArray);
            })
            .then(
                $('#title').val(''),
                $('#rating').val(''))

            .catch(err => console.error(err));
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
        $('.added-details').toggleClass('hidden');
        $('#editmoviebtn').toggleClass('hidden');
        $('#createmoviebtn').toggleClass('hidden');
        $('.card-footer').toggleClass('hidden');
        dropdownStatus.innerHTML = 'ADD MOVIE'
        console.log(movie.id);
        return fetch(`${API_URL}/${movie.id}`,options).then(resp => resp.json()).then(data => console.log(data)).catch(err => console.error(err))

    })

})();
