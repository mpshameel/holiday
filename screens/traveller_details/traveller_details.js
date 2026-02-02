/*** Gst Popup ***/
const gstPopup = document.getElementById("gstPopup");
const gstSubmitBtn = document.getElementById("gstSubmitBtn");

const openGstDrawer = () => gstPopup?.classList.add("active");
const closeGstDrawer = () => gstPopup?.classList.remove("active");

document.body.addEventListener("click", (e) => {
    if (e.target.closest(".gstin-add")) openGstDrawer();
});

document.addEventListener("click", (e) => {
    if (
        gstPopup?.classList.contains("active") &&
        !e.target.closest("#gstPopup .gst-container") &&
        !e.target.closest(".gstin-add")
    ) {
        closeGstDrawer();
    }
});

gstSubmitBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    closeGstDrawer();
});


/*** Fare Summary Detail ***/
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


/*** Adult Child Infant ***/
const travellerCards = document.querySelectorAll(".traveller-card");

travellerCards.forEach(card => {
    const typeText = card.querySelector(".type").textContent.toLowerCase();
    const img = card.querySelector("img");

    if (typeText.includes("adult")) {
        img.src = "../../assets/icons/traveller_male.svg";
    }
    else if (typeText.includes("child")) {
        img.src = "../../assets/icons/traveller_child.svg";
    }
    else if (typeText.includes("infant")) {
        img.src = "../../assets/icons/traveller_infant.svg";
    }
});


/*** Country Code List ***/
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("sheetOverlay");
    const listUl = document.getElementById("countryListUl");
    let allCountries = [];

    // 1. Load All Countries from a reliable API
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

    // 2. Open / Close / Select Logic using Event Delegation
    document.addEventListener("click", (e) => {
        // Open Sheet
        if (e.target.closest("#countryTrigger")) {
            overlay.classList.add("active");
            renderList(allCountries);
        }

        // Close Sheet
        if (e.target.closest("#closeSheetBtn") || e.target === overlay) {
            overlay.classList.remove("active");
        }

        // Handle Selection
        const item = e.target.closest(".country-item");
        if (item) {
            const code = item.getAttribute("data-code");
            const iso = item.getAttribute("data-iso");

            document.getElementById("selectedCode").innerText = code;
            document.getElementById("selectedFlag").src = `https://flagcdn.com/w40/${iso}.png`;
            overlay.classList.remove("active");
        }
    });

    // 3. Search Filter Logic
    document.addEventListener("input", (e) => {
        if (e.target.id === "countrySearchInput") {
            const term = e.target.value.toLowerCase();
            const filtered = allCountries.filter(c =>
                c.name.toLowerCase().includes(term) || c.code.includes(term)
            );
            renderList(filtered);
        }
    });

    // 4. Render HTML for the list
    function renderList(data) {
        const listUl = document.getElementById("countryListUl");
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

document.getElementById('countryTrigger').addEventListener('click', () => {
    document.getElementById('sheetOverlay').classList.add('active');
});

document.getElementById('sheetOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'sheetOverlay') {
        document.getElementById('sheetOverlay').classList.remove('active');
    }
});