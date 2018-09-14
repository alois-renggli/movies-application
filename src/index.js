"use strict";
/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

getMovies().then((movies) => {
    document.getElementsByClassName("container")[0].innerText = "";

    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    document.getElementsByClassName("container")[0].innerHTML +=
        `<div class="movieList align-text-bottom row " id="${id}">
        <p class="col-4"># ${id} </p>
        <h5 class="col-12 text-truncate">${title}</h5>
        <p class="col-12">Rating: ${rating}</p>
        <button type="button" style="button" class="edit col-6"><i class="fas fa-edit"></i></button>
        <button type="button" style="button" class="deleteTest col-6"><i class="fas fa-trash-alt"></i></button>
        </div>`;

    });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});



let movieTitle = document.querySelector('#addMovieTitle');
let movieRating = document.querySelector('#addMovieRating');
let changeTitle = document.querySelector('#changeMovieTitle');
let changeRating = document.querySelector('#changeMovieRating');
let movieNum = document.querySelector('#selectMovieNum');
let deleteMovieNum = document.querySelector('#deleteMovieNum');


$('#addMovie').click(function(e){
    // e.preventDefault();
    // document.getElementsByClassName("container")[0].children().remove();

    const newMovie = {title: movieTitle.value, rating: movieRating.value};
        // const blogPost = {title: "test", rating: 1};
        const url = '/api/movies';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        };
        fetch(url, options)
            .then(/* post was created successfully */)
            .catch(/* handle errors */);
});

$('#changeMovie').click(function(){
    // e.preventDefault();
    const updateMovie = {title: changeTitle.value, rating: changeRating.value};
    // console.log( movieNum.value);
    const url = '/api/movies/' + movieNum.value ;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateMovie),
        // body: JSON.stringify(newMovie),
    };
    fetch(url, options)
        .then(/* post was created successfully */)
        .catch(/* handle errors */);
});

$('#deleteMovie').click(function(){
    // e.preventDefault();
    // console.log(deleteMovieNum.value);
    // e.preventDefault();
    // $(this).hide();
    // // console.log($(this));
    const url = '/api/movies/'+ deleteMovieNum.value;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: '',
    };
    fetch(url, options)
        .then(/* post was created successfully */)
        .catch(/* handle errors */);
});

$('.edit').click(function(){
    console.log($(this).parent().attr('id'));
    $("#changeMovieTitle").val($(this).parent().first().next().val());
    $("#changeMovieRating").val($(this).parent().first().next().val());
    $("#selectMovieNum").val($(this).parent().attr('id'));
});

$('.deleteTest').click(function(){
    // e.preventDefault();
    console.log($(this).parent().attr('id'));
    // e.preventDefault();
    // $(this).hide();
    // console.log($(this));
    const url = '/api/movies/'+ $(this).parent().attr('id');
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: '',
    };
    fetch(url, options)
        .then(/* post was created successfully */)
        .catch(/* handle errors */);
});

// $('.deleteTest').click(function () {
//     console.log('test');
// })
