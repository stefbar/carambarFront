const header = document.querySelector("header")
window.addEventListener("scroll", (event) => {
  if (document.body.scrollTop > 10) {
    header.style.top = "-100px"
  } else {
    header.style.top = "0"
  }
}, true)

// throttle to prevent case when cta is clicked multiple times: answer appears 4 seconds after first click so it remains with the good joke
function throttle(mainFunction, delay) {
  let timerFlag = null
  return (...args) => {
    if (timerFlag === null) {
      mainFunction(...args)
      timerFlag = setTimeout(() => {
        timerFlag = null
      }, delay)
    }
  }
}

function fetchRandomJoke() {
  fetch("https://api-carambarjokes.onrender.com/api.carambarJokes/v1.0.0/random-joke/:randomId")
  .then(response => response.json())
  .then(data => {
    const jokeCategory = data.category_id;
    document.getElementById("getJoke").innerHTML = data.joke
    document.getElementById("getJokeAnswer").innerHTML = ""
    jokeCategory === 2 ? setTimeout(() => {
      document.getElementById("getJokeAnswer").innerHTML = data.answer
    }, 4000) : null
  })
}
const throttledFetch = throttle(fetchRandomJoke, 4000)

document.getElementById("getRandomJoke-btn").addEventListener('click', throttledFetch)

// function getRandomJoke() {
//     fetch("https://api-carambarjokes.onrender.com/api.carambarJokes/v1.0.0/random-joke/:randomId")
//     .then(response => response.json())
//     .then(data => {
//         // document.getElementById("getJokeId").innerHTML = data.id;
//         document.getElementById("getJoke").innerHTML = data.joke;
//         document.getElementById("getJokeAnswer").innerHTML = data.answer;
//         // document.getElementById("getJokeCategory").innerHTML = data.category_id;
//     })
// }
// document.getElementById("getRandomJoke-btn").addEventListener('click',
// () => getRandomJoke())

// function getAllJokes() {
//     fetch("https://api-carambarjokes.onrender.com/api.carambarJokes/v1.0.0/jokes")
//     .then(response => response.json())
//     .then(data => {
//         console.log('data: ', data);
//     })
// }
// document.getElementById("getAllJokes-btn").addEventListener('click', getAllJokes)