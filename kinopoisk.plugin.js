// LAMPA Plugin
// @alexwisner1995
// https://github.com/alexwisner1995/kinopoisk

;(function(){
    var plugin = {
        name: "Кинопоиск",
        version: "1.0",
        description: "Просмотр через sspoisk.ru",
        poster: "https://www.kinopoisk.ru/favicon.ico",
        age: 18,
        
        init: function(lampa){
            console.log("Kinopoisk plugin loaded");
        },
        
        run: function(lampa){
            var html = `
<div style="padding:20px;background:#000;color:#fff;min-height:100vh;font-family:Arial;">
    <div style="text-align:center;margin-bottom:30px;padding:25px;background:linear-gradient(135deg,#ff9a00,#ff6b00);border-radius:15px;">
        <h1 style="margin:0;font-size:32px;">🎬 КИНОПОИСК</h1>
        <p style="margin:10px 0 0 0;opacity:0.9;">Просмотр через sspoisk.ru</p>
    </div>
    
    <div style="display:flex;gap:10px;margin:20px 0;">
        <input type="text" id="kpId" placeholder="ID фильма (пример: 462682)" style="flex:1;padding:15px;background:#2a2a2a;border:none;border-radius:8px;color:white;font-size:16px;">
        <button onclick="playKp()" style="padding:15px 25px;background:#ff9a00;border:none;border-radius:8px;color:white;font-size:16px;font-weight:bold;cursor:pointer;">Смотреть</button>
    </div>
    
    <div id="player" style="display:none;width:100%;height:500px;background:#000;border-radius:12px;margin:20px 0;">
        <iframe id="frame" style="width:100%;height:100%;border:none;border-radius:10px;" allowfullscreen></iframe>
    </div>
    
    <div>
        <h3 style="color:#ff9a00;">Популярные:</h3>
        <div style="background:#1a1a1a;padding:15px;margin:10px 0;border-radius:8px;cursor:pointer;border-left:4px solid #ff9a00;" onclick="setId(462682)">
            <div style="font-weight:bold;">Ведьмак</div>
            <div style="color:#888;font-size:14px;">ID: 462682</div>
        </div>
        <div style="background:#1a1a1a;padding:15px;margin:10px 0;border-radius:8px;cursor:pointer;border-left:4px solid #ff9a00;" onclick="setId(535341)">
            <div style="font-weight:bold;">1+1</div>
            <div style="color:#888;font-size:14px;">ID: 535341</div>
        </div>
        <div style="background:#1a1a1a;padding:15px;margin:10px 0;border-radius:8px;cursor:pointer;border-left:4px solid #ff9a00;" onclick="setId(447301)">
            <div style="font-weight:bold;">Ход королевы</div>
            <div style="color:#888;font-size:14px;">ID: 447301</div>
        </div>
    </div>
</div>

<script>
function setId(id){
    document.getElementById('kpId').value = id;
    playKp();
}

function playKp(){
    var id = document.getElementById('kpId').value;
    if(!id) return alert('Введите ID');
    
    var url = 'https://sspoisk.ru/film/' + id + '/';
    document.getElementById('frame').src = url;
    document.getElementById('player').style.display = 'block';
    
    if(window.lampa){
        lampa.request('item:select',{
            title: 'Фильм #' + id,
            video: [{
                title: 'Кинопоиск',
                file: url,
                type: 'iframe',
                access: 0
            }]
        });
    }
}

setTimeout(function(){
    document.getElementById('kpId').focus();
}, 1000);
</script>
            `;
            
            lampa.request('window:open',{
                title: this.name,
                html: html,
                width: 1000,
                height: 700
            });
        }
    };
    
    // Регистрация плагина
    if(typeof lampa == 'object') lampa.plugin('kinopoisk', plugin);
    else window.lampa_kinopoisk = plugin;
})();
