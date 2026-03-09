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


/*** Promo Drawer ***/
document.addEventListener('DOMContentLoaded', () => {

    const offers_link = document.querySelector('.offers-link');
    const promoDrawer = document.getElementById('promoDrawer');
    const overlay2 = document.querySelector('.overlay');

    const couponAppliedPopup = document.getElementById('couponAppliedPopup');
    const applyButtons = promoDrawer.querySelectorAll('.apply-btn');
    if (offers_link && promoDrawer && overlay2) {
        offers_link.addEventListener('click', () => {
            promoDrawer.classList.add('active');
            overlay2.style.display = 'block';
        });

        overlay2.addEventListener('click', () => {
            promoDrawer.classList.remove('active');
            overlay2.style.display = 'none';
        });
    }

    const showSuccessPopup = (couponCode) => {
        promoDrawer.classList.remove('active');
        overlay2.style.display = 'none';

        couponAppliedPopup.classList.add('active');

        console.log(`Coupon applied: ${couponCode}`);

        setTimeout(() => {
            couponAppliedPopup.classList.remove('active');
            console.log("Success popup closed.");
        }, 3000);
    };

    applyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            let appliedCode = 'N/A';

            const promoCard = e.target.closest('.promo-card');
            if (promoCard) {
                const couponInput = promoCard.querySelector('.promo-right input[type="text"]');
                appliedCode = couponInput ? couponInput.value : 'N/A';
            } else {
                const mainInput = promoDrawer.querySelector('.promo-input input[type="text"]');
                appliedCode = mainInput ? mainInput.value : 'N/A';
            }

            showSuccessPopup(appliedCode);
        });
    });
});



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