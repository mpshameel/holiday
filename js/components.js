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
  });

  /*** Download Popup ***/
  const popup = document.getElementById("downloadPopup");
  const openBtn = document.querySelector(".download-icon");
  const closeBtn = document.getElementById("closePopup");

  openBtn.addEventListener("click", () => {
    popup.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("active");
    }
  });

  /*** Detail Modify Search Drawer ***/
  const detailSearchDrawer = document.getElementById("detailSearchDrawer");
  const detailSearchDrawerCloseBtn = document.getElementById("closeDrawer");

  const openDrawer = () => detailSearchDrawer?.classList.add("active");
  const closeDrawer = () => detailSearchDrawer?.classList.remove("active");

  document.body.addEventListener("click", (e) => {
    if (e.target.closest(".edit-icon")) openDrawer();
  });

  document.addEventListener("click", (e) => {
    if (
      detailSearchDrawer?.classList.contains("active") &&
      !e.target.closest("#detailSearchDrawer .drawer-content") &&
      !e.target.closest(".edit-icon")
    ) {
      closeDrawer();
    }
  });

  /*** Fare Summary ***/
  const guestInfo = document.querySelector('.guest-info');
  const fareSummary = document.querySelector('.fare-summary');
  const overlay = document.querySelector('.overlay');

  guestInfo.addEventListener('click', () => {
    fareSummary.classList.add('show');
    overlay.style.display = 'block';
  });

  overlay.addEventListener('click', () => {
    fareSummary.classList.remove('show');
    overlay.style.display = 'none';
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
  // const offers_link = document.querySelector('.offers-link');
  // const promoDrawer = document.getElementById('promoDrawer');

  // offers_link.addEventListener('click', () => {
  //   promoDrawer.classList.add('active');
  //   overlay.classList.add('active');
  //   overlay.dataset.activePopup = 'promoDrawer';
  // });

  // overlay.addEventListener('click', () => {
  //   const activePopupId = overlay.dataset.activePopup;
  //   if (activePopupId) {
  //     const activePopup = document.getElementById(activePopupId);
  //     if (activePopup) activePopup.classList.remove('active');
  //   }
  //   overlay.classList.remove('active');
  //   overlay.removeAttribute('data-active-popup');
  // });


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
