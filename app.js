function getSongs(song){
    fetch(`https://api.lyrics.ovh/suggest/${song}`)
    .then(res => res.json())
    .then(data => {
        const result = data.data;
        for(let i=0;i<10;i++){
            const searchResult = document.getElementById('search-result');
            searchResult.innerHTML +=`<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${result[i].title}</h3>
                <p class="author lead">Album by <span>${result[i].artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick='getLyrics("${result[i].artist.name}","${result[i].title}")' class="btn btn-success">Get Lyrics</button>
            </div>
         </div>`
        }
    })
}
function getLyrics(artist,title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => {
        const singleLyrics = document.getElementById('single-lyrics');
        singleLyrics.innerHTML = `<button class="btn go-back">&lsaquo;</button>
        <h2 class="text-success mb-4">${title}</h2>
        <pre class="lyric text-white">
${data.lyrics}
        </pre>`;
    })
}
document.getElementById('searchLyrics').addEventListener('click', () => {
    const song = document.getElementById('inputLyrics').value;
    getSongs(song);
    document.getElementById('inputLyrics').value ="";
})