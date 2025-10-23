document.querySelectorAll('.copy-container').forEach(container => {
  container.addEventListener('click', () => {
    const text = container.querySelector('.copy-text').innerText.trim();
    navigator.clipboard.writeText(text).then(() => {
      alert(`Copied promo code: ${text}`);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  });
});

// search popup
const searchArea = document.querySelector('.search'); // entire label area
const popup = document.getElementById('searchPopup');
const backBtn = popup.querySelector('.icon-btn'); // back icon inside popup

// Open popup when clicking anywhere in .search
searchArea.addEventListener('click', (e) => {
  e.preventDefault();
  popup.classList.add('show');
});

// Close when clicking outside popup
document.addEventListener('click', (e) => {
  if (popup.classList.contains('show') && !popup.contains(e.target) && !searchArea.contains(e.target)) {
    popup.classList.remove('show');
  }
});

// Close when clicking back icon
backBtn.addEventListener('click', () => {
  popup.classList.remove('show');
});


const cityItems = document.querySelectorAll('.city-item');
const monthPopup = document.getElementById('monthPopup');

// Open popup when clicking any city
cityItems.forEach(item => {
  item.addEventListener('click', () => {
    monthPopup.classList.add('show');
  });
});

// Close popup when clicking outside
document.addEventListener('click', (e) => {
  if (monthPopup.classList.contains('show') && !monthPopup.contains(e.target) && !e.target.closest('.city-item')) {
    monthPopup.classList.remove('show');
  }
});
