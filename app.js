function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    document.getElementById('back-btn').style.display = 'block';
}

function goHome() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('home-screen').classList.add('active');
    document.getElementById('back-btn').style.display = 'none';
    document.getElementById('header-title').innerText = "ART/SPARME App";
}

function showUnit(unitName) {
    document.getElementById('header-title').innerText = unitName;
    showPage('unit-detail-screen');
}

function showData(type) {
    document.getElementById('header-title').innerText = type;
    showPage('data-view-screen');
    const content = document.getElementById('data-content');
    
    if(type === 'Equipment') {
        content.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Equipment Name</th>
                        <th>Qty</th>
                        <th>Shortfall</th>
                        <th>Next Due</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Hydraulic Jack</td><td>10</td><td class="shortfall">2</td><td>20-Jan-2026</td></tr>
                    <tr><td>Gas Cutter</td><td>5</td><td>0</td><td>15-Mar-2026</td></tr>
                    <tr><td>Generator Set</td><td>2</td><td class="shortfall">1</td><td>10-Feb-2026</td></tr>
                </tbody>
            </table>
        `;
    } else {
        content.innerHTML = `<p style="padding:20px;">Data for ${type} will be updated by Admin.</p>`;
    }
}