/*** Modify Search Drawer ***/
const searchDrawer = document.getElementById("searchDrawer");
const searchDrawerCloseBtn = document.getElementById("closeDrawer");

const openDrawer = () => searchDrawer?.classList.add("active");
const closeDrawer = () => searchDrawer?.classList.remove("active");

document.body.addEventListener("click", (e) => {
    if (e.target.closest(".appbar-text-column")) openDrawer();
});

document.addEventListener("click", (e) => {
    if (
        searchDrawer?.classList.contains("active") &&
        !e.target.closest("#searchDrawer .drawer-content") &&
        !e.target.closest(".appbar-text-column")
    ) {
        closeDrawer();
    }
});


/*** Filter Popup ***/
const filterPopup = document.getElementById("filterPopup");

const openFilterDrawer = () => filterPopup?.classList.add("active");
const closeFilterDrawer = () => filterPopup?.classList.remove("active");

document.body.addEventListener("click", (e) => {
    if (e.target.closest(".filter-btn")) openFilterDrawer();
});

document.addEventListener("click", (e) => {
    if (
        filterPopup?.classList.contains("active") &&
        !e.target.closest("#filterPopup .filter-container") &&
        !e.target.closest(".filter-btn")
    ) {
        closeFilterDrawer();
    }
});

/*** Price Range Slider ***/
const minRange = document.getElementById('minRange');
const maxRange = document.getElementById('maxRange');
const minVal = document.getElementById('minVal');
const maxVal = document.getElementById('maxVal');
const track = document.querySelector('.slider-track');

const minGap = 1000;

function updateSlider() {
    let min = parseInt(minRange.value);
    let max = parseInt(maxRange.value);

    if (max - min <= minGap) {
        if (event.target === minRange) minRange.value = max - minGap;
        else maxRange.value = min + minGap;
        min = parseInt(minRange.value);
        max = parseInt(maxRange.value);
    }

    minVal.textContent = min;
    maxVal.textContent = max + '+';

    const percent1 = ((min - minRange.min) / (minRange.max - minRange.min)) * 100;
    const percent2 = ((max - maxRange.min) / (maxRange.max - maxRange.min)) * 100;
    track.style.background = `linear-gradient(to right, #e5e7eb ${percent1}%, #0a6aff ${percent1}%, #0a6aff ${percent2}%, #e5e7eb ${percent2}%)`;
}

minRange.addEventListener('input', updateSlider);
maxRange.addEventListener('input', updateSlider);

updateSlider();