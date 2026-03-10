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


// /*** Shimmer ***/
window.addEventListener('DOMContentLoaded', () => {
    const shimmer = document.getElementById('shimmer-wrapper');
    const content = document.getElementById('main-content');

    setTimeout(() => {
        shimmer.style.transition = "opacity 0.5s ease";
        shimmer.style.opacity = "0";

        setTimeout(() => {
            shimmer.style.display = "none";
            content.style.display = "block";
        }, 500);
    }, 4000);
});


// /*** Top Bottom Arrow ***/
const scrollBtn = document.getElementById('scrollToggle');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollBtn.classList.add('pointing-up');
    } else {
        scrollBtn.classList.remove('pointing-up');
    }
});

scrollBtn.addEventListener('click', () => {
    if (scrollBtn.classList.contains('pointing-up')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }
});

// /*** Loader ***/
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');

    setTimeout(() => {
        loader.style.transition = "opacity 0.6s ease";
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.remove();
        }, 600);
    }, 2000);
});


/*** Fab Button ***/
const helpFab = document.querySelector('.help-fab');
const contactOverlay = document.querySelector('.contact-overlay');

helpFab.addEventListener('click', () => {
    contactOverlay.classList.toggle('active');
    helpFab.classList.toggle('active');
});

contactOverlay.addEventListener('click', (e) => {
    if (e.target === contactOverlay) {
        contactOverlay.classList.remove('active');
        helpFab.classList.remove('active');
    }
});


/*** Callback Popup ***/
const callBackBtn = document.getElementById("callBackBtn");
const callBackPopup = document.getElementById("callBackPopup");
const closeCallBack = document.getElementById("closeCallbackPopup");

callBackBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    callBackPopup.classList.add("active");
    popup.classList.remove("active");
});

closeCallBack.addEventListener("click", () => {
    callBackPopup.classList.remove("active");
});

callBackPopup.addEventListener("click", (e) => {
    if (e.target === callBackPopup) {
        callBackPopup.classList.remove("active");
    }
});

/*** Open Request Submitted Popup ***/
const requestPopup = document.getElementById("requestSubmittedPopup");
const openRequestBtn = document.getElementById("openRequestBtn");

if (openRequestBtn && requestPopup && callBackPopup) {
    openRequestBtn.addEventListener("click", () => {
        callBackPopup.classList.remove("active");

        requestPopup.classList.add("active");
    });

    requestPopup.addEventListener("click", (e) => {
        if (e.target === requestPopup) {
            requestPopup.classList.remove("active");
        }
    });
}


/*** Country Code List ***/
document.addEventListener("DOMContentLoaded", () => {
    const sheetOverlay = document.getElementById("sheetOverlay");
    const listUl = document.getElementById("countryListUl");
    let allCountries = [];
    let activeTrigger = null;

    // 1. Fetch data
    async function loadCountryData() {
        try {
            const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd,cca2");
            const data = await res.json();
            allCountries = data.map(c => ({
                name: c.name.common,
                code: c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : ""),
                iso: c.cca2.toLowerCase()
            })).sort((a, b) => a.name.localeCompare(b.name));
        } catch (err) {
            console.error("Failed to load countries:", err);
        }
    }

    // 2. Click logic for everything
    document.addEventListener("click", (e) => {
        // Find the country selector trigger
        const trigger = e.target.closest(".country-trigger");

        // OPEN SHEET
        if (trigger && sheetOverlay) {
            activeTrigger = trigger;
            sheetOverlay.classList.add("active");
            renderList(allCountries);
            return;
        }

        // CLOSE SHEET (Click on background)
        if (sheetOverlay && e.target === sheetOverlay) {
            sheetOverlay.classList.remove("active");
        }

        // SELECT COUNTRY
        const item = e.target.closest(".country-item");
        if (item && activeTrigger) {
            const code = item.getAttribute("data-code");
            const iso = item.getAttribute("data-iso");

            // Update elements within the active trigger
            const flagImg = activeTrigger.querySelector(".flag-icon");
            const dialDisplay = activeTrigger.querySelector(".dial-display");

            if (flagImg) flagImg.src = `https://flagcdn.com/w40/${iso}.png`;
            if (dialDisplay) dialDisplay.innerText = `(${code})`;

            sheetOverlay.classList.remove("active");
            activeTrigger = null;
        }
    });

    // 3. Search logic
    const searchInput = document.getElementById("countrySearchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = allCountries.filter(c =>
                c.name.toLowerCase().includes(term) || c.code.includes(term)
            );
            renderList(filtered);
        });
    }

    function renderList(data) {
        if (!listUl) return;
        listUl.innerHTML = data.map(c => `
            <li class="country-item" data-code="${c.code}" data-iso="${c.iso}">
                <div class="country-info-left">
                    <img src="https://flagcdn.com/w40/${c.iso}.png" class="list-flag">
                    <span class="country-name-text">${c.name}</span>
                </div>
                <span class="country-dial-code">${c.code}</span>
            </li>
        `).join("");
    }

    loadCountryData();
});


/*** Calender Drawer ***/
let activeCalendarTarget = null;
const calenderOpen = document.querySelector(".calender-open");
const calenderOverlay = document.querySelector(".calender-overlay");

