/*** Detailpage Carousal ***/
document.addEventListener("DOMContentLoaded", () => {
    const slideTrack = document.querySelector(".carousel-slide");
    const slides = document.querySelectorAll(".carousel-slide img");
    const dots = document.querySelectorAll(".dots .dot");

    if (!slideTrack || slides.length === 0) return;

    let slideIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    slideTrack.style.display = "flex";
    slideTrack.style.transition = "transform 0.6s ease";
    slides.forEach(img => {
        img.style.flexShrink = "0";
        img.style.width = "100%";
        img.style.height = "420px";
        img.style.objectFit = "cover";
    });

    function showSlide(index) {
        slideTrack.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[index]) dots[index].classList.add("active");
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % totalSlides;
        showSlide(slideIndex);
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        showSlide(slideIndex);
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 2000);
    }

    let startX = 0;
    slideTrack.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        clearInterval(autoSlideInterval);
    });

    slideTrack.addEventListener("touchend", e => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) nextSlide();
        else if (endX - startX > 50) prevSlide();
        startAutoSlide();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            slideIndex = i;
            showSlide(slideIndex);
            startAutoSlide();
        });
    });

    showSlide(slideIndex);
    startAutoSlide();

});

/*** Download Popup ***/
const popup = document.getElementById("downloadPopup");
const openBtn = document.querySelector(".download-icon");
const closeBtn = document.getElementById("closePopup");

if (openBtn && popup && closeBtn) {
    openBtn.addEventListener("click", () => {
        popup.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
        popup.classList.remove("active");
    });

    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.classList.remove("active");
        }
    });
}

/*** Fare Summary ***/
const guestInfo = document.querySelector('.guest-info');
const fareSummary = document.querySelector('.fare-summary');
const overlay = document.querySelector('.overlay');
const bottomBar = document.querySelector('.bottom-bar');


guestInfo.addEventListener('click', () => {
    fareSummary.classList.add('show');
    overlay.style.display = 'block';
    bottomBar.style.zIndex = '9999';
});

overlay.addEventListener('click', () => {
    fareSummary.classList.remove('show');
    overlay.style.display = 'none';
    bottomBar.style.zIndex = '999';
});

/*** TCS Popup ***/
const tcspopup = document.getElementById("tcspopup");
const openTcsBtn = document.querySelector(".open-tcs-btn");
const closeTcsBtn = document.getElementById("closeTcsPopup");

if (openTcsBtn && tcspopup && closeTcsBtn) {
    openTcsBtn.addEventListener("click", () => {
        tcspopup.classList.add("active");
    });

    closeTcsBtn.addEventListener("click", () => {
        tcspopup.classList.remove("active");
    });

    window.addEventListener("click", (event) => {
        if (event.target === tcspopup) {
            tcspopup.classList.remove("active");
        }
    });
}

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

/*** Promo Drawer ***/
document.addEventListener('DOMContentLoaded', () => {

    const offers_link = document.querySelector('.offers-link');
    const promoDrawer = document.getElementById('promoDrawer');
    const overlay2 = document.querySelector('.overlay');

    const couponAppliedPopup = document.getElementById('couponAppliedPopup');
    const applyButtons = promoDrawer.querySelectorAll('.apply-btn');
    if (offers_link && promoDrawer && overlay2) {
        offers_link.addEventListener('click', () => {
            promoDrawer.classList.add('active');
            overlay2.style.display = 'block';
        });

        overlay2.addEventListener('click', () => {
            promoDrawer.classList.remove('active');
            overlay2.style.display = 'none';
        });
    }

    const showSuccessPopup = (couponCode) => {
        promoDrawer.classList.remove('active');
        overlay2.style.display = 'none';

        couponAppliedPopup.classList.add('active');

        console.log(`Coupon applied: ${couponCode}`);

        setTimeout(() => {
            couponAppliedPopup.classList.remove('active');
            console.log("Success popup closed.");
        }, 3000);
    };

    applyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            let appliedCode = 'N/A';

            const promoCard = e.target.closest('.promo-card');
            if (promoCard) {
                const couponInput = promoCard.querySelector('.promo-right input[type="text"]');
                appliedCode = couponInput ? couponInput.value : 'N/A';
            } else {
                const mainInput = promoDrawer.querySelector('.promo-input input[type="text"]');
                appliedCode = mainInput ? mainInput.value : 'N/A';
            }

            showSuccessPopup(appliedCode);
        });
    });
});


