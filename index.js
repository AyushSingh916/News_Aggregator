const apiKey = '14071ce97be7431580610ca6fca27bbd';
const API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
const SEARCH_API = 'https://newsapi.org/v2/everything?';

const cards = document.getElementById('card-container');
const search = document.getElementById('search');
const form = document.getElementById("form");
const submitBtn = document.getElementById('btn');

getTopHeadLines(API_URL);

async function getTopHeadLines(url) {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);
    showTopHeadLines(data);
}

function showTopHeadLines(data) {
    if(data.status === "ok") {
        cards.innerHTML = '';
        const articles = data.articles;

        articles.forEach((article) => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
            <div id="thumbnail">
                <img src="${article.urlToImage}" alt="">
                <p id = "author_name">${article.author}</p>
            </div>
                <div class="card-text">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}">Read More</a>
                </div>
            `
            console.log(article);
            cards.appendChild(card);
        })
    } else {
        throw new Error("Failed to get the articles");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== "") {
        getTopHeadLines(SEARCH_API + `q=${searchTerm}&apiKey=14071ce97be7431580610ca6fca27bbd`);

        search.value = "";
    } else {
        window.location.reload();
    }
})

submitBtn.addEventListener('click', () => {

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== "") {
        getTopHeadLines(SEARCH_API + `q=${searchTerm}&apiKey=14071ce97be7431580610ca6fca27bbd`);

        search.value = "";
    } else {
        window.location.reload();
    }
})