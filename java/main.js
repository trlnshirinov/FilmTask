let page = 0;
const perPage = 20;
let allCards = [];
let filteredCards = [];

function loadInfo() {
    fetch(`https://api.tvmaze.com/shows?&select=key1,key2,key3`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('shows-container');

            allCards = data;
            filteredCards = allCards;
            newPage();
        });
}



function newPage() {
    const container = document.getElementById('shows-container');
    const start = page * perPage;
    const end = start + perPage;

    filteredCards.slice(start, end).forEach(show => {
        const genres = show.genres.join(', ');
        const rating = show.rating.average;

        const html = `
        <div class="col-md-3 mb-4">
            <div class="card h-100">
                <img src="${show.image ? show.image.medium : 'https://via.placeholder.com/210x295'}" class="card-img-top" alt="${show.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${show.name}</h5>
                    <p class="card-text-lang mb-1">${show.language}</p>
                    <p class="card-text text-secondary mb-1"><strong>Genres:</strong> ${genres}</p>
                    <p class="card-text text-secondary mb-2"><strong>Rating:</strong> ${rating}</p>
                    <a href="detail.html?id=${show.id}" class="btn btn-primary mt-auto">Details</a>
                </div>
            </div>
        </div>`;

        container.insertAdjacentHTML('beforeend', html);
    });
}

document.getElementById('load-more').addEventListener('click', () => {
    page++; 
    newPage();
});




document.querySelector('input[type="search"]').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    page = 0;
    document.getElementById('shows-container').innerHTML = '';

    filteredCards = allCards.filter(show => show.name.toLowerCase().includes(query));
    newPage();
});


loadInfo();