/*** Detail Modify Search Drawer ***/
const detailSearchDrawer = document.getElementById("detailSearchDrawer");
const editIcon = document.querySelector(".edit-icon");

editIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    detailSearchDrawer.classList.add("active");
});

detailSearchDrawer.querySelector(".drawer-content").addEventListener("click", (e) => {
    e.stopPropagation();
});

detailSearchDrawer.addEventListener("click", (e) => {
    if (e.target === detailSearchDrawer) {
        detailSearchDrawer.classList.remove("active");
    }
});

/*** Dropdown Price ***/
const priceGroup = document.querySelector(".price-group");
const priceSelect = priceGroup.querySelector(".price-select");
const priceItems = priceGroup.querySelectorAll(".price-item");
const priceSelected = priceGroup.querySelector(".price-selected");

priceSelect.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    priceGroup.classList.toggle("open");
});

priceItems.forEach(item => {
    item.addEventListener("click", () => {
        priceSelected.textContent = item.textContent;
        priceGroup.classList.remove("open");
    });
});


/*** Dropdown City ***/
const fromCityGroup = document.querySelector(".from-city-group");
const destinationInput = fromCityGroup.querySelector("#destination");
const cityItems = fromCityGroup.querySelectorAll(".city-item");

destinationInput.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    fromCityGroup.classList.toggle("open");
});

cityItems.forEach(item => {
    item.addEventListener("click", () => {
        destinationInput.value = item.textContent;
        fromCityGroup.classList.remove("open");
    });
});

function closeAllDropdowns() {
    priceGroup.classList.remove("open");
    fromCityGroup.classList.remove("open");
}

