



















const RailwayData = {
    units: ["ART UDHNA", "SPARME UDHNA", "ART NANDURBAR", "SPARME NANDURBAR", "ART BL (VALSAD)"],
    
    unitMenu: [
        { id: 'composition', name: 'Composition of ART', icon: 'fas fa-layer-group' },
        { id: 'schedule', name: 'Coach Schedule Details', icon: 'fas fa-calendar-alt' },
        { id: 'movement', name: 'Movement Details', icon: 'fas fa-history' },
        { id: 'equipment', name: 'Equipment Details', icon: 'fas fa-tools' }
    ],

    composition: [
        { coach: "CR 1234", type: "Staff Coach" },
        { coach: "WR 5562", type: "Equipment Van" },
        { coach: "NR 9901", type: "Power Car" }
    ],

    equipment: [
        { name: "Hydraulic Jack", qty: 10, shortfall: 2, due: "15-Jan-2026", make: "Lukas" },
        { name: "Cold Cutting Eqp", qty: 5, shortfall: 0, due: "20-Mar-2026", make: "Victor" },
        { name: "Generator 5KVA", qty: 2, shortfall: 1, due: "10-Feb-2026", make: "Honda" },
        { name: "Wood Cutting M/C", qty: 3, shortfall: 1, due: "05-May-2026", make: "Resq" },
        { name: "Inflatable Tent", qty: 1, shortfall: 0, due: "12-Aug-2026", make: "Ready" }
    ],

    schedule: [
        { coach: "CR 1234", last: "01-Oct-2024", next: "01-Apr-2025" },
        { coach: "WR 5562", last: "15-Nov-2024", next: "15-May-2025" },
        { coach: "NR 9901", last: "20-Dec-2024", next: "20-Jun-2025" }
    ]
};







let currentUnit = "";
let currentSubModule = "";

function handleLogin() {
    // Basic animation or check can go here
    document.getElementById('login').classList.remove('active');
    document.getElementById('home').classList.add('active');
    
    // Show Header and Nav
    document.getElementById('app-header').style.display = 'flex';
    document.getElementById('bottom-nav').style.display = 'flex';
    
    loadUnits();
}

function navigate(screenId, title) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    document.getElementById('header-title').innerText = title;

    // Show Back button if not on home
    const backBtn = document.getElementById('back-btn-ui');
    backBtn.style.display = (screenId === 'home') ? 'none' : 'block';
}

function loadUnits() {
    const list = document.getElementById('units-list');
    list.innerHTML = "";
    RailwayData.units.forEach(unit => {
        list.innerHTML += `
            <div class="menu-card" onclick="openUnitMenu('${unit}')">
                <i class="fas fa-map-marker-alt" style="color:#003366"></i>
                <div><h3>${unit}</h3><p>ART/SPARME Inventory</p></div>
                <i class="fas fa-chevron-right" style="margin-left:auto; color:#ccc;"></i>
            </div>
        `;
    });
}

function openUnitMenu(unit) {
    currentUnit = unit;
    navigate('unit-menu', unit);
    const options = document.getElementById('unit-options');
    options.innerHTML = "";
    RailwayData.unitMenu.forEach(item => {
        options.innerHTML += `
            <div class="menu-card" onclick="loadData('${item.id}', '${item.name}')">
                <i class="${item.icon}"></i>
                <div><h3>${item.name}</h3><p>Tap to view</p></div>
            </div>
        `;
    });
}

function loadData(type, title) {
    currentSubModule = type;
    navigate('data-view', title);
    const content = document.getElementById('data-content');
    
    if (type === 'equipment') {
        let rows = RailwayData.equipment.map((item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}<br><small><b>Make:</b> ${item.make}</small></td>
                <td>${item.qty}</td>
                <td><span class="${item.shortfall > 0 ? 'shortfall-red' : ''}">${item.shortfall}</span></td>
                <td class="due-red">${item.due}</td>
            </tr>
        `).join('');
        
        content.innerHTML = `
            <h4 style="margin-bottom:10px;">${currentUnit} - Equipment Register</h4>
            <div style="overflow-x:auto">
                <table>
                    <thead><tr><th>Sr</th><th>Equipment Name</th><th>Qty</th><th>Short</th><th>Next Due</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>`;
    } else if (type === 'schedule') {
        let rows = RailwayData.schedule.map(item => `
            <tr>
                <td>${item.coach}</td>
                <td>${item.last}</td>
                <td class="due-red">${item.next}</td>
            </tr>
        `).join('');
        content.innerHTML = `
            <h4 style="margin-bottom:10px;">Maintenance Schedule</h4>
            <table>
                <thead><tr><th>Coach No</th><th>Last Done</th><th>Next Due</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>`;
    } else if (type === 'composition') {
        let rows = RailwayData.composition.map(item => `
            <div class="menu-card">
                <i class="fas fa-subway"></i>
                <div><h3>${item.coach}</h3><p>Type: ${item.type}</p></div>
            </div>
        `).join('');
        content.innerHTML = `<h4 style="margin-bottom:10px;">Composition of ${currentUnit}</h4>` + rows;
    } else {
        content.innerHTML = `<div class="menu-card"><h3>${title}</h3><p>Data will be synced from Admin Panel.</p></div>`;
    }
}

function goBack() {
    const activeScreen = document.querySelector('.screen.active').id;
    if (activeScreen === 'data-view') {
        navigate('unit-menu', currentUnit);
    } else {
        navigate('home', 'Home');
    }
}






