// document.querySelectorAll('.copy-container').forEach(container => {
//   container.addEventListener('click', () => {
//     const text = container.querySelector('.copy-text').innerText.trim();
//     navigator.clipboard.writeText(text).then(() => {
//       alert(`Copied promo code: ${text}`);
//     }).catch(err => {
//       console.error('Failed to copy text: ', err);
//     });
//   });
// });

// // search popup
// const searchArea = document.querySelector('.search');
// const popup = document.getElementById('searchPopup');
// const backBtn = popup.querySelector('.icon-btn');

// searchArea.addEventListener('click', (e) => {
//   e.preventDefault();
//   popup.classList.add('show');
// });

// document.addEventListener('click', (e) => {
//   if (popup.classList.contains('show') && !popup.contains(e.target) && !searchArea.contains(e.target)) {
//     popup.classList.remove('show');
//   }
// });

// backBtn.addEventListener('click', () => {
//   popup.classList.remove('show');
// });

// // city item navigate
// const cityItems = document.querySelectorAll('.city-item');
// const monthPopup = document.getElementById('monthPopup');

// cityItems.forEach(item => {
//   item.addEventListener('click', () => {
//     monthPopup.classList.add('show');
//   });
// });

// document.addEventListener('click', (e) => {
//   if (monthPopup.classList.contains('show') && !monthPopup.contains(e.target) && !e.target.closest('.city-item')) {
//     monthPopup.classList.remove('show');
//   }
// });

// // Month pop up
// const month_popup = document.getElementById("monthPopup");
// const closeBtn = month_popup.querySelector(".close-popup");

// document.querySelectorAll(".city-item").forEach(item => {
//   item.addEventListener("click", () => {
//     month_popup.classList.add("active");
//   });
// });

// closeBtn.addEventListener("click", () => {
//   month_popup.classList.remove("active");
// });

// month_popup.addEventListener("click", e => {
//   if (e.target === month_popup) month_popup.classList.remove("active");
// });

// // modify search
// document.querySelectorAll('.holiday-card').forEach(card => {
//   card.addEventListener('click', () => {
//     document.getElementById('searchDrawer').classList.add('open');
//   });
// });

// document.querySelector('.close-btn').addEventListener('click', () => {
//   document.getElementById('holidayDrawer').classList.remove('open');
// });


// // search popup
// document.addEventListener("DOMContentLoaded", function () {
//   const drawer = document.getElementById("searchDrawer");
//   const closeBtn = document.getElementById("closeDrawer");

//   document.body.addEventListener("click", function (e) {
//     if (e.target.closest(".holiday-card")) {
//       drawer.classList.add("active");
//     }
//   });

//   closeBtn.addEventListener("click", () => drawer.classList.remove("active"));
// });


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
    const searchArea = document.querySelector(".search");
    const searchPopup = document.getElementById("searchPopup");
    const searchBackBtn = searchPopup?.querySelector(".icon-btn");

    const openSearch = () => searchPopup?.classList.add("show");
    const closeSearch = () => searchPopup?.classList.remove("show");

    searchArea?.addEventListener("click", (e) => {
      e.preventDefault();
      openSearch();
    });

    searchBackBtn?.addEventListener("click", closeSearch);

    document.addEventListener("click", (e) => {
      if (searchPopup?.classList.contains("show") &&
        !searchPopup.contains(e.target) &&
        !searchArea.contains(e.target)) {
        closeSearch();
      }
    });


    /*** City Item / Month Popup ***/
    const monthPopup = document.getElementById("monthPopup");
    const monthCloseBtn = monthPopup?.querySelector(".close-popup");

    const openMonthPopup = () => monthPopup?.classList.add("active");
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
      if (e.target.closest(".holiday-card")) openDrawer();
    });

    searchDrawerCloseBtn?.addEventListener("click", closeDrawer);

  });
})();
