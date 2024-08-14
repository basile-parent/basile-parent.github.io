function initIntroWithHrefHash() {
    // If there already is a hash in the URL, we don't show the intro page
    if (window.location.hash) {
        disableCoverAnimation()
        passAnimationSelectionPage()
    }
}

initIntroWithHrefHash()