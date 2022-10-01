const imageSlide = document.getElementsByClassName("bs-modal-slider-data")
const modalBodyImageSlide = document.getElementById("modalBodyImageSlide")
const modalSliderPreviewImage = document.getElementsByClassName("modal_slider_preview_image")[0]
const modalSliderBtnPrev = document.getElementsByClassName("modal_slider_btn_prev")[0]
const modalSliderBtnNext = document.getElementsByClassName("modal_slider_btn_next")[0]
let index = 0
for (const key in imageSlide) {
    if (Object.hasOwnProperty.call(imageSlide, key)) {
        const element = imageSlide[key]
        element.addEventListener("click", (e) => {
            index = Number(element.getAttribute("title"))
            modalSliderPreviewImage.classList.add("show")
            if (index === 0) {
                modalSliderBtnPrev.classList.add("disabled")
            } else {
                modalSliderBtnPrev.classList.remove("disabled")
            }
            if (index === imageSlide.length - 1) {
                modalSliderBtnNext.classList.add("disabled")
            } else {
                modalSliderBtnNext.classList.remove("disabled")
            }
            modalBodyImageSlide.childNodes.item(3).src = imageSlide[index].children[0].src // e.target.src 
        })
    }
}
modalSliderBtnPrev.addEventListener("click", (e) => {
    modalSliderBtnNext.classList.remove("disabled")
    modalSliderBtnPrev.classList.remove("disabled")
    modalSliderPreviewImage.classList.remove("show")

    setTimeout(() => {
        modalSliderPreviewImage.classList.add("show")
    }, 150)
    --index
    modalBodyImageSlide.childNodes.item(3).src = imageSlide[index].children[0].src
    if (index <= 0) {
        modalSliderBtnPrev.classList.add("disabled")
    }
})
modalSliderBtnNext.addEventListener("click", (e) => {
    modalSliderBtnNext.classList.remove("disabled")
    modalSliderBtnPrev.classList.remove("disabled")
    modalSliderPreviewImage.classList.remove("show")

    setTimeout(() => {
        modalSliderPreviewImage.classList.add("show")
    }, 150)

    ++index
    modalBodyImageSlide.childNodes.item(3).src = imageSlide[index].children[0].src
    if (index >= imageSlide.length - 1) {
        modalSliderBtnNext.classList.add("disabled")
    }
})