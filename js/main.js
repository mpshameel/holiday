// /*** Important  Info ***/
document.addEventListener("DOMContentLoaded", function () {
    const scrollTabBox = document.querySelector('.scrolltab-box');
    const tabButtons = scrollTabBox.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const targetSection = document.getElementById(targetId);

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

});

/*** International inputbox visible ***/
document.addEventListener("DOMContentLoaded", function () {
    const saveCheckbox = document.getElementById('saveCardCheckbox');
    const internationalBox = document.getElementById('internationalBox');

    function toggleInternationalBox() {
        internationalBox.style.display = saveCheckbox.checked ? 'block' : 'none';
    }

    toggleInternationalBox();
    saveCheckbox.addEventListener('change', toggleInternationalBox);

});



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

/*** Back ***/
document.getElementById("doneBtn").addEventListener("click", () => {
    window.history.back();
});


document.addEventListener("DOMContentLoaded", () => {
    const bankItems = document.querySelectorAll(".bank-item");
    const creditDrawer = document.getElementById("creditDrawer");
    const overlayCredit = document.querySelector(".overlay-credit");

    bankItems.forEach(item => {
        item.addEventListener("click", () => {
            creditDrawer.classList.add("active");
            overlayCredit.style.display = "block";
        });
    });

    overlayCredit.addEventListener("click", () => {
        creditDrawer.classList.remove("active");
        overlayCredit.style.display = "none";
    });
});

