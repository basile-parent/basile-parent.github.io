function updateSkipLinksWithPageBook(currentPageIndex) {
    const currentPage = $("#cv-book .page")[currentPageIndex]
    if (!currentPage) {
        console.warn("Could not update skip links with the current page. Index: ", currentPageIndex)
    }

    $("#skip-link-content").attr("href", `#${ currentPage.id }`)
}