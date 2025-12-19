document.addEventListener("DOMContentLoaded", function () {
    // /*** Tabs and pills ***/
    function setupChipTabs(tabId, rowSelector = null) {
        const group = document.getElementById(tabId);
        if (!group) return;

        const chips = group.querySelectorAll(".chip");

        // OPTIONAL content row
        let cards = [];
        if (rowSelector) {
            const section = group.closest(".section");
            const row = section?.querySelector(rowSelector);
            if (row) {
                cards = row.querySelectorAll(".card");
            }
        }

        function filterCards(value) {
            if (!cards.length) return; // ✅ FILTER POPUP SAFE

            cards.forEach(card => {
                const category = card.dataset.category;
                card.style.display =
                    !category || category === value ? "block" : "none";
            });
        }

        chips.forEach(chip => {
            chip.addEventListener("click", () => {
                chips.forEach(c => c.classList.remove("active"));
                chip.classList.add("active");

                const value = chip.dataset.value;

                // store filter value (important)
                group.dataset.selected = value;

                filterCards(value);
            });
        });

        // Initial state
        const activeChip = group.querySelector(".chip.active");
        if (activeChip) {
            group.dataset.selected = activeChip.dataset.value;
            filterCards(activeChip.dataset.value);
        }
    }

    setupChipTabs("dealTabs", ".deals-row");
    setupChipTabs("internationalTabs", ".international-row");
    setupChipTabs("domesticTabs", ".international-row");
    setupChipTabs("wheretogoTabs", ".international-row");
    setupChipTabs("flightTabs");
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

const firstCard = document.querySelector(".accomodation-card");
if (firstCard) {
    firstCard.classList.add("active");
    firstCard.querySelector(".hotel-content-container").style.display = "block";
    const icon = firstCard.querySelector(".hotel-header > i.fa-solid");
    icon.classList.remove("fa-angle-down");
    icon.classList.add("fa-angle-up");
}

// /*** Important  Info ***/
document.addEventListener("DOMContentLoaded", function () {
    const scrollTabBox = document.querySelector('.scrolltab-box');
    const tabButtons = scrollTabBox.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const targetSection = document.getElementById(targetId);

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

});


/*** Back ***/
document.getElementById("doneBtn").addEventListener("click", () => {
    window.history.back();
});





