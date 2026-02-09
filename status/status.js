// Данные серверов GooseOS
const gooseosServers = {
    "moscow": {
        id: "moscow",
        name: "GOOSE-MOW-01",
        location: "Москва, Россия",
        country: "🇷🇺",
        ip: "95.163.208.115",
        host: "moscow.gooseos.live",
        website: "https://bearroleplay.github.io/gooseos.github.io/status/moscow/",
        status: "online",
        ping: 28,
        uptime: "99.8%",
        type: "updates",
        description: "Основной сервер обновлений GooseOS",
        lastCheck: new Date().toLocaleTimeString('ru-RU'),
        coordinates: { lat: 55.7558, lng: 37.6173 }
    },
    "frankfurt": {
        id: "frankfurt",
        name: "GOOSE-FRA-01",
        location: "Франкфурт, Германия",
        country: "🇩🇪",
        ip: "95.217.180.190",
        host: "fra.gooseos.live",
        website: "https://bearroleplay.github.io/gooseos.github.io/status/frankfurt/",
        status: "load",
        ping: 142,
        uptime: "99.5%",
        type: "cdn",
        description: "CDN сервер для Европы",
        lastCheck: new Date().toLocaleTimeString('ru-RU'),
        coordinates: { lat: 50.1109, lng: 8.6821 }
    },
    "newyork": {
        id: "newyork",
        name: "GOOSE-NYC-01",
        location: "Нью-Йорк, США",
        country: "🇺🇸",
        ip: "142.132.158.163",
        host: "nyc.gooseos.live",
        website: "https://bearroleplay.github.io/gooseos.github.io/status/newyork/",
        status: "online",
        ping: 65,
        uptime: "99.7%",
        type: "mirror",
        description: "Зеркальный сервер для Северной Америки",
        lastCheck: new Date().toLocaleTimeString('ru-RU'),
        coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    "singapore": {
        id: "singapore",
        name: "GOOSE-SIN-01",
        location: "Сингапур",
        country: "🇸🇬",
        ip: "139.162.116.72",
        host: "sin.gooseos.live",
        website: "https://bearroleplay.github.io/gooseos.github.io/status/singapore/",
        status: "offline",
        ping: -1,
        uptime: "98.2%",
        type: "edge",
        description: "Edge сервер для Азии",
        lastCheck: new Date().toLocaleTimeString('ru-RU'),
        coordinates: { lat: 1.3521, lng: 103.8198 }
    }
};

// Загрузка и отображение статуса
function loadStatus() {
    // Имитация загрузки с сервера (в реальности будет fetch)
    setTimeout(() => {
        renderServers();
        updateStats();
        updateLastUpdateTime();
    }, 500);
}

// Рендер списка серверов
function renderServers() {
    const container = document.getElementById('servers-container');
    let html = '<div class="servers-grid">';
    
    Object.values(gooseosServers).forEach(server => {
        const statusClass = `status-${server.status}`;
        const statusText = getStatusText(server.status);
        const statusEmoji = getStatusEmoji(server.status);
        const pingClass = getPingClass(server.ping);
        const pingText = server.ping > 0 ? `${server.ping} ms` : '—';
        
        // Определяем ссылки
        const statusLink = server.website || '#';
        const downloadLink = `https://bearroleplay.github.io/gooseos.github.io/downloads/#${server.id}`;
        
        html += `
            <div class="server-card">
                <div class="server-header">
                    <div class="server-name">${server.name} ${server.country}</div>
                    <span class="server-status ${statusClass}">
                        ${statusEmoji} ${statusText}
                    </span>
                </div>
                
                <div class="server-info">
                    <div class="info-row">
                        <span class="info-label">📍 Местоположение:</span>
                        <span class="info-value">${server.location}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">⏱️ Ping:</span>
                        <span class="info-value ${pingClass}">${pingText}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">📊 Uptime:</span>
                        <span class="info-value">${server.uptime}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">🕐 Последняя проверка:</span>
                        <span class="info-value">${server.lastCheck}</span>
                    </div>
                </div>
                
                <div style="color: var(--text-secondary); font-size: 0.9rem; margin: 15px 0; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                    <i class="fas fa-info-circle"></i> ${server.description}
                </div>
                
                <div class="server-actions">
                    <a href="${statusLink}" class="btn btn-status" target="_blank">
                        <i class="fas fa-server"></i> Страница статуса
                    </a>
                    <a href="${downloadLink}" class="btn ${server.status === 'offline' ? 'btn-disabled' : 'btn-download'}" 
                       ${server.status === 'offline' ? 'onclick="return false;"' : ''}>
                        <i class="fas fa-download"></i> Загрузки
                    </a>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Обновление статистики
function updateStats() {
    const counts = {
        online: 0,
        load: 0,
        offline: 0,
        attack: 0
    };
    
    Object.values(gooseosServers).forEach(server => {
        counts[server.status]++;
    });
    
    document.getElementById('online-count').textContent = counts.online;
    document.getElementById('load-count').textContent = counts.load;
    document.getElementById('offline-count').textContent = counts.offline;
    document.getElementById('attack-count').textContent = counts.attack;
}

// Обновление времени последней проверки
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU', { hour12: false });
    document.getElementById('last-update').textContent = timeString;
}

// Вспомогательные функции
function getStatusText(status) {
    const texts = {
        'online': 'Онлайн',
        'load': 'Нагрузка',
        'offline': 'Оффлайн',
        'attack': 'Под атакой'
    };
    return texts[status] || 'Неизвестно';
}

function getStatusEmoji(status) {
    const emojis = {
        'online': '🟢',
        'load': '🟡',
        'offline': '🔴',
        'attack': '⚡'
    };
    return emojis[status] || '❓';
}

function getPingClass(ping) {
    if (ping <= 0) return 'ping-bad';
    if (ping < 50) return 'ping-good';
    if (ping < 150) return 'ping-medium';
    return 'ping-bad';
}

// Имитация обновления статуса (в реальности будет AJAX запрос)
function simulateStatusUpdates() {
    setInterval(() => {
        // Случайное изменение статуса для демонстрации
        Object.keys(gooseosServers).forEach(id => {
            if (Math.random() > 0.8) { // 20% шанс изменения
                const statuses = ['online', 'load', 'offline', 'attack'];
                const current = gooseosServers[id].status;
                let newStatus = current;
                
                while (newStatus === current) {
                    newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                }
                
                gooseosServers[id].status = newStatus;
                gooseosServers[id].ping = newStatus === 'offline' ? -1 : 
                    Math.floor(Math.random() * (newStatus === 'load' ? 300 : 100)) + 20;
                gooseosServers[id].lastCheck = new Date().toLocaleTimeString('ru-RU');
            }
        });
        
        renderServers();
        updateStats();
        updateLastUpdateTime();
    }, 30000); // Каждые 30 секунд
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadStatus();
    simulateStatusUpdates();
    
    // Автообновление каждые 30 секунд
    setInterval(loadStatus, 30000);
});
