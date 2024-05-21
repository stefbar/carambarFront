function getRandomJoke() {
    fetch("https://api-carambarjokes.onrender.com/api.carambarJokes/v1.0.0/random-joke/:randomId")
    .then(response => response.json())
    .then(data => {
        // document.getElementById("getJokeId").innerHTML = data.id;
        document.getElementById("getJoke").innerHTML = data.joke;
        document.getElementById("getJokeAnswer").innerHTML = data.answer;
        // document.getElementById("getJokeCategory").innerHTML = data.category_id;
    })
}
document.getElementById("getRandomJoke-btn").addEventListener('click',
() => getRandomJoke())

function getAllJokes() {
    fetch("https://api-carambarjokes.onrender.com/api.carambarJokes/v1.0.0/jokes")
    .then(response => response.json())
    .then(data => {
        console.log('data: ', data);
    })
}
document.getElementById("getAllJokes-btn").addEventListener('click', getAllJokes)