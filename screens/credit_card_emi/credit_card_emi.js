const bankItems = document.querySelectorAll(".bank-item");
const creditDrawer = document.getElementById("creditDrawer");
const overlayCredit = document.querySelector(".overlay-credit");

// Path to your tick icon - make sure this matches your project structure
const tickSrc = "../../assets/icons/tick.png";

bankItems.forEach(item => {
    item.addEventListener("click", () => {
        // 1. REMOVE existing selection from all items
        bankItems.forEach(el => {
            el.classList.remove('selected');
            // Remove any existing tick image from other items
            const existingTick = el.querySelector('.tick');
            if (existingTick) existingTick.remove();
        });

        // 2. APPLY selection to the clicked item
        item.classList.add('selected');

        // 3. ADD the tick mark dynamically
        // Since your SCSS expects a .tick class, we create it here
        const tickImg = document.createElement('img');
        tickImg.src = tickSrc;
        tickImg.classList.add('tick');
        tickImg.alt = 'selected';
        item.appendChild(tickImg);

        // 4. OPEN the drawer
        if (creditDrawer && overlayCredit) {
            creditDrawer.classList.add("active");
            overlayCredit.style.display = "block";
        }
    });
});

// Close logic
if (overlayCredit) {
    overlayCredit.addEventListener("click", () => {
        creditDrawer.classList.remove("active");
        overlayCredit.style.display = "none";
    });
}