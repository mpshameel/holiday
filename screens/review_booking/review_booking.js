/*** Fare Summary Detail ***/
const guestInfo = document.querySelector('.guest-info');
const fareSummary = document.querySelector('.fare-summary');
const overlay = document.querySelector('.overlay');
const bottomBar = document.querySelector('.bottom-bar');

guestInfo.addEventListener('click', () => {
    fareSummary.classList.add('show');
    overlay.style.display = 'block';
    bottomBar.style.zIndex = '9999';
});

overlay.addEventListener('click', () => {
    fareSummary.classList.remove('show');
    overlay.style.display = 'none';
    bottomBar.style.zIndex = '999';
});


/*** TCS Popup ***/
const tcspopup = document.getElementById("tcspopup");
const openTcsBtn = document.querySelector(".open-tcs-btn");
const closeTcsBtn = document.getElementById("closeTcsPopup");

if (openTcsBtn && tcspopup && closeTcsBtn) {
    openTcsBtn.addEventListener("click", () => {
        tcspopup.classList.add("active");
    });

    closeTcsBtn.addEventListener("click", () => {
        tcspopup.classList.remove("active");
    });

    window.addEventListener("click", (event) => {
        if (event.target === tcspopup) {
            tcspopup.classList.remove("active");
        }
    });
}