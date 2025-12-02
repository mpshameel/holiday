/*** Gst Popup ***/
const gstPopup = document.getElementById("gstPopup");

const openGstDrawer = () => gstPopup?.classList.add("active");
const closeGstDrawer = () => gstPopup?.classList.remove("active");

document.body.addEventListener("click", (e) => {
    if (e.target.closest(".gstin-add")) openGstDrawer();
});

document.addEventListener("click", (e) => {
    if (
        gstPopup?.classList.contains("active") &&
        !e.target.closest("#gstPopup .gst-container") &&
        !e.target.closest(".gstin-add")
    ) {
        closeGstDrawer();
    }
});