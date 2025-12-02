/*** Book Appointment Popup ***/
const bookPopup = document.getElementById("bookAppointmentPopup");
const openBook = document.getElementById("openBookAppointment");
const closeBook = document.getElementById("closebookAppointmentPopup");

if (openBook && bookPopup && closeBook) {
    openBook.addEventListener("click", () => {
        bookPopup.classList.add("active");
    });

    closeBook.addEventListener("click", () => {
        bookPopup.classList.remove("active");
    });

    bookPopup.addEventListener("click", (e) => {
        if (e.target === bookPopup) {
            bookPopup.classList.remove("active");
        }
    });
}

/*** Open Thank You Popup ***/
const thankYouPopup = document.getElementById("thankYouPopup");
const openThankYouBtn = document.getElementById("openThankYou");

if (openThankYouBtn && thankYouPopup && bookPopup) {
    openThankYouBtn.addEventListener("click", () => {
        bookPopup.classList.remove("active");

        thankYouPopup.classList.add("active");
    });

    thankYouPopup.addEventListener("click", (e) => {
        if (e.target === thankYouPopup) {
            thankYouPopup.classList.remove("active");
        }
    });
}