// LAMPA Plugin: Kinopoisk Viewer
// @kinopoisk
// Version: 1.2

lampa.plugin("kinopoisk",{
    name: "Кинопоиск Просмотр",
    version: "1.2", 
    description: "Просмотр фильмов через sspoisk.ru",
    poster: "https://upload.wikimedia.org/wikipedia/commons/7/70/Kinopoisk_colored_square_icon.svg",
    
    init: function(){
        console.log("Kinopoisk plugin loaded");
    },
    
    run: function(){
        let html = `
<div style="padding:20px;background:#000;color:#fff;min-height:100vh;font-family:Arial;">
    <div style="text-align:center;margin-bottom:30px;padding:25px;background:linear-gradient(135deg,#ff9a00,#ff6b00);border-radius:15px;border:2px solid #ff8c00;">
        <h1 style="margin:0;font-size:32px;color:#fff;text-shadow:2px 2px 4px rgba(0,0,0,0.5);">🎬 КИНОПОИСК</h1>
        <p style="margin:10px 0 0 0;opacity:0.9;font-size:18px;">Смотрите фильмы и сериалы через sspoisk.ru</p>
    </div>
    
    <div style="display:flex;gap:15px;margin:25px 0;align-items:center;">
        <input type="text" id="kpSearch" placeholder="Введите ID Кинопоиска (например: 462682)" style="flex:1;padding:18px;background:#2a2a2a;border:2px solid #ff9a00;border-radius:10px;color:white;font-size:18px;">
        <button onclick="playKpMovie()" style="padding:18px 30px;background:#ff9a00;border:none;border-radius:10px;color:white;font-size:18px;font-weight:bold;cursor:pointer;transition:all 0.3s;">Смотреть ▶️</button>
    </div>
    
    <div id="kpPlayer" style="display:none;width:100%;height:600px;background:#000;border-radius:15px;margin:30px 0;border:3px solid #ff9a00;">
        <iframe id="kpFrame" style="width:100%;height:100%;border:none;border-radius:12px;" allowfullscreen></iframe>
    </div>
    
    <div style="margin-top:40px;">
        <h3 style="color:#ff9a00;font-size:24px;border-bottom:2px solid #ff9a00;padding-bottom:10px;">🎯 Популярные фильмы:</h3>
        
        <div style="background:#1a1a1a;padding:20px;margin:15px 0;border-radius:10px;cursor:pointer;border-left:5px solid #ff9a00;transition:all 0.3s;" onclick="setKpId(462682)" onmouseover="this.style.transform='translateX(10px)';this.style.background='#2a2a2a'" onmouseout="this.style.transform='translateX(0)';this.style.background='#1a1a1a'">
            <div style="font-weight:bold;font-size:20px;color:#ff9a00;">Ведьмак</div>
            <div style="color:#888;font-size:16px;">ID: 462682 • 2019 • Фэнтези • ★ 7.8</div>
        </div>
        
        <div style="background:#1a1a1a;padding:20px;margin:15px 0;border-radius:10px;cursor:pointer;border-left:5px solid #ff9a00;transition:all 0.3s;" onclick="setKpId(535341)" onmouseover="this.style.transform='translateX(10px)';this.style.background='#2a2a2a'" onmouseout="this.style.transform='translateX(0)';this.style.background='#1a1a1a'">
            <div style="font-weight:bold;font-size:20px;color:#ff9a00;">1+1</div>
            <div style="color:#888;font-size:16px;">ID: 535341 • 2011 • Комедия, Драма • ★ 8.8</div>
        </div>
        
        <div style="background:#1a1a1a;padding:20px;margin:15px 0;border-radius:10px;cursor:pointer;border-left:5px solid #ff9a00;transition:all 0.3s;" onclick="setKpId(447301)" onmouseover="this.style.transform='translateX(10px)';this.style.background='#2a2a2a'" onmouseout="this.style.transform='translateX(0)';this.style.background='#1a1a1a'">
            <div style="font-weight:bold;font-size:20px;color:#ff9a00;">Ход королевы</div>
            <div style="color:#888;font-size:16px;">ID: 447301 • 2020 • Драма • ★ 8.2</div>
        </div>
        
        <div style="background:#1a1a1a;padding:20px;margin:15px 0;border-radius:10px;cursor:pointer;border-left:5px solid #ff9a00;transition:all 0.3s;" onclick="setKpId(408636)" onmouseover="this.style.transform='translateX(10px)';this.style.background='#2a2a2a'" onmouseout="this.style.transform='translateX(0)';this.style.background='#1a1a1a'">
            <div style="font-weight:bold;font-size:20px;color:#ff9a00;">Чернобыль</div>
            <div style="color:#888;font-size:16px;">ID: 408636 • 2019 • Драма • ★ 9.1</div>
        </div>
        
        <div style="background:#1a1a1a;padding:20px;margin:15px 0;border-radius:10px;cursor:pointer;border-left:5px solid #ff9a00;transition:all 0.3s;" onclick="setKpId(522892)" onmouseover="this.style.transform='translateX(10px)';this.style.background='#2a2a2a'" onmouseout="this.style.transform='translateX(0)';this.style.background='#1a1a1a'">
            <div style="font-weight:bold;font-size:20px;color:#ff9a00;">Игра в кальмара</div>
            <div style="color:#888;font-size:16px;">ID: 522892 • 2021 • Триллер • ★ 7.9</div>
        </div>
    </div>
</div>

<script>
function setKpId(id){
    document.getElementById('kpSearch').value = id;
    playKpMovie();
}

function playKpMovie(){
    let id = document.getElementById('kpSearch').value;
    if(!id) return alert('Введите ID фильма');
    
    let url = 'https://sspoisk.ru/film/' + id + '/';
    document.getElementById('kpFrame').src = url;
    document.getElementById('kpPlayer').style.display = 'block';
    
    // Прокрутка к плееру
    document.getElementById('kpPlayer').scrollIntoView({behavior: 'smooth'});
    
    // Интеграция с LAMPA
    if(typeof lampa !== 'undefined'){
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

// Автофокус для TV
setTimeout(() => {
    let input = document.getElementById('kpSearch');
    if(input) input.focus();
}, 1000);

// Поиск по Enter
document.addEventListener('keypress', function(e){
    if(e.key === 'Enter' && document.getElementById('kpSearch') === document.activeElement){
        playKpMovie();
    }
});
</script>
        `;
        
        lampa.request('window:open',{
            title: this.name,
            html: html,
            width: 1200,
            height: 800
        });
    }
});
