/*** Select Item ***/
document.addEventListener('DOMContentLoaded', () => {
    const bankItems = document.querySelectorAll('.bank-item');

    bankItems.forEach(item => {
        item.addEventListener('click', () => {
            bankItems.forEach(el => el.classList.remove('selected'));

            item.classList.add('selected');

            const bankName = item.querySelector('span').textContent;
            console.log("Selected Bank:", bankName);
        });
    });
});

/*** Select Bank ***/
document.addEventListener("DOMContentLoaded", () => {
    const bankGrid = document.querySelector(".bank-grid");

    if (bankGrid) {
        bankGrid.addEventListener("click", (e) => {
            const card = e.target.closest(".bank-card");

            if (card) {
                const allCards = bankGrid.querySelectorAll(".bank-card");
                allCards.forEach(c => c.classList.remove("active"));

                card.classList.add("active");

                const bankName = card.querySelector("span").innerText;
                console.log("Selected Bank:", bankName);
            }
        });
    }
});