// Screen badalne ka function
function showScreen(screenId) {
    // 1. Saari screens ko hide karo
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    // 2. Target screen ko show karo
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    // 3. Bottom Navigation icons update karo
    updateBottomNav(screenId);

    // 4. Sidebar band karo
    toggleMenu(false);
}

// Sidebar open/close function
function toggleMenu(forceClose = null) {
    const sidebar = document.getElementById('sidebar');
    if (forceClose === false) {
        sidebar.classList.remove('open');
    } else {
        sidebar.classList.toggle('open');
    }
}

// Bottom Navigation ka active color change karne ke liye
function updateBottomNav(screenId) {
    const navIcons = document.querySelectorAll('.bottom-nav i');
    navIcons.forEach(icon => icon.classList.remove('active'));

    // Dashboard aur search ke hisab se icon active karo
    if (screenId === 'dashboard-screen') {
        navIcons[0].classList.add('active');
    } else if (screenId === 'equipment-screen') {
        navIcons[1].classList.add('active');
    }
}

// HQ vs Division Toggle Logic
document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Purana active htao
        this.parentElement.querySelector('.active').classList.remove('active');
        // Naya active add karo
        this.classList.add('active');
    });
});

// Initial Load par Login screen dikhao (agar HTML me active nahi hai)
window.onload = () => {
    console.log("Railway ART App Loaded Successfully");
};