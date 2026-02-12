const bankItems = document.querySelectorAll(".bank-item");
const creditDrawer = document.getElementById("creditDrawer");
const overlayCredit = document.querySelector(".overlay-credit");

const tickSrc = "../../assets/icons/tick.png";

bankItems.forEach(item => {
    item.addEventListener("click", () => {
        bankItems.forEach(el => {
            el.classList.remove('selected');
            const existingTick = el.querySelector('.tick');
            if (existingTick) existingTick.remove();
        });

        item.classList.add('selected');

        const tickImg = document.createElement('img');
        tickImg.src = tickSrc;
        tickImg.classList.add('tick');
        tickImg.alt = 'selected';
        item.appendChild(tickImg);

        if (creditDrawer && overlayCredit) {
            creditDrawer.classList.add("active");
            overlayCredit.style.display = "block";
        }
    });
});

if (overlayCredit) {
    overlayCredit.addEventListener("click", () => {
        creditDrawer.classList.remove("active");
        overlayCredit.style.display = "none";
    });
}