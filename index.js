const header = document.querySelector("header")
window.addEventListener("scroll", (event) => {
  if (document.body.scrollTop > 10) {
    header.style.top = "-100px"
  } else {
    header.style.top = "0"
  }
}, true)

// warm up Render's server
function warmUp() {
  fetch("https://api-carambarjokes.onrender.com/api.carambarJokes/v1.0.0/random-joke/:randomId")
  .then(response => {
    if (response.ok) {
      console.log('Server is awake')   
    }
  })
  .catch(error => console.log('Error waking up server: ', error))
}
document.addEventListener('DOMContentLoaded', warmUp)

// fetching response loader
const loader = document.getElementById('loader')
loader.style.display = 'none'

// progress bar
const progressBar = document.getElementById('jokeAnswerComingProgressBar')
progressBar.style.display = 'none'
let intervalId

let currentProgress = 0
const maxProgress = 400

function updateProgress() {
  // progressBar.style.display = 'flex'
  currentProgress++
  progressBar.style.width = `${(currentProgress / maxProgress) * 100}%`
  if (currentProgress >= maxProgress) {
    clearInterval(intervalId)
    progressBar.style.display = 'none'
  }
}

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
  async function fetchRandomJoke() {
    progressBar.style.display = 'flex'
    progressBar.style.width = '0%'
    currentProgress = 0
    
    if(intervalId) {
      clearInterval(intervalId)
    }
    intervalId = setInterval(updateProgress, 10)
    
    try {
          loader.style.display = 'flex'
          const response = await fetch("https://api-carambarjokes.onrender.com/api.carambarJokes/v1.0.0/random-joke/:randomId")
          const data = await response.json()
          console.log('data: ', data)
          const jokeCategory = data.category_id
          document.getElementById("getJoke").innerHTML = data.joke
          
          
          document.getElementById("getJokeAnswer").innerHTML = ""
          jokeCategory === 2 ? setTimeout(() => {
              document.getElementById("getJokeAnswer").innerHTML = data.answer
          }, 4000) : null
      } catch (error) {
          console.log(error)
      } finally {
          loader.style.display = 'none'
      }
  }

  //   fetch("https://api-carambarjokes.onrender.com/api.carambarJokes/v1.0.0/random-joke/:randomId")
  //   .then(response => response.json())
  //   .then(data => {  
  //     const jokeCategory = data.category_id;
  //     document.getElementById("getJoke").innerHTML = data.joke
  //     document.getElementById("getJokeAnswer").innerHTML = ""
  //     jokeCategory === 2 ? setTimeout(() => {
  //       document.getElementById("getJokeAnswer").innerHTML = data.answer
  //     }, 4000) : null
  //   })
  //   .catch(error => console.log(error))
  //   .finally(() => {
  //     loader.style.display = 'none'
  //   })
  // }
  const throttledFetch = throttle(fetchRandomJoke, 4000)

  document.getElementById("getRandomJoke-btn").addEventListener('click', throttledFetch)

// function getAllJokes() {
//     fetch("https://api-carambarjokes.onrender.com/api.carambarJokes/v1.0.0/jokes")
//     .then(response => response.json())
//     .then(data => {
//         console.log('data: ', data);
//     })
// }
// document.getElementById("getAllJokes-btn").addEventListener('click', getAllJokes)