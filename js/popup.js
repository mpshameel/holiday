document.addEventListener("DOMContentLoaded", () => {
    /*** Credit EMI Drawer ***/
    const bankItems = document.querySelectorAll(".bank-item");
    const creditDrawer = document.getElementById("creditDrawer");
    const overlayCredit = document.querySelector(".overlay-credit");

    if (bankItems.length > 0 && creditDrawer && overlayCredit) {

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
    }



});

