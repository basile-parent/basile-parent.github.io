// Handle swipe for mobile (inside scroll + change page)
function simulateInnerScrollOnMobile() {
    const allMobileScrollableElements = document.querySelectorAll(".mobile-scrollable")
    allMobileScrollableElements.forEach((element) => {
        let touchLastY = null

        element.addEventListener("touchmove", function (event) {
            // event.stopPropagation()
            if (touchLastY !== null) {
                const deltaY = touchLastY - event.changedTouches[0].clientY
                element.scrollTop += deltaY
            }

            touchLastY = event.changedTouches[0].clientY;
        }, false);

        element.addEventListener("touchend", function (event) {
            // event.stopPropagation()
            touchLastY = null;
        }, false);
    })
}

const SPEED_TO_SWIPE = 25
function initGoToNextPageOnSwipe() {
    let touchLastX = null;
    document.addEventListener("touchmove", function (event) {
        event.stopPropagation()
        if (touchLastX !== null) {
            const deltaX = touchLastX - event.changedTouches[0].clientX
            console.info("deltaX", deltaX)
            if (deltaX > SPEED_TO_SWIPE) {
                goToNextPage()
            } else if (deltaX < -SPEED_TO_SWIPE) {
                goToPrevPage()
            }
        }

        touchLastX = event.changedTouches[0].clientX;
    }, false);

    document.addEventListener("touchend", function () {
        touchLastX = null;
    }, false);
}

window.addEventListener("load", () => {
    simulateInnerScrollOnMobile()
    initGoToNextPageOnSwipe()
})
