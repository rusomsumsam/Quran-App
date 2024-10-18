'use strict'

//*Slider Section Starts
$('.first_slider').owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 3
        }
    }
})
//*Slider Section Ends

//*Radio Player Starts
const catchPlayPause = document.getElementById('playPause');
const catchRadioOutput = document.getElementById('radioOutput');

function resRadioApi() {
    fetch(`https://mp3quran.net/api/v3/radios?language=eng`)
        .then(res => res.json())
        .then(data => getRadioApiData(data))
}

function getRadioApiData(recRadioData) {
    const radioData = recRadioData;
    catchRadioOutput.innerHTML = `<audio id="radioPlayer" src="${radioData.radios[11].url}"></audio>`
    const catchRadioPlayer = document.getElementById('radioPlayer');
    function pausePlayBtn() {
        if (catchRadioPlayer.paused) {
            catchRadioPlayer.play();
            catchPlayPause.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
        } else {
            catchRadioPlayer.pause();
            catchPlayPause.innerHTML = `<i class="fa-solid fa-circle-play"></i>`;
        }
    }
    catchPlayPause.onclick = () => {
        pausePlayBtn();
    }
}