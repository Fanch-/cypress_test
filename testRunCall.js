const fetch = require('node-fetch');

fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => res.json()) // expecting a json response
    .then(json => {
        console.log(json.title);
    })
    .catch(err => {
        console.log(err);
    });