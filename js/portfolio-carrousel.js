let currentSlideIndex = 0
let slideCount

const TRANSITION_DURATION = 300
// Factorize this selector because of a bug on the Github action minifier
const CARROUSEL_ITEM_SELECT0R = "#carrousel-panel .carrousel-item"

function initCarrousel() {
    initCarrouselImgAfterLoad()
    $("#carrousel-panel button.next-slide-button").on("click", nextSlide)
    $("#carrousel-panel button.prev-slide-button").on("click", prevSlide)
    let allSlides = $(CARROUSEL_ITEM_SELECT0R);
    slideCount = allSlides.length
    allSlides.each((index, element) => {
        $(element).attr("aria-label", `${ index + 1 } sur ${ slideCount }`)
    })

    $("#carrousel-panel figure").on("click", openPortfolioDialog)
    $("#carrousel-panel figure").on("keydown", openPortfolioDialogOnSpaceAndEnter)
}

function initCarrouselImgAfterLoad() {
    $(window).on("load", () => {
        $("#carrousel-panel img").each((_, img) => {
            $(img).attr("src", $(img).attr("data-src"))
        })
    })
}

function openPortfolioDialogOnSpaceAndEnter(event) {
    if ([ "Enter", "Space", " " ].includes(event.key)) {
        event.preventDefault()
        openPortfolioDialog(event)
    }
}
function openPortfolioDialog(event) {
    let figure = $(event.target)
    // For some reason, when you're using a screen reader the target is on the image
    if (figure.prop("tagName") === "IMG") {
        figure = figure.parent()
    }

    const imgSrc = figure.children("img").attr("src")
    const captionContent = figure.children("figcaption")[0].innerText
    $("#portfolio-dialog .content img").attr("src", imgSrc)
    $("#portfolio-dialog .content #portfolio-dialog-details").text(captionContent)

    openDialog("portfolio-dialog", `.carrousel-item.active figure`)
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slideCount
    transitionSlide("next")
    adaptTitle("next")
}
function prevSlide() {
    currentSlideIndex = (currentSlideIndex <= 0 ? slideCount : currentSlideIndex) - 1
    transitionSlide("previous")
    adaptTitle("previous")
}

function getFadeClasses(direction) {
    const fadeOutClass = direction === "next" ? "fading-out-left" : "fading-out-right"
    const fadeInClass = direction === "next" ? "fading-in-right" : "fading-in-left"
    return {fadeOutClass, fadeInClass};
}

function transitionSlide(direction) {
    const {fadeOutClass, fadeInClass} = getFadeClasses(direction)

    $(`${ CARROUSEL_ITEM_SELECT0R }.active`).addClass(fadeOutClass)
    setTimeout(() => {
        $(`${ CARROUSEL_ITEM_SELECT0R }.active`).removeClass("active")

        $(`${ CARROUSEL_ITEM_SELECT0R }:nth-of-type(${ currentSlideIndex + 1 })`)
            .addClass("active")
            .addClass(fadeInClass)

        setTimeout(() => {
            $(CARROUSEL_ITEM_SELECT0R)
                .removeClass(fadeOutClass)
                .removeClass(fadeInClass)
        }, TRANSITION_DURATION)
    }, TRANSITION_DURATION)
}

function adaptTitle(direction) {
    const nextCategory = $(`${ CARROUSEL_ITEM_SELECT0R }:nth-of-type(${ currentSlideIndex + 1 })`).attr("data-category")
    const nextCategoryElement = $(`#hobbies-page h2 .title-part#title-${ nextCategory }`);
    const isNextCategoryVisible = !nextCategoryElement.hasClass("sr-only")

    if (!isNextCategoryVisible) {
        const {fadeOutClass, fadeInClass} = getFadeClasses(direction)
        const activePart = $("#hobbies-page h2 .title-part:not(.sr-only)");

        activePart.addClass(fadeOutClass)
        setTimeout(() => {
            activePart.addClass("sr-only")

            nextCategoryElement
                .removeClass("sr-only")
                .addClass(fadeInClass)

            setTimeout(() => {
                $("#hobbies-page h2 .title-part")
                    .removeClass(fadeOutClass)
                    .removeClass(fadeInClass)
            }, TRANSITION_DURATION)
        }, TRANSITION_DURATION)
    }
}

initCarrousel()