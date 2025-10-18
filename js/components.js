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
