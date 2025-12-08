/*** Dropdown Price ***/
const priceGroup = document.querySelector(".price-group");
const priceSelect = priceGroup.querySelector(".price-select");
const priceItems = priceGroup.querySelectorAll(".price-item");
const priceSelected = priceGroup.querySelector(".price-selected");

priceSelect.addEventListener("click", (e) => {
    priceGroup.classList.toggle("open");
});

priceItems.forEach(item => {
    item.addEventListener("click", () => {
        priceSelected.textContent = item.textContent;
        priceGroup.classList.remove("open");
    });
});

/*** Copy Promo Code ***/
const showTooltip = (container, text) => {
    if (container.querySelector(".copy-tooltip")) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = `Copied: ${text}`;

    console.log("Creating Tooltip:", tooltip);

    // 3. Append it to the container
    container.appendChild(tooltip);

    // 4. Force a repaint/reflow (needed sometimes to ensure transition works from opacity 0)
    void tooltip.offsetWidth;

    // 5. Show the tooltip by adding the 'visible' class
    tooltip.classList.add('visible');

    console.log("Tooltip 'visible' class added.");


    setTimeout(() => {
        tooltip.classList.remove('visible');

        console.log("Tooltip 'visible' class removed.");

        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
                console.log("Tooltip removed from DOM.");
            }
        }, 300);

    }, 1000);
};


const handleCopy = (container) => {
    const text = container.querySelector(".copy-text")?.innerText.trim();

    if (!text) {
        console.error("No copy text found.");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => {
            console.log(`Successfully copied: ${text}`);
            showTooltip(container, text);
        })
        .catch(err => console.error("Failed to copy text:", err));
};

document.body.addEventListener("click", (e) => {
    const copyContainer = e.target.closest(".copy-container");
    if (copyContainer) handleCopy(copyContainer);
});