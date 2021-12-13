"use strict";
(() => {
    const API_URL = 'https://glen-hexagonal-microraptor.glitch.me/movies';
    let getAllMovies = () => {
        return fetch(API_URL).then(resp => resp.json()).catch(err => console.error(err));
    }

    getAllMovies().then(response => {
        $('#spinner').toggleClass('hidden');
        console.log(response);
        for (let movie of response) {
            console.log(movie.title)
            let id = movie.id;
            let output =

                `<div>
                    <div class="card" style="width: 18rem;">
                        <img src="${movie.poster}" height="250" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title text-capatilize">${movie.title}</h5>
                            <p class="card-text">${movie.plot}</p>
                        </div>
                        <div class="text-left">
                            <button class="mt-2 mb-2 justify-self-right edit-btn" id="edit-btn-${id}" value="${id}">Edit</button>
                        </div>
                        <div class="text-right">
                            <button class="mt-2 mb-2 justify-self-right delete-btn" id="delete-btn-${id}" value="${id}">Delete</button>
                        </div>
                    </div>
                </div>`
            $('#movies').append(output)
        }
        //CALLING THE DELETE BUTTON FUNCTION ONCE CLICKED ON DELETE-BTN
        $(".delete-btn").click(function (e) {
            e.preventDefault();
            console.log(this.value)
            deleteMovie(this.value).then(data => console.log(data))
        })
        //CALLING THE EDIT BUTTON FUNCTION - THIS FIRST FUNCTION IS THE ONE THAT FILLS OUT THE FORM
        $('.edit-btn').click(function () {

            getOneMovie(this.value).then(data => {
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
                $('.edit-btn').toggleClass('hidden')

            });
        })
    })
        .catch((err) => {
            console.log(err);
        });

    //DELETE FUNCTION
    function deleteMovie(id) {
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(`${API_URL}/${id}`, options)
    }

    //GET ONE MOVIE
    const getOneMovie = (id) => {
        return fetch(`${API_URL}/${id}`).then(resp => resp.json()).catch(err => console.error(err));
    }

})();