document.querySelectorAll(".calender-open").forEach(el => {
    el.addEventListener("click", (e) => {
        e.stopPropagation();
        activeCalendarTarget = el;
        calenderOverlay.classList.add("active");
    });
});

calenderOpen.addEventListener("click", (e) => {
    e.stopPropagation();
    calenderOverlay.classList.add("active");
});

calenderOverlay.querySelector(".calender-popup").addEventListener("click", (e) => {
    e.stopPropagation();
});

calenderOverlay.addEventListener("click", (e) => {
    if (e.target === calenderOverlay) {
        calenderOverlay.classList.remove("active");
    }
});

/*** Calendar Overlay ***/
/*** Data ***/
const specialDays = {
    "2025-02-10": "Raksha Ba…",
    "2025-02-14": "Sri Narayana Guru",
    "2025-03-05": "Raksha Ba…",
    "2025-02-05": "Sri Narayana Guru",
    "2025-02-08": "Raksha Ba…"
};

const monthTags = {
    "2025-02": "3 Holiday",
    "2025-03": "2 Holiday"
};

function getPriceForDate(year, month, day) {
    return day % 2 === 1 ? 324654 : null;
}

/*** HELPERS ***/
function formatSelectedDate(year, month, day) {
    const date = new Date(year, month, day);
    return {
        dayMonth: date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short"
        }),
        weekdayYear: date.toLocaleDateString("en-GB", {
            weekday: "short",
            year: "numeric"
        })
    };
}

function getDayTag(year, month, day) {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return specialDays[key] || null;
}

function getMonthTag(year, month) {
    const key = `${year}-${String(month + 1).padStart(2, "0")}`;
    return monthTags[key] || null;
}

/*** SELECTION HANDLER ***/
function selectDate(dayDiv) {
    document
        .querySelectorAll(".cal-days div.selected")
        .forEach(el => el.classList.remove("selected", "today"));

    dayDiv.classList.add("selected", "today");

    const year = +dayDiv.dataset.year;
    const month = +dayDiv.dataset.month;
    const day = +dayDiv.dataset.day;

    const { dayMonth, weekdayYear } = formatSelectedDate(year, month, day);

    if (activeCalendarTarget) {
        activeCalendarTarget.querySelector(".month-part").textContent = dayMonth;
        activeCalendarTarget.querySelector(".year-part").textContent = weekdayYear;
    }
}

/*** RENDER MONTH ***/
function renderMonth(year, month) {
    const box = document.createElement("div");
    box.className = "month-box";

    const monthName = new Date(year, month).toLocaleString("default", {
        month: "long"
    });

    const tag = getMonthTag(year, month);

    box.innerHTML = `
        <div class="month-title">
            ${monthName} ${year}
            ${tag ? `<span class="month-tag">${tag}</span>` : ""}
        </div>
        <div class="cal-days"></div>
    `;

    monthsWrapper.appendChild(box);
    const daysContainer = box.querySelector(".cal-days");

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
        daysContainer.appendChild(document.createElement("div"));
    }

    const today = new Date();

    for (let d = 1; d <= lastDate; d++) {
        const dayDiv = document.createElement("div");
        const date = new Date(year, month, d);

        // 1. Check if date is in the past (resetting hours to compare only dates)
        const todayCopy = new Date();
        todayCopy.setHours(0, 0, 0, 0);
        const isPast = date < todayCopy;

        // 2. Get price
        const price = getPriceForDate(year, month, d);

        // 3. Logic to Disable: Past dates OR no price
        const isDisabled = isPast || !price;

        dayDiv.dataset.year = year;
        dayDiv.dataset.month = month;
        dayDiv.dataset.day = d;

        const tagText = getDayTag(year, month, d);

        if (isDisabled) {
            dayDiv.classList.add("day-disabled");
        } else {
            dayDiv.classList.add("day-with-price");
            dayDiv.addEventListener("click", () => {
                selectDate(dayDiv);
                calenderOverlay.classList.remove("active");
            });
        }

        if (date.getDay() === 0) dayDiv.classList.add("sunday");

        // Handle today/selection only if not disabled
        if (!isDisabled &&
            d === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dayDiv.classList.add("today", "selected");
            setTimeout(() => selectDate(dayDiv), 0);
        }

        // Append Content
        if (tagText) {
            dayDiv.innerHTML += `<span class="day-tag">${tagText}</span>`;
        }

        dayDiv.innerHTML += d;

        if (price) {
            dayDiv.innerHTML += `
            <span class="day-price">
                <span class="rupee-icon">₹</span>${price.toLocaleString()}
            </span>`;
        }

        daysContainer.appendChild(dayDiv);
    }
}

/*** RENDER YEAR RANGE ***/
function renderYearRange(startYear, endYear) {
    monthsWrapper.innerHTML = "";
    for (let y = startYear; y <= endYear; y++) {
        for (let m = 0; m < 12; m++) {
            renderMonth(y, m);
        }
    }
}

/*** INIT ***/
const currentYear = new Date().getFullYear();
renderYearRange(currentYear, currentYear);
