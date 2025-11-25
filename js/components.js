(() => {
  document.addEventListener("DOMContentLoaded", () => {

    /*** Copy Promo Code ***/
    const handleCopy = (container) => {
      const text = container.querySelector(".copy-text")?.innerText.trim();
      if (!text) return;
      navigator.clipboard.writeText(text)
        .then(() => alert(`Copied promo code: ${text}`))
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

  });

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

  /*** Detail Tabbar ***/
  const tabs = document.querySelectorAll(".tab-btn");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  if (tabs.length > 0 && panes.length > 0) {
    tabs[0].classList.add("active");
    panes[0].classList.add("active");
  }

  document.addEventListener("DOMContentLoaded", () => {

    /*** Book Appointment Popup ***/
    const bookPopup = document.getElementById("bookAppointmentPopup");
    const openBook = document.getElementById("openBookAppointment");
    const closeBook = document.getElementById("closebookAppointmentPopup");

    if (openBook && bookPopup && closeBook) {
      openBook.addEventListener("click", () => {
        bookPopup.classList.add("active");
      });

      closeBook.addEventListener("click", () => {
        bookPopup.classList.remove("active");
      });

      bookPopup.addEventListener("click", (e) => {
        if (e.target === bookPopup) {
          bookPopup.classList.remove("active");
        }
      });
    }

    /*** Open Thank You Popup ***/
    const thankYouPopup = document.getElementById("thankYouPopup");
    const openThankYouBtn = document.getElementById("openThankYou");

    if (openThankYouBtn && thankYouPopup && bookPopup) {
      openThankYouBtn.addEventListener("click", () => {
        bookPopup.classList.remove("active");

        thankYouPopup.classList.add("active");
      });

      thankYouPopup.addEventListener("click", (e) => {
        if (e.target === thankYouPopup) {
          thankYouPopup.classList.remove("active");
        }
      });
    }

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

  /*** Promo Drawer ***/
  const offers_link = document.querySelector('.offers-link');
  const promoDrawer = document.getElementById('promoDrawer');
  const overlay2 = document.querySelector('.overlay');

  offers_link.addEventListener('click', () => {
    promoDrawer.classList.add('active');
    overlay2.style.display = 'block';
  });

  overlay2.addEventListener('click', () => {
    promoDrawer.classList.remove('active');
    overlay2.style.display = 'none';
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
  document.addEventListener("DOMContentLoaded", () => {

    const roomsContainer = document.getElementById("roomsContainer");
    const addRoomBtn = document.getElementById("addRoomBtn");

    const handleCounter = (room) => {
      room.querySelectorAll(".guest-item").forEach(item => {
        const minus = item.querySelector(".minus");
        const plus = item.querySelector(".plus");
        const count = item.querySelector(".count");

        minus.addEventListener("click", () => {
          let value = parseInt(count.textContent);
          if (value > 0) count.textContent = value - 1;
        });

        plus.addEventListener("click", () => {
          let value = parseInt(count.textContent);
          count.textContent = value + 1;
        });
      });
    };

    document.querySelectorAll(".room-box").forEach(room => handleCounter(room));


    addRoomBtn.addEventListener("click", () => {

      const roomCount = roomsContainer.children.length + 1;

      const roomHTML = `
        <div class="room-box">
            <h3 class="room-title">Room ${roomCount}</h3>

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

      roomsContainer.insertAdjacentHTML("beforeend", roomHTML);

      const newRoom = roomsContainer.lastElementChild;
      handleCounter(newRoom);
    });
  });






})();

/*** Detail DropDown ***/
function toggleHotelCard(element) {
  const card = element.closest(".accomodation-card");
  const icon = element.querySelector(":scope > i.fa-solid");
  const content = card.querySelector(".hotel-content-container");

  // Toggle visibility
  const isActive = card.classList.contains("active");
  document.querySelectorAll(".accomodation-card").forEach(c => {
    c.classList.remove("active");
    c.querySelector(".hotel-content-container").style.display = "none";
    const i = c.querySelector(".hotel-header > i.fa-solid");
    i.classList.remove("fa-angle-up");
    i.classList.add("fa-angle-down");
  });

  if (!isActive) {
    card.classList.add("active");
    content.style.display = "block";
    icon.classList.remove("fa-angle-down");
    icon.classList.add("fa-angle-up");
  }
}

// Open the first card by default on load
document.addEventListener("DOMContentLoaded", () => {
  const firstCard = document.querySelector(".accomodation-card");
  if (firstCard) {
    firstCard.classList.add("active");
    firstCard.querySelector(".hotel-content-container").style.display = "block";
    const icon = firstCard.querySelector(".hotel-header > i.fa-solid");
    icon.classList.remove("fa-angle-down");
    icon.classList.add("fa-angle-up");
  }


});


