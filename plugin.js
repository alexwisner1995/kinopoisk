// LAMPA plugin
lampa.plugin('kp',{
    name: 'Кинопоиск',
    version: '1.0',
    description: 'Просмотр фильмов',
    poster: 'https://www.kinopoisk.ru/favicon.ico',
    
    run: function(){
        lampa.request('window:open',{
            title: 'Кинопоиск',
            html: `
<div style="padding:20px;background:#000;color:#fff;text-align:center;">
    <h1>🎬 Кинопоиск</h1>
    <p>Введите ID фильма:</p>
    <input type="text" id="movieId" placeholder="Пример: 462682" style="padding:10px;width:200px;margin:10px;">
    <button onclick="play()" style="padding:10px 20px;background:#ff9a00;color:#000;border:none;border-radius:5px;">Смотреть</button>
</div>
<script>
function play(){
    var id = document.getElementById('movieId').value;
    if(id){
        lampa.request('item:select',{
            title: 'Фильм',
            video: [{
                title: 'Кинопоиск', 
                file: 'https://sspoisk.ru/film/' + id + '/',
                type: 'iframe',
                access: 0
            }]
        });
    }
}
</script>
            `
        });
    }
});
