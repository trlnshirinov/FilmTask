$(document).ready(function () {

    var id = new URLSearchParams(window.location.search).get("id");

    $.ajax({
        url: "https://api.tvmaze.com/shows/" + id,
        method: "GET",
        success: function(show) {

            var html = `
                <div class="detail-wrapper">
                    <img src="${show.image.original}" alt="${show.name}" class="poster">
                    <div class="info">
                        <h2>${show.name}</h2>
                        <p><b>Language:</b> ${show.language}</p>
                        <p><b>Genres:</b> ${show.genres.join(', ')}</p>
                        <p><b>Rating:</b> ${show.rating.average}</p>
                        <div class="summary">${show.summary}</div>
                    </div>
                </div>
            `;

            $("#detail-container").html(html);
        }
    });

});
