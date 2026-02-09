<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GooseOS Servers Status</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        :root {
            --bg: #0a0a0a;
            --text: #f0f0f0;
            --accent: #00ff9d;
            --online: #28a745;
            --offline: #dc3545;
        }
        
        body {
            font-family: 'JetBrains Mono', monospace;
            background: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            padding: 40px 0;
            border-bottom: 2px solid var(--accent);
        }
        
        .server-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 40px;
        }
        
        .server-card {
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
            padding: 20px;
            border: 1px solid rgba(0,255,157,0.2);
        }
        
        .status-online { color: var(--online); }
        .status-offline { color: var(--offline); }
        
        .api-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: var(--accent);
            color: var(--bg);
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: #00ff9d;">🦢 GooseOS Servers Status</h1>
            <p>Real-time monitoring of all GooseOS infrastructure</p>
        </div>
        
        <div id="status-container">
            <div class="server-grid" id="servers-list">
                <!-- Серверы загружаются через JS -->
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 40px;">
            <a href="/api/status.json" class="api-link" target="_blank">📡 JSON API</a>
            <a href="https://github.com/gooseos" class="api-link" target="_blank" style="margin-left: 10px; background: #333;">🐙 GitHub</a>
        </div>
        
        <div id="last-update" style="text-align: center; margin-top: 20px; color: #666; font-size: 0.9rem;">
            Last update: <span id="update-time">--:--:--</span>
        </div>
    </div>
    
    <script src="js/status.js"></script>
</body>
</html>
