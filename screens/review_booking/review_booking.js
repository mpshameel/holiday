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



/*** Fare Summary Shimmer ***/
const guestInfoBtn = document.querySelector('.guest-info');
const fareSummaryDrawer = document.querySelector('.fare-summary');
const fareShimmer = document.getElementById('fare-shimmer');
const fareActual = document.getElementById('fare-actual-content');

guestInfoBtn.addEventListener('click', () => {
    fareSummaryDrawer.classList.add('show');
    fareShimmer.style.display = 'block';
    fareActual.style.display = 'none';

    setTimeout(() => {
        fareShimmer.style.transition = "opacity 0.3s ease";
        fareShimmer.style.opacity = "0";

        setTimeout(() => {
            fareShimmer.style.display = 'none';
            fareShimmer.style.opacity = "1";

            fareActual.style.display = 'block';

            fareActual.scrollTop = 0;
        }, 300);
    }, 2000);
});

/*** Footer Shimmer ***/
window.addEventListener('DOMContentLoaded', () => {
    const footerShimmer = document.getElementById('footer-shimmer');
    const footerContent = document.getElementById('footer-actual-content');

    setTimeout(() => {
        footerShimmer.style.transition = "opacity 0.4s ease";
        footerShimmer.style.opacity = "0";

        setTimeout(() => {
            footerShimmer.style.display = "none";
            footerContent.style.display = "flex";
        }, 400);

    }, 2000);
});