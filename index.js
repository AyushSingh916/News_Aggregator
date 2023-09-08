const apiKey = '14071ce97be7431580610ca6fca27bbd';
const API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

const cards = document.getElementById('card-container');

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
                <img src="${article.urlToImage}" alt="">
                <div class="card-text">
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                    <a href="${article.url}">Read More</a>
                </div>
            `
            // console.log(article);
            cards.appendChild(card);
        })
    } else {
        throw new Error("Failed to get the articles");
    }
}
