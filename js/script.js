







function showScreen(screenId) {
    // 1. All screens hide
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // 2. Active selected screen
    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');

    // 3. Update Nav Icons color
    document.querySelectorAll('.bottom-nav i').forEach(icon => icon.classList.remove('active'));
    if (screenId === 'dashboard-screen') document.querySelectorAll('.bottom-nav i')[0].classList.add('active');
    if (screenId === 'equipment-screen') document.querySelectorAll('.bottom-nav i')[1].classList.add('active');
    if (screenId === 'settings-screen') document.querySelectorAll('.bottom-nav i')[3].classList.add('active');

    // 4. Close menu
    toggleMenu(false);
}

function toggleMenu(forceClose = null) {
    const sidebar = document.getElementById('sidebar');
    if (forceClose === false) {
        sidebar.classList.remove('open');
    } else {
        sidebar.classList.toggle('open');
    }
}

function updateTitle(view) {
    document.getElementById('dashboard-title').innerText = `Dashboard (${view})`;
}

// HQ vs Division Toggle Effect
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('toggle-btn')) {
        const parent = e.target.parentElement;
        parent.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
    }
});