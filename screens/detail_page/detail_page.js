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
const calenderOpen = document.querySelector(".calender-open");
const calenderOverlay = document.querySelector(".calender-overlay");

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

/*** Calender ***/
const specialDays = {
    "2025-02-10": "Raksha Ba…",
    "2025-02-14": "Sri Narayana Guru",
    "2025-03-05": "Raksha Ba…",
    "2025-02-05": "Sri Narayana Guru",
    "2025-02-08": "Raksha Ba…"
};

const monthTags = {
    "2025-11": "1 Holiday",
    "2025-02": "3 Holiday",
    "2025-03": "2 Holiday",
};

const monthsWrapper = document.getElementById("monthsWrapper");

function getPriceForDate(year, month, day) {
    return day % 2 === 1 ? 324654 : null;
}

function renderMonth(year, month) {
    const box = document.createElement("div");
    box.classList.add("month-box");

    const monthName = new Date(year, month)
        .toLocaleString('default', { month: 'long' });

    const tag = getMonthTag(year, month);

    box.innerHTML = `
    <div class="month-title">
        ${monthName} ${year}
        ${tag ? `<span class="month-tag">${tag}</span>` : ""}
    </div>

    <div class="cal-days" id="days-${year}-${month}"></div>
`;


    monthsWrapper.appendChild(box);

    const daysContainer = box.querySelector(".cal-days");

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += `<div></div>`;
    }

    for (let d = 1; d <= lastDate; d++) {
        const dayOfWeek = new Date(year, month, d).getDay();
        const price = getPriceForDate(year, month, d);

        const isToday =
            d === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();

        let classes = [];

        if (isToday) classes.push("today");
        if (dayOfWeek === 0) classes.push("sunday");


        const tag = getDayTag(year, month, d);

        if (price) {
            classes.push("day-with-price");
            daysContainer.innerHTML += `
    <div class="${classes.join(" ")}">
        ${tag ? `<span class="day-tag">${tag}</span>` : ""}
        ${d}
        <span class="day-price">
            <span class="rupee-icon">₹</span>
            ${price.toLocaleString()}
        </span>
    </div>
  `;
        } else {
            classes.push("day-no-price");
            daysContainer.innerHTML += `
    <div class="${classes.join(" ")}">
        ${tag ? `<span class="day-tag">${tag}</span>` : ""}
        ${d}
    </div>
  `;
        }
    }
}

function renderYearRange(startYear, endYear) {
    monthsWrapper.innerHTML = "";
    for (let y = startYear; y <= endYear; y++) {
        for (let m = 0; m < 12; m++) {
            renderMonth(y, m);
        }
    }
}

function getDayTag(year, month, day) {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return specialDays[key] || null;
}

function getMonthTag(year, month) {
    const key = `${year}-${String(month + 1).padStart(2, "0")}`;
    return monthTags[key] || null;
}

renderYearRange(2025, 2025);

/*** Rooms Drawer ***/
const roomsOpen = document.querySelector(".rooms-open");
const roomsOverlay = document.querySelector(".rooms-overlay");

roomsOpen.addEventListener("click", (e) => {
    e.stopPropagation();
    roomsOverlay.classList.add("active");
});

roomsOverlay.querySelector(".rooms-popup").addEventListener("click", (e) => {
    e.stopPropagation();
});

roomsOverlay.addEventListener("click", (e) => {
    if (e.target === roomsOverlay) {
        roomsOverlay.classList.remove("active");
    }
});


/*** Rooms Box ***/
addRoomBtn.addEventListener("click", () => {
    selectedRoomsContainer.style.display = "block";

    const currentRoom = roomsContainer.querySelector(".room-box");
    if (currentRoom) {
        const roomTitle = currentRoom.querySelector(".room-title").textContent;
        const adults = currentRoom.querySelectorAll(".guest-item")[0].querySelector(".count").textContent;
        const childrenWithBed = currentRoom.querySelectorAll(".guest-item")[1].querySelector(".count").textContent;
        const childrenWithoutBed = currentRoom.querySelectorAll(".guest-item")[2].querySelector(".count").textContent;
        const infants = currentRoom.querySelectorAll(".guest-item")[3].querySelector(".count").textContent;

        const selectedRoomHTML = `
        <div class="selected-room-box">
            <div class="room-row">
                <div class="room-info">
                    <h3 class="room-title">${roomTitle}</h3>
                    <div class="room-details">
                        <span class="num">${adults}</span> <span class="label">Adults</span>,
                        <span class="num">${childrenWithBed}</span> <span class="label">Children</span>,
                        <span class="num">${infants}</span> <span class="label">Infants</span>
                    </div>
                </div>
                <img src="../../assets/icons/delete.png" alt="Delete" class="delete-icon" />
            </div>
        </div>
        `;

        selectedRoomsContainer.insertAdjacentHTML("beforeend", selectedRoomHTML);
        currentRoom.remove();
    }

    // Count only selected-room-box to determine next room number
    const nextRoomNumber = selectedRoomsContainer.querySelectorAll(".selected-room-box").length + 1;

    const newRoomHTML = `
    <div class="room-box">
        <h3 class="room-title">Room ${nextRoomNumber}</h3>

        <div class="guest-item">
            <div class="left">
                <p class="label">Adults</p>
                <p class="sub">Above 12 Years</p>
            </div>
            <div class="counter">
                <button class="minus">−</button>
                <span class="count">2</span>
                <button class="plus">+</button>
            </div>
        </div>

        <div class="guest-item">
            <div class="left">
                <p class="label">Child</p>
                <p class="sub">2–12 Years (With bed)</p>
            </div>
            <div class="counter">
                <button class="minus">−</button>
                <span class="count">0</span>
                <button class="plus">+</button>
            </div>
        </div>

        <div class="guest-item">
            <div class="left">
                <p class="label">Child</p>
                <p class="sub">2–12 Years (Without bed)</p>
            </div>
            <div class="counter">
                <button class="minus">−</button>
                <span class="count">0</span>
                <button class="plus">+</button>
            </div>
        </div>

        <div class="guest-item">
            <div class="left">
                <p class="label">Infant</p>
                <p class="sub">0–23 Months (Without bed)</p>
            </div>
            <div class="counter">
                <button class="minus">−</button>
                <span class="count">0</span>
                <button class="plus">+</button>
            </div>
        </div>
    </div>`;

    roomsContainer.insertAdjacentHTML("beforeend", newRoomHTML);
    handleCounter(roomsContainer.lastElementChild);
});

// Function to renumber rooms
const renumberRooms = () => {
    const selectedRooms = selectedRoomsContainer.querySelectorAll(".selected-room-box");
    selectedRooms.forEach((room, index) => {
        room.querySelector(".room-title").textContent = `Room ${index + 1}`;
    });

    const editableRooms = roomsContainer.querySelectorAll(".room-box");
    editableRooms.forEach((room, index) => {
        room.querySelector(".room-title").textContent = `Room ${selectedRooms.length + index + 1}`;
    });
};

// Delete room from selectedRoomsContainer
selectedRoomsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-icon")) {
        const roomBox = e.target.closest(".selected-room-box");
        if (roomBox) {
            roomBox.remove();
            renumberRooms();
        }
    }
});