document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadUsers();
    document.getElementById('exportBtn').addEventListener('click', exportToCSV);
}

async function loadUsers() {
    showLoading(true);
    try {
        const response = await fetch('/api/users');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error cargando usuarios:', error);
        showError('Error al cargar los usuarios. Por favor, intente nuevamente.');
    } finally {
        showLoading(false);
    }
}

function showLoading(show) {
    const loadingElement = document.getElementById('loading');
    const tableElement = document.getElementById('tableWrapper');
    const exportButton = document.getElementById('exportBtn');

    if (loadingElement && tableElement && exportButton) {
        loadingElement.style.display = show ? 'flex' : 'none';
        tableElement.style.display = show ? 'none' : 'block';
        exportButton.disabled = show;
    }
}

function showError(message) {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.innerHTML = `
            <div class="error-message">
                <p>❌ ${message}</p>
                <button onclick="initializeApp()" class="btn">Reintentar</button>
            </div>
        `;
    }
}

function displayUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${user.picture}" alt="${user.name}" class="user-photo"></td>
            <td>${user.name}</td>
            <td>${user.gender}</td>
            <td>${user.location}</td>
            <td>${user.email}</td>
            <td>${formatDate(user.dateOfBirth)}</td>
        `;
        tbody.appendChild(row);
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

function exportToCSV() {
    const table = document.getElementById('usersTable');
    if (!table) return;

    const rows = table.querySelectorAll('tr');
    let csv = [];
    
    for (let i = 0; i < rows.length; i++) {
        const row = [], cols = rows[i].querySelectorAll('td, th');
        
        for (let j = 0; j < cols.length; j++) {
            // Ignorar la columna de la foto para el CSV
            if (i === 0 && j === 0) continue;
            if (i > 0 && j === 0) continue;
            
            let text = cols[j].innerText;
            text = text.replace(/"/g, '""'); // Escapar comillas dobles
            row.push(`"${text}"`);
        }
        if (row.length > 0) {
            csv.push(row.join(','));
        }
    }
    
    const csvContent = csv.join('\\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, 'usuarios.csv');
    } else {
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'usuarios.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
} 