/*** Modify Search Drawer ***/
const searchDrawer = document.getElementById("searchDrawer");
const searchPopup = document.getElementById("searchPopup");
const searchBackBtn = searchPopup?.querySelector(".icon-btn");

const openDrawer = () => searchDrawer?.classList.add("active");
const closeDrawer = () => searchDrawer?.classList.remove("active");

const openSearch = () => searchPopup?.classList.add("active");
const closeSearch = () => searchPopup?.classList.remove("active");

document.addEventListener("click", (e) => {
    const insideAppbar = e.target.closest(".appbar-text-column") || e.target.closest(".right-img-edit");
    const insideDrawer = e.target.closest("#searchDrawer .drawer-content");
    const insidePopup = e.target.closest("#searchPopup .bottom-search-content");
    const isDestinationTrigger = e.target.closest(".from-city-group");

    if (insideAppbar) {
        openDrawer();
        return;
    }

    if (isDestinationTrigger) {
        openSearch();
        return;
    }

    if (searchDrawer?.classList.contains("active") && !insideDrawer && !insidePopup) {
        closeDrawer();
    }

    if (e.target === searchPopup) {
        closeSearch();
    }
});

searchBackBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeSearch();
});

const cityItems = searchPopup?.querySelectorAll(".city-item");
cityItems?.forEach(item => {
    item.addEventListener("click", () => {
        const cityName = item.querySelector(".city-name")?.textContent;
        const mainInput = document.getElementById("destination");
        if (mainInput && cityName) {
            mainInput.value = cityName;
        }
        closeSearch();
    });
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

// /*** Year Months ***/
document.addEventListener('DOMContentLoaded', () => {
    const yearDisplay = document.getElementById('currentYearDisplay');
    const prevYearBtn = document.getElementById('prevYear');
    const nextYearBtn = document.getElementById('nextYear');
    const monthButtons = document.querySelectorAll('.month-grid button');

    const today = new Date();
    const realYear = today.getFullYear();
    const realMonth = today.getMonth();

    let displayedYear = realYear;

    function updateMonthPicker() {
        yearDisplay.textContent = displayedYear;

        monthButtons.forEach((btn, index) => {
            btn.classList.remove('disabled');
            btn.classList.remove('active');

            if (displayedYear === realYear) {
                if (index < realMonth) {
                    btn.classList.add('disabled');
                }
            } else if (displayedYear < realYear) {
                btn.classList.add('disabled');
            }
        });

        prevYearBtn.style.opacity = (displayedYear <= realYear) ? "0.3" : "1";
        prevYearBtn.style.pointerEvents = (displayedYear <= realYear) ? "none" : "auto";

        nextYearBtn.style.opacity = (displayedYear >= realYear + 1) ? "0.3" : "1";
        nextYearBtn.style.pointerEvents = (displayedYear >= realYear + 1) ? "none" : "auto";
    }

    prevYearBtn.addEventListener('click', () => {
        if (displayedYear > realYear) {
            displayedYear--;
            updateMonthPicker();
        }
    });

    nextYearBtn.addEventListener('click', () => {
        if (displayedYear < realYear + 1) {
            displayedYear++;
            updateMonthPicker();
        }
    });

    monthButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            if (!this.classList.contains('disabled')) {
                monthButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const selectedMonth = this.textContent;
                console.log(`Selected: ${selectedMonth} ${displayedYear}`);

            }
        });
    });

    updateMonthPicker();
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

    filterPopup?.addEventListener("click", (e) => {
        if (e.target.closest(".continue-btn")) {
            closeFilterDrawer();
        }
    });
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