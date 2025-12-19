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