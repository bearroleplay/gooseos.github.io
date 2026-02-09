async function updateStatus() {
    try {
        const response = await fetch('/api/status.json?t=' + Date.now());
        const data = await response.json();
        
        document.getElementById('update-time').textContent = 
            new Date(data.updated).toLocaleTimeString('ru-RU');
        
        let html = '';
        for (const [id, server] of Object.entries(data.servers)) {
            html += `
                <div class="server-card">
                    <h3>${server.name} ${getFlag(server.location)}</h3>
                    <p><strong>Location:</strong> ${server.location}</p>
                    <p><strong>Status:</strong> 
                        <span class="status-${server.status}">
                            ${server.status === 'online' ? '🟢 ONLINE' : '🔴 OFFLINE'}
                        </span>
                    </p>
                    <p><strong>Response time:</strong> ${server.response_time}ms</p>
                    <p><strong>Uptime:</strong> ${server.uptime}</p>
                    <div style="margin-top: 15px;">
                        <a href="${server.endpoints.status}" target="_blank" style="color: #00ff9d;">📊 Status Page</a> | 
                        <a href="${server.endpoints.downloads}" target="_blank" style="color: #0073e6;">📥 Downloads</a>
                    </div>
                </div>
            `;
        }
        
        document.getElementById('servers-list').innerHTML = html;
    } catch (error) {
        console.error('Failed to fetch status:', error);
    }
}

function getFlag(location) {
    const flags = {
        'Moscow, RU': '🇷🇺',
        'Frankfurt, DE': '🇩🇪',
        'New York, US': '🇺🇸'
    };
    return flags[location] || '🌐';
}

// Обновляем каждые 30 секунд
updateStatus();
setInterval(updateStatus, 30000);
