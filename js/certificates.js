function resizeNoiseDivToFillParent() {
    document.getElementById("certificates-page-panel-noise").style.height = document.getElementById("certificates-page-panel").scrollHeight + "px"
}
window.addEventListener("load", resizeNoiseDivToFillParent)
window.addEventListener("resize", resizeNoiseDivToFillParent)