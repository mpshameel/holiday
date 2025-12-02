/*** International inputbox visible ***/
document.addEventListener("DOMContentLoaded", function () {
    const saveCheckbox = document.getElementById('saveCardCheckbox');
    const internationalBox = document.getElementById('internationalBox');

    function toggleInternationalBox() {
        internationalBox.style.display = saveCheckbox.checked ? 'block' : 'none';
    }

    toggleInternationalBox();
    saveCheckbox.addEventListener('change', toggleInternationalBox);

});