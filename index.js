const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
const logoCarambar = document.getElementById("header-carambar-logo");
const header = document.getElementById("header");
const heroImage = document.querySelector(".hero-img");

window.addEventListener("scroll", (event) => {
  if (document.body.scrollTop > 10) {
    // console.log(header.offsetTop);
    // console.log(heroImage.offsetTop);
    // console.log(document.body.scrollTop);
    header.style.top = "-100px";
  // logoCarambar.style.opacity = 0;
  } else {
    header.style.top = "0";
    // logoCarambar.style.opacity = 1;
  }
}, true);

function getRandomJoke() {
    fetch("https://api-carambarjokes.onrender.com/api.carambarJokes/v1.0.0/random-joke/:randomId")
    .then(response => response.json())
    .then(data => {
        // document.getElementById("getJokeId").innerHTML = data.id;
        document.getElementById("getJoke").innerHTML = data.joke
        document.getElementById("getJokeAnswer").innerHTML = data.answer
        // document.getElementById("getJokeCategory").innerHTML = data.category_id;
    })
}
document.getElementById("getRandomJoke-btn").addEventListener('click',
() => getRandomJoke())

// function getAllJokes() {
//     fetch("https://api-carambarjokes.onrender.com/api.carambarJokes/v1.0.0/jokes")
//     .then(response => response.json())
//     .then(data => {
//         console.log('data: ', data);
//     })
// }
// document.getElementById("getAllJokes-btn").addEventListener('click', getAllJokes)