document.addEventListener("click", () => {
    closeAllDropdowns();
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



/*** Rooms Drawer ***/
/**********************
 * 1. ELEMENTS & INITIALIZATION
 **********************/
const roomsOpen = document.querySelector(".rooms-open");
const roomsOverlay = document.querySelector(".rooms-overlay");
const roomsPopup = document.querySelector(".rooms-popup");
const continueBtn = document.querySelector(".continue-btn");
const monthDisplay = document.getElementById("monthDisplay");
const addRoomBtn = document.getElementById("addRoomBtn");
const selectedRoomsContainer = document.getElementById("selectedRoomsContainer");
const roomsContainer = document.getElementById("roomsContainer");
const editorRoom = document.querySelector(".room-box");
const closeRoomPopup = document.getElementById("closeRoomPopup");

let editingRoomBox = null;

// Initialization: Setup Room 1 on load
function init() {
    const firstRoom = createNewRoomBox("2", "2", "0", "0");
    editingRoomBox = firstRoom;
    firstRoom.style.display = "none";
    firstRoom.after(editorRoom);
    handleCounter(editorRoom);
    renumberAllRooms();
}

/**********************
 * 2. CORE LOGIC FUNCTIONS
 **********************/

function saveCurrentEditorData() {
    if (!editingRoomBox) return;
    const counts = editorRoom.querySelectorAll(".count");

    editingRoomBox.dataset.adults = counts[0].textContent;
    editingRoomBox.dataset.childWithBed = counts[1].textContent;
    editingRoomBox.dataset.childWithoutBed = counts[2].textContent;
    editingRoomBox.dataset.infants = counts[3].textContent;

    const totalChildren = +counts[1].textContent + +counts[2].textContent;
    editingRoomBox.querySelector(".room-details").innerHTML = `
        <b>${counts[0].textContent}</b> Adults, 
        <b>${totalChildren}</b> Children, 
        <b>${counts[3].textContent}</b> Infants
    `;
}

function createNewRoomBox(adults, c1, c2, inf) {
    const room = document.createElement("div");
    room.className = "selected-room-box";
    room.dataset.adults = adults;
    room.dataset.childWithBed = c1;
    room.dataset.childWithoutBed = c2;
    room.dataset.infants = inf;

    room.innerHTML = `
        <div class="room-row">
            <div class="room-info">
                <h3 class="room-title"></h3>
                <div class="room-details"></div>
            </div>
            <img src="../../assets/icons/delete.png" class="delete-icon">
        </div>
    `;
    selectedRoomsContainer.appendChild(room);
    return room;
}

function renumberAllRooms() {
    const all = [...selectedRoomsContainer.querySelectorAll(".selected-room-box")];
    const limitMessage = document.querySelector(".room-limit-message");
    const addRoomBtn = document.getElementById("addRoomBtn");

    all.forEach((box, i) => {
        const title = box.querySelector(".room-title");
        if (title) title.textContent = `Room ${i + 1}`;
    });
    if (editingRoomBox) {
        const idx = all.findIndex(b => b === editingRoomBox);
        editorRoom.querySelector(".room-title").textContent = `Room ${idx + 1}`;
    }

    if (all.length >= 4) {
        if (limitMessage) limitMessage.style.display = "block";
        if (addRoomBtn) addRoomBtn.style.display = "none";
    } else {
        if (limitMessage) limitMessage.style.display = "none";
        if (addRoomBtn) addRoomBtn.style.display = "block";
    }
}

function loadRoomToEditor(roomBox) {
    const counts = editorRoom.querySelectorAll(".count");
    counts[0].textContent = roomBox.dataset.adults;
    counts[1].textContent = roomBox.dataset.childWithBed;
    counts[2].textContent = roomBox.dataset.childWithoutBed;
    counts[3].textContent = roomBox.dataset.infants;
}

function handleCounter(roomBox) {
    roomBox.querySelectorAll(".counter").forEach(counter => {
        const minus = counter.querySelector(".minus");
        const plus = counter.querySelector(".plus");
        const countEl = counter.querySelector(".count");
        const label = counter.closest(".guest-item")?.querySelector(".label").textContent.toLowerCase() || "";
        const min = label.includes("adult") ? 1 : 0;

        minus.onclick = (e) => { e.stopPropagation(); const v = +countEl.textContent; if (v > min) countEl.textContent = v - 1; };
        plus.onclick = (e) => { e.stopPropagation(); countEl.textContent = +countEl.textContent + 1; };
    });
}

/**********************
 * 3. EVENT LISTENERS
 **********************/

// Open/Close Popup
roomsOpen.addEventListener("click", () => roomsOverlay.classList.add("active"));

roomsOverlay.addEventListener("click", (e) => {
    if (e.target === roomsOverlay) roomsOverlay.classList.remove("active");
});

roomsPopup.addEventListener("click", (e) => e.stopPropagation());

if (closeRoomPopup) {
    closeRoomPopup.addEventListener("click", (e) => {
        console.log("Close button clicked");

        if (typeof saveCurrentEditorData === "function") {
            saveCurrentEditorData();
        }

        let finalRooms = 0;
        let finalGuests = 0;

        const allRooms = document.querySelectorAll(".selected-room-box");
        finalRooms = allRooms.length;

        allRooms.forEach((room) => {
            const a = parseInt(room.dataset.adults) || 0;
            const c1 = parseInt(room.dataset.childWithBed) || 0;
            const c2 = parseInt(room.dataset.childWithoutBed) || 0;
            const i = parseInt(room.dataset.infants) || 0;
            finalGuests += (a + c1 + c2 + i);
        });

        const display = document.getElementById("roomResultDisplay");
        if (display) {
            const spans = display.querySelectorAll("span");

            if (spans.length >= 4) {
                spans[0].innerText = finalRooms;
                spans[1].innerText = finalRooms > 1 ? "Rooms" : "Room";
                spans[2].innerText = finalGuests;
                spans[3].innerText = finalGuests > 1 ? "Guests" : "Guest";
                console.log("Display updated successfully on roomResultDisplay");
            } else {
                console.error("Found roomResultDisplay but it doesn't have 4 spans");
            }
        } else {
            console.error("Could not find element with id='roomResultDisplay'");
        }

        // 4. Close the popup
        const overlay = document.querySelector(".rooms-overlay");
        if (overlay) {
            overlay.classList.remove("active");
        }
    });
}

// Add Room Button
addRoomBtn.addEventListener("click", () => {
    saveCurrentEditorData();
    if (editingRoomBox) editingRoomBox.style.display = "block";
    const newRoom = createNewRoomBox("2", "0", "0", "0");
    editingRoomBox = newRoom;
    newRoom.style.display = "none";
    newRoom.after(editorRoom);
    loadRoomToEditor(newRoom);
    renumberAllRooms();
});

// Click Room to Edit or Delete
selectedRoomsContainer.addEventListener("click", e => {
    const roomBox = e.target.closest(".selected-room-box");
    if (!roomBox) return;

    if (e.target.classList.contains("delete-icon")) {
        e.stopPropagation();
        if (selectedRoomsContainer.children.length === 1) return;
        if (editingRoomBox === roomBox) editingRoomBox = null;
        roomBox.remove();
        if (!editingRoomBox) {
            const first = selectedRoomsContainer.querySelector(".selected-room-box");
            editingRoomBox = first;
            first.style.display = "none";
            first.after(editorRoom);
            loadRoomToEditor(first);
        }
        renumberAllRooms();
        return;
    }

    if (editingRoomBox === roomBox) return;
    saveCurrentEditorData();
    if (editingRoomBox) editingRoomBox.style.display = "block";
    editingRoomBox = roomBox;
    loadRoomToEditor(roomBox);
    roomBox.style.display = "none";
    roomBox.after(editorRoom);
    renumberAllRooms();
});

// DONE BUTTON: Update UI and Close
continueBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Safety
    saveCurrentEditorData(); // Save the active editor state

    const allRooms = document.querySelectorAll(".selected-room-box");
    let totalRooms = allRooms.length;
    let totalGuests = 0;

    allRooms.forEach(room => {
        totalGuests += parseInt(room.dataset.adults || 0) +
            parseInt(room.dataset.childWithBed || 0) +
            parseInt(room.dataset.childWithoutBed || 0) +
            parseInt(room.dataset.infants || 0);
    });

    // Update your HTML Spans
    const spans = monthDisplay.querySelectorAll("span");
    if (spans.length >= 4) {
        spans[0].textContent = totalRooms;
        spans[1].textContent = totalRooms > 1 ? "Rooms" : "Room";
        spans[2].textContent = totalGuests;
        spans[3].textContent = totalGuests > 1 ? "Guests" : "Guest";
    }

    roomsOverlay.classList.remove("active");
});

init();


/**********************
 * DONE BUTTON FINAL FIX
 **********************/
continueBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Done button clicked - Closing popup");

    if (typeof saveCurrentEditorData === "function") {
        saveCurrentEditorData();
    }

    const allRooms = document.querySelectorAll(".selected-room-box");
    let totalRooms = allRooms.length;
    let totalGuests = 0;

    allRooms.forEach(room => {
        totalGuests += (parseInt(room.dataset.adults) || 0) +
            (parseInt(room.dataset.childWithBed) || 0) +
            (parseInt(room.dataset.childWithoutBed) || 0) +
            (parseInt(room.dataset.infants) || 0);
    });

    if (monthDisplay) {
        const spans = monthDisplay.querySelectorAll("span");
        if (spans.length >= 4) {
            spans[0].textContent = totalRooms;
            spans[1].textContent = totalRooms > 1 ? "Rooms" : "Room";
            spans[2].textContent = totalGuests;
            spans[3].textContent = totalGuests > 1 ? "Guests" : "Guest";
        }
    }

    roomsOverlay.classList.remove("active");

    roomsOverlay.style.display = "none";

    setTimeout(() => {
        roomsOverlay.style.display = "";
    }, 400);
});


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