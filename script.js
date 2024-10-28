'use strict'

//*Radio Player Starts
const catchPlayPause = document.getElementById('playPause');
const catchBtnRadioCus = document.getElementById('btnRadioCus');
const catchHiddenRadio = document.getElementById('hiddenRadio');
const catchRadioOutput = document.getElementById('radioOutput');

function resRadioApi() {
    fetch(`https://mp3quran.net/api/v3/radios?language=eng`)
        .then(res => res.json())
        .then(data => getRadioApiData(data))
        .catch(error => alert('There must be some error'))
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
catchBtnRadioCus.addEventListener('click', function () {
    catchBtnRadioCus.style.display = 'none';
    catchHiddenRadio.style.display = 'block';
    resRadioApi();
})
//*Radio Player Ends
//*Surah Play Starts
const catchSurahSearchInpt = document.getElementById('surahSearchInpt');
const catchSurahNumberBtn = document.getElementById('surahNumberBtn');
const catchSurahOutput = document.getElementById('surahOutput');
const catchSurahLoader = document.getElementById('surahLoader');

function getInput() {
    const userValue = catchSurahSearchInpt.value;
    if (isNaN(userValue)) {
        alert('You have to enter number value!');
    } else if (userValue === '') {
        alert('You have to enter some value!');
    } else if (userValue <= 114) {
        resSurahApi(userValue);
    } else {
        alert('You have to enter number 1 to 114!');
    }
}

function resSurahApi(recUserValue) {
    catchSurahLoader.style.display = 'block';
    const inputValue = recUserValue;
    const apiOne = fetch(`http://api.alquran.cloud/v1/surah/${inputValue}/en.asad`)
    const apiTwo = fetch(`http://api.alquran.cloud/v1/surah/${inputValue}/ar.alafasy`)
    const apiThree = fetch(`http://api.alquran.cloud/v1/surah/${inputValue}/bn.bengali`)
    Promise.all([apiOne, apiTwo, apiThree])
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(data => getSurahApi(data[0], data[1], data[2]))
        .catch(error => alert('There must be some error'))
}

catchSurahLoader.style.display = 'none';

function getSurahApi(recSurahApiOne, recSurahApiTwo, recSurahApiThree) {
    const surahApiOne = recSurahApiOne;
    const surahApiTwo = recSurahApiTwo;
    const surahApiThree = recSurahApiThree;
    let ayahCount = 0;
    
    function surahPlay() {
        const surahAyah = surahApiTwo.data.ayahs.length;
        if (ayahCount < surahAyah) {
            catchSurahOutput.innerHTML = `
            <div class="surah_name flex flex-row justify-center gap-2">
            <p class="ar">${surahApiTwo.data.name}</p>
            <p class="en">${surahApiOne.data.englishName}</p>
            </div>
            <div>
            <audio id="surahPlayer" src="${surahApiTwo.data.ayahs[ayahCount].audio}" autoplay></audio>
            </div>
            <div class="surah_player_dgn flex flex-row justify-center gap-2 items-center">
            <span><i class="fa-solid fa-backward-fast"></i></span>
            <button id="surahPlayPause"><i class="fa-solid fa-circle-pause"></i></button>
            <span><i class="fa-solid fa-forward-fast"></i></span>
            </div>
            <div class="surah_tafsir flex flex-col items-center justify-center gap-2">
            <p class="ar">${surahApiTwo.data.ayahs[ayahCount].text}</p>
            <p class="en">${surahApiOne.data.ayahs[ayahCount].text}</p>
            <p class="bn">${surahApiThree.data.ayahs[ayahCount].text}</p>
            </div>
            `;
            const catchSurahPlayer = document.getElementById('surahPlayer');
            const catchSurahPlayPause = document.getElementById('surahPlayPause');
            catchSurahPlayer.onended = () => {
                ayahCount++;
                surahPlay();
            }
            function surahPlayPause() {
                if (catchSurahPlayer.paused) {
                    catchSurahPlayer.play();
                    catchSurahPlayPause.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
                } else {
                    catchSurahPlayer.pause();
                    catchSurahPlayPause.innerHTML = `<i class="fa-solid fa-circle-play"></i>`;
                }
            }
            catchSurahPlayPause.onclick = () => {
                surahPlayPause();
            }
        } else {
            alert('The Surah Has Ended');
            catchSurahOutput.innerHTML = `<p class="last_message">The End</p>`;
        }
    }
    surahPlay();
}

catchSurahNumberBtn.addEventListener('click', function () {
    getInput();
    catchSurahSearchInpt.value = '';
})

//*Surah Play Ends

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
//*Live TV Starts
const catchMakkahTvVideo = document.getElementById('makkahTvVideo');
const catchMakkahBtn = document.getElementById('makkahBtn');
const makkahUrl = `https://media2.streambrothers.com:1936/8122/8122/playlist.m3u8`;
const catchMakkahCrsBtn = document.getElementById('makkahCrsBtn');
const catchPeaceTvVideo = document.getElementById('peaceTvVideo');
const catchPeaceTvBtn = document.getElementById('peaceTvBtn');
const peaceTvUrl = `https://dzkyvlfyge.erbvr.com/PeaceTvBangla/index.m3u8`;
const catchPeaceCrsBtn = document.getElementById('peaceCrsBtn');

function makkahTvPlay() {
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(makkahUrl);
        hls.attachMedia(catchMakkahTvVideo);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = makkahUrl;
        video.addEventListener('canplay', function () {
            video.play();
        });
    }
}
catchMakkahBtn.addEventListener('click', function () {
    makkahTvPlay();
})
catchMakkahCrsBtn.addEventListener('click', function () {
    catchMakkahTvVideo.pause();
})

function peaceTvPlay() {
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(peaceTvUrl);
        hls.attachMedia(catchPeaceTvVideo);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = peaceTvUrl;
        video.addEventListener('canplay', function () {
            video.play();
        });
    }
}
catchPeaceTvBtn.addEventListener('click', function () {
    peaceTvPlay();
})
catchPeaceCrsBtn.addEventListener('click', function () {
    catchPeaceTvVideo.pause();
})
//*Live TV Ends
