/*** Room wise ***/
document.querySelectorAll(".traveller-section").forEach(section => {
    const dash = section.querySelector(".dash");

    dash.addEventListener("click", () => {
        section.classList.toggle("collapsed");
        dash.classList.toggle("closed");
    });
});


/*** DOB Calender ***/
document.addEventListener('DOMContentLoaded', () => {

    // =======================================================================
    // 1. DATA AND DOM ELEMENTS
    // =======================================================================

    // --- Swiper Data ---
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthsAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    // Generate 100 years of data, sorted descending
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i).sort((a, b) => b - a);

    // --- DOM Elements ---
    const dobCalendars = document.querySelectorAll(".dob-calender");
    const dobPopup = document.getElementById("dobPopup");
    const overlayDobPopup = document.querySelector(".overlay-dob-popup");
    const dobSubmitBtn = document.querySelector('.dob-submit');
    let activeInput = null; // Track which input is being edited


    // =======================================================================
    // 2. HELPER FUNCTIONS
    // =======================================================================

    /**
     * Fills a Swiper wheel with data, including top and bottom spacers.
     */
    function populateWheel(elementId, data) {
        const wrapper = document.querySelector(`#${elementId} .swiper-wrapper`);
        const slideHeight = 40; // Must match SCSS $slide-height
        const visibleSlides = 9;

        // Calculate spacer height
        const spacerHeight = `${(Math.floor(visibleSlides / 2)) * slideHeight}px`;

        wrapper.innerHTML = `
            <div class="swiper-slide swiper-spacer" style="height: ${spacerHeight};"></div>
            ${data.map(item => `<div class="swiper-slide" data-value="${item}">${item}</div>`).join('')}
            <div class="swiper-slide swiper-spacer" style="height: ${spacerHeight};"></div>
        `;
    }

    /**
     * Calculates the number of days in a given month and year (handles leap years).
     */
    function getDaysInMonth(monthIndex, year) {
        return new Date(year, monthIndex + 1, 0).getDate();
    }

    /**
     * Updates the day wheel based on the currently selected month and year.
     * This function now includes a safety check for the daySwiper.
     */
    function updateDaysWheel(daySwiper, selectedMonth, selectedYear) {
        const daysCount = getDaysInMonth(selectedMonth, selectedYear);
        const days = Array.from({ length: daysCount }, (_, i) => i + 1);

        // Get the current day selection before updating the wheel structure
        // Added safety check: if daySwiper.slides[daySwiper.activeIndex] is undefined, default to 1
        const currentDaySlide = daySwiper.slides[daySwiper.activeIndex];
        const currentDay = currentDaySlide ? parseInt(currentDaySlide.innerText) : 1;

        populateWheel('dayWheel', days);
        daySwiper.update();

        // Try to restore position, default to last day if the current day is invalid
        let newDay = days.includes(currentDay) ? currentDay : days.length;

        // +1 because of the top spacer slide
        daySwiper.slideTo(days.indexOf(newDay) + 1, 0);
    }


    // =======================================================================
    // 3. SWIPER INITIALIZATION
    // =======================================================================

    const commonParams = {
        direction: 'vertical',
        slidesPerView: 9,
        centeredSlides: true,
        mousewheel: true,
        freeMode: false,
        loop: false,
        slideToClickedSlide: true,
        speed: 400,
    };

    // 1. Initial Populate
    populateWheel('monthWheel', months);
    populateWheel('dayWheel', Array.from({ length: 31 }, (_, i) => i + 1));
    populateWheel('yearWheel', years);

    // 2. Initialize Swiper Instances (These MUST be defined here, inside DOMContentLoaded)
    const monthSwiper = new Swiper('#monthWheel', commonParams);
    const daySwiper = new Swiper('#dayWheel', commonParams);
    const yearSwiper = new Swiper('#yearWheel', commonParams);


    // =======================================================================
    // 4. DATE LOGIC LISTENER
    // =======================================================================

    /**
     * Handles the cross-wheel logic (updating days when month/year changes).
     */
    const updateAll = () => {
        // realIndex is used for month because it ignores 'loop' if it were enabled, 
        // but since we aren't looping, we can use realIndex for the month index (0-11)
        const selectedMonth = monthSwiper.realIndex;

        // Use activeIndex for year, and add safety check
        const activeYearSlide = yearSwiper.slides[yearSwiper.activeIndex];

        // 🚨 CRITICAL FIX for "Cannot read properties of undefined (reading 'innerText')" 🚨
        if (!activeYearSlide || !activeYearSlide.innerText.trim()) {
            // This happens if the active slide is a spacer or the array is empty on load.
            // We exit safely.
            return;
        }

        const selectedYearText = activeYearSlide.innerText;
        const selectedYear = parseInt(selectedYearText);

        updateDaysWheel(daySwiper, selectedMonth, selectedYear);
    };

    // Update days whenever month or year finishes transitioning
    monthSwiper.on('transitionEnd', updateAll);
    yearSwiper.on('transitionEnd', updateAll);
    updateAll(); // Run on page load to set initial days correctly


    // =======================================================================
    // 5. POPUP OPEN/CLOSE/VALUE SYNC LOGIC
    // =======================================================================

    // ===== Open popup on click =====
    dobCalendars.forEach(dob => {
        dob.addEventListener("click", () => {
            activeInput = dob.querySelector("input");

            // --- Sync Swiper to current input value ---
            if (activeInput && activeInput.value && activeInput.value !== activeInput.placeholder) {
                try {
                    // Expecting format "10 Jun 1996"
                    const [dayStr, monthStr, yearStr] = activeInput.value.split(' ');
                    const initialDay = parseInt(dayStr);
                    const initialYear = parseInt(yearStr);
                    const initialMonthIndex = monthsAbbr.findIndex(abbr => abbr === monthStr);

                    if (initialDay && initialMonthIndex >= 0 && initialYear) {
                        // 1. Update the day wheel first
                        updateDaysWheel(daySwiper, initialMonthIndex, initialYear);

                        // 2. Set Swiper positions (+1 to account for the top spacer slide)
                        monthSwiper.slideTo(initialMonthIndex + 1, 0);
                        // Day is 1-based, so day index is correct for slide index (day 1 is index 1)
                        daySwiper.slideTo(initialDay, 0);

                        const yearIndex = years.indexOf(initialYear);
                        if (yearIndex >= 0) {
                            yearSwiper.slideTo(yearIndex + 1, 0);
                        }
                    }
                } catch (e) {
                    console.error("Could not parse date from input:", activeInput.value, e);
                    // Fallback to default if parsing fails
                    monthSwiper.slideTo(new Date().getMonth() + 1, 0);
                    daySwiper.slideTo(new Date().getDate() + 1, 0);
                    yearSwiper.slideTo(years.indexOf(currentYear) + 1, 0);
                }
            } else {
                // Default to a sane date if input is empty/placeholder
                const now = new Date();
                // Slide to current month/day, default year (which is years[0], the current year)
                monthSwiper.slideTo(now.getMonth() + 1, 0);
                daySwiper.slideTo(now.getDate() + 1, 0);
                yearSwiper.slideTo(years.indexOf(currentYear) + 1, 0);
            }

            // Ensure Swiper calculates correct positions if view changes
            monthSwiper.update();
            daySwiper.update();
            yearSwiper.update();

            dobPopup.classList.add("active");
            overlayDobPopup.style.display = "block";
        });
    });

    // ===== Close popup when clicking outside (and reset state) =====
    overlayDobPopup.addEventListener("click", () => {
        dobPopup.classList.remove("active");
        overlayDobPopup.style.display = "none";
        activeInput = null; // Clear the reference
    });

    // ===== Handle Select Button Click to update input and close popup =====
    dobSubmitBtn.addEventListener('click', () => {
        if (activeInput) {
            // Get the text content of the active slides (the centered one)
            const monthSlide = monthSwiper.slides[monthSwiper.activeIndex];
            const daySlide = daySwiper.slides[daySwiper.activeIndex];
            const yearSlide = yearSwiper.slides[yearSwiper.activeIndex];

            // 🚨 CRITICAL FIX for 'select not working' 🚨
            // Check that we are not selecting a spacer slide and that the value exists
            if (monthSlide && daySlide && yearSlide && monthSlide.innerText.trim() && daySlide.innerText.trim() && yearSlide.innerText.trim()) {

                const selectedMonthName = monthSlide.innerText.trim();
                const selectedDay = daySlide.innerText.trim();
                const selectedYear = yearSlide.innerText.trim();

                // Format to the desired "10 Jun 1996" format
                const finalMonthAbbr = selectedMonthName.substring(0, 3);
                const finalDate = `${selectedDay} ${finalMonthAbbr} ${selectedYear}`;

                // Assign the formatted date to the correct input field
                activeInput.value = finalDate;
            } else {
                console.warn("Date selection failed: Current active slide is a spacer or empty.");
            }
        }

        // Close and reset state
        dobPopup.classList.remove("active");
        overlayDobPopup.style.display = "none";
        activeInput = null;
    });
});

/*** Gender ***/
document.addEventListener('DOMContentLoaded', () => {
    const genderOptions = document.querySelectorAll('.traveller-gender');

    genderOptions.forEach(option => {
        option.addEventListener('click', () => {
            genderOptions.forEach(opt => opt.classList.remove('active'));

            option.classList.add('active');

            const selectedGender = option.querySelector('.gender').textContent;
            console.log("Selected Gender:", selectedGender);
        });
    });
});