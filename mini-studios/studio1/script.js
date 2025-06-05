(function () {
    "use strict";
    const text1 = document.querySelector("#text1");
    const text2 = document.querySelector("#text2");
    const text3 = document.querySelector("#text3");
    const myVideo = document.querySelector("#myVideo");

    const texts = {
        start: [1, 11, 21],
        stop: [5, 15, 25],
        line: [text1, text2, text3]
    }

    // Call callback function (checkTime) every 1000 milliseconds (1 second)
    const intervalID = setInterval(checkTime, 1000);

    // Display Text based on video time
    function checkTime() {
        if (texts.start[0] < myVideo.currentTime && myVideo.currentTime < texts.stop[0]) {
            texts.line[0].className = "showing";
        } else {
            texts.line[0].className = "hidden";
        }
        if (texts.start[1] < myVideo.currentTime && myVideo.currentTime < texts.stop[1]) {
            texts.line[1].className = "showing";
        } else {
            texts.line[1].className = "hidden";
        }
        if (texts.start[2] < myVideo.currentTime && myVideo.currentTime < texts.stop[2]) {
            texts.line[2].className = "showing";
        } else {
            texts.line[2].className = "hidden";
        }

    }

    // Video Speed based on mouse position
    myVideo.addEventListener('mousemove', function (event) {
        console.log(event.clientX);
        myVideo.playbackRate = event.clientX / 300 + .25;
    });
})();