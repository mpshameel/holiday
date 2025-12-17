/*** Modify Search Drawer ***/
const searchDrawer = document.getElementById("searchDrawer");
const searchDrawerCloseBtn = document.getElementById("closeDrawer");

const openDrawer = () => searchDrawer?.classList.add("active");
const closeDrawer = () => searchDrawer?.classList.remove("active");

document.addEventListener("click", (e) => {
    const insideAppbar = e.target.closest(".appbar-text-column") || e.target.closest(".right-img-edit");

    const insideDrawer = e.target.closest("#searchDrawer .drawer-content");

    if (insideAppbar) {
        openDrawer();
        return;
    }

    if (searchDrawer?.classList.contains("active") && !insideDrawer) {
        closeDrawer();
    }
});

/*** Month Popup ***/
const monthPopup = document.getElementById("monthPopup");
const monthCloseBtn = monthPopup?.querySelector(".close-popup");

const openMonthPopup = () => {
    monthPopup?.classList.add("active");
};
const closeMonthPopup = () => monthPopup?.classList.remove("active");

document.body.addEventListener("click", (e) => {
    if (e.target.closest(".updateMonth")) openMonthPopup();
    else if (monthPopup?.classList.contains("active") &&
        e.target === monthPopup) closeMonthPopup();
});

monthCloseBtn?.addEventListener("click", closeMonthPopup);


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

/*** Filter Tabs ***/
document.addEventListener('DOMContentLoaded', () => {
    const filterTabsContainer = document.querySelector('.filter-tabs');
    if (!filterTabsContainer) return;

    const filterTabs = filterTabsContainer.querySelectorAll('.filter-tab');

    filterTabs.forEach(clickedTab => {
        clickedTab.addEventListener('click', (event) => {

            const currentActiveTab = filterTabsContainer.querySelector('.filter-tab.active');

            if (clickedTab === currentActiveTab) {
                const currentDirection = clickedTab.getAttribute('data-direction');
                const newDirection = (currentDirection === 'down' ? 'up' : 'down');
                clickedTab.setAttribute('data-direction', newDirection);

            } else {
                if (currentActiveTab) {
                    currentActiveTab.classList.remove('active');
                    currentActiveTab.setAttribute('data-direction', 'down');
                }

                clickedTab.classList.add('active');
                clickedTab.setAttribute('data-direction', 'down');
            }
        });
    });
});


/*** Check Box Type ***/
document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".checkbox-group").forEach(group => {

        group.addEventListener("change", (e) => {
            if (e.target.type === "checkbox") {

                // Which group
                const groupName = group.dataset.group;

                // Which checkbox clicked
                const clickedValue = e.target.dataset.value;

                // All selected in this group
                const selectedValues = [...group.querySelectorAll("input[type='checkbox']:checked")]
                    .map(cb => cb.dataset.value);

                console.log("Group:", groupName);
                console.log("Clicked:", clickedValue);
                console.log("Selected values:", selectedValues);
            }
        });

    });

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


/*** Radio Type ***/
document.querySelectorAll('input[name="duration"]').forEach(radio => {
    radio.addEventListener('change', () => {
        console.log("Selected duration:", radio.value);
    });
});

document.getElementById("resetBtn").addEventListener("click", () => {

    /* ---- CHECKBOX RESET ---- */
    document.querySelectorAll(".checkbox-group input[type='checkbox']").forEach(ch => {
        ch.checked = false; // uncheck all
    });

    /* ---- RADIO RESET ---- */
    // Select the first radio as default checked
    const radioGroups = {};
    document.querySelectorAll("input[type='radio']").forEach(radio => {
        const groupName = radio.name;

        if (!radioGroups[groupName]) {
            radioGroups[groupName] = radio;
        }
    });

    for (let key in radioGroups) {
        radioGroups[key].checked = true;
    }

    /* ---- TABS RESET ---- */
    const tabs = document.querySelectorAll(".filter-tab");
    tabs.forEach(t => t.classList.remove("active"));
    if (tabs[0]) tabs[0].classList.add("active");

    /* ---- PRICE RANGE RESET ---- */
    const minRange = document.getElementById("minRange");
    const maxRange = document.getElementById("maxRange");
    const minVal = document.getElementById("minVal");
    const maxVal = document.getElementById("maxVal");

    minRange.value = minRange.min;
    maxRange.value = maxRange.max;

    minVal.textContent = minRange.min;
    maxVal.textContent = maxRange.max + "+";

    // Update the slider background
    if (typeof updateSlider === "function") updateSlider();

    /* ---- PRINT RESET (optional) ---- */
    console.log("All filters reset.");
});


/*** Liked Items ***/
document.addEventListener('DOMContentLoaded', () => {

    const appBarWrapper = document.getElementById('appBarLikedWrapper');
    if (!appBarWrapper) {
        console.error("App bar liked wrapper not found.");
        return;
    }
    const badgeElement = appBarWrapper.querySelector('.badge');

    let globalLikeCount = 0;

    function updateAppBarState(count) {
        count = Math.max(0, count);

        badgeElement.textContent = count;

        if (count > 0) {
            appBarWrapper.classList.add('active-likes');
        } else {
            appBarWrapper.classList.remove('active-likes');
        }
    }


    const cardLikeButtons = document.querySelectorAll('.card-like-btn');

    updateAppBarState(globalLikeCount);

    cardLikeButtons.forEach(button => {

        button.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();

            const isLiked = button.classList.toggle('liked');

            if (isLiked) {
                globalLikeCount++;
            } else {
                globalLikeCount--;
            }

            updateAppBarState(globalLikeCount);
        });
    });
});


/*** View All ***/
document.querySelectorAll('.checkbox-group .show-all').forEach(link => {

    link.addEventListener('click', (e) => {
        e.preventDefault();

        const group = link.closest('.checkbox-group');
        const isExpanded = group.classList.toggle('expanded');

        link.textContent = isExpanded ? 'Show less' : 'Show all';
    });
});