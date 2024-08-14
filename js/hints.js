const HINT_INTERVAL = 3000;
const SUMMARY_PAGE_INDEX = 1;

let hintDisabled = false;

const initHints = (currentPageIndex) => {
    if (hintDisabled || currentPageIndex !== SUMMARY_PAGE_INDEX) {
        cleanHints()
        return;
    }

    $("#summary-page .panel").click(cleanHints).hover(cleanHints)
    $("#summary-page .panel a").on("focus", cleanHints)

    setTimeout(() => {
        $("#summary-page #presentation .bubble").addClass("hint")
    }, HINT_INTERVAL / 1.5)
}

const cleanHints = () => {
    $("#summary-page #presentation .bubble").removeClass("hint");
    hintDisabled = true;
}
