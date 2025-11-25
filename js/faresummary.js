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

// (() => {
//     document.addEventListener("DOMContentLoaded", () => {
//         const fareSummary = document.querySelector('.fare-summary');
//         const bottomBar = document.querySelector('.bottom-bar');
//         const guestInfo = document.querySelector('.guest-info');

//         if (!fareSummary || !bottomBar || !guestInfo) return;

//         let overlay = document.querySelector('.overlay');
//         if (!overlay) {
//             overlay = document.createElement('div');
//             overlay.classList.add('overlay');
//             overlay.style.cssText = `
//         position: fixed;
//         top: 0; left: 0;
//         width: 100%; height: 100%;
//         background: rgba(0,0,0,0.5);
//         display: none;
//         z-index: 9998;
//       `;
//             document.body.appendChild(overlay);
//         }

//         guestInfo.addEventListener('click', () => {
//             fareSummary.classList.add('show');
//             overlay.style.display = 'block';
//             bottomBar.style.zIndex = '9999';
//         });

//         overlay.addEventListener('click', () => {
//             fareSummary.classList.remove('show');
//             overlay.style.display = 'none';
//             bottomBar.style.zIndex = '';
//         });
//     });
// })();
