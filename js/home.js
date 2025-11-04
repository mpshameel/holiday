// Tabs and pills
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
    });
});

document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
        document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
    });
});

function setupTabs(tabGroupId) {
    const group = document.getElementById(tabGroupId);
    const tabs = group.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

setupTabs('region-tabs');
setupTabs('category-tabs');


document.addEventListener('DOMContentLoaded', () => {
    const infoPage = document.querySelector('.tab-container');
    if (!infoPage) return; // run only on pages that have this

    const tabs = infoPage.querySelectorAll('.tab-btn');
    const scrollContainer = infoPage.querySelector('.tab-content');
    if (!scrollContainer || tabs.length === 0) return;

    const STICKY_OFFSET = 8;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetEl = infoPage.querySelector(`#${tab.dataset.target}`);
            if (!targetEl) return;

            const containerRect = scrollContainer.getBoundingClientRect();
            const targetRect = targetEl.getBoundingClientRect();
            const relativeTop = (targetRect.top - containerRect.top) + scrollContainer.scrollTop;

            scrollContainer.scrollTo({
                top: Math.max(0, relativeTop - STICKY_OFFSET),
                behavior: 'smooth'
            });
        });
    });
});
