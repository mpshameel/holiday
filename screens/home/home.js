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


/*** Search Popup ***/
const searchPopup = document.getElementById("searchPopup");
const searchBackBtn = searchPopup?.querySelector(".icon-btn");

const openSearch = () => searchPopup?.classList.add("active");
const closeSearch = () => searchPopup?.classList.remove("active");

document.body.addEventListener("click", (e) => {
    if (e.target.closest(".search-wrap")) openSearch();
});

document.addEventListener("click", (e) => {
    if (
        searchPopup?.classList.contains("active") &&
        !e.target.closest("#searchPopup .bottom-search-content") &&
        !e.target.closest(".search-wrap")
    ) {
        closeSearch();
    }
});

searchBackBtn?.addEventListener("click", closeSearch);

document.addEventListener("click", (e) => {
    if (searchPopup?.classList.contains("show") &&
        !searchPopup.contains(e.target) &&
        !searchArea.contains(e.target)) {
        closeSearch();
    }
});


// /*** City Item / Month Popup ***/
const monthPopup = document.getElementById("monthPopup");
const monthCloseBtn = monthPopup?.querySelector(".close-popup");

const openMonthPopup = () => {
    searchPopup?.classList.remove("active");
    monthPopup?.classList.add("active");
};
const closeMonthPopup = () => monthPopup?.classList.remove("active");

document.body.addEventListener("click", (e) => {
    if (e.target.closest(".city-item")) openMonthPopup();
    else if (monthPopup?.classList.contains("active") &&
        e.target === monthPopup) closeMonthPopup();
});

monthCloseBtn?.addEventListener("click", closeMonthPopup);


