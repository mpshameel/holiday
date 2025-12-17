/*** Liked Items ***/
document.addEventListener('DOMContentLoaded', () => {

    const appBarWrapper = document.getElementById('appBarLikedWrapper');
    const badgeElement = appBarWrapper?.querySelector('.badge');

    let globalLikeCount = 0;

    function updateAppBarState(count) {
        badgeElement.textContent = count;
        appBarWrapper.classList.toggle('active-likes', count > 0);
    }

    document.querySelectorAll('.card-like-btn').forEach(button => {

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isLiked = button.classList.toggle('liked');

            globalLikeCount += isLiked ? 1 : -1;
            globalLikeCount = Math.max(0, globalLikeCount);

            updateAppBarState(globalLikeCount);
        });
    });

    updateAppBarState(globalLikeCount);
});
