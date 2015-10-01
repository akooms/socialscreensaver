// Fullscreen API, Source: http://robnyman.github.io/fullscreen/
// Additional resource: https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
// Activate fullscreen
(function () {
    // Target the #button-fullscreen id and set it to variable fullView
    var fullView = document.getElementById("button-fullscreen");
    // If fullView is selected add event listener to button-fullscreen
    // Once clicked run the Element.requestFullscreen() Function
    // Multiple browser support added too
    if (fullView) {
        fullView.addEventListener("click", function () {
            var docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
        }, false);
    }

    // Same as above but for cancel button to remove user from fullscreen mode
    var cancelFullScreen = document.getElementById("button-cancel");
    if (cancelFullScreen) {
        cancelFullScreen.addEventListener("click", function () {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }, false);
    }

})();
