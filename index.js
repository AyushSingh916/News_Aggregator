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
    if (data.status === "ok") {
        cards.innerHTML = '';
        const articles = data.articles;

        articles.forEach((article, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = `card-${index}`; // Add a unique identifier to each card

            card.innerHTML = `
            <div id="thumbnail">
                <img src="${article.urlToImage}" alt="">
                <p id="author_name">${article.author}</p>
                <a href="${article.url} id = "visSrc">Visit Source</a>
            </div>
            <div class="card-text">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <hr>
                <button class="readMore" id = "read">Read More</button>
                <div class="hidden-content" id="content-${index}">${article.content}</div> <!-- Hidden content -->
            </div>
            `;

            cards.appendChild(card);
        });

        // Add event listeners for "Read More" buttons
        const readMoreButtons = document.querySelectorAll('.readMore');
        readMoreButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                toggleHiddenContent(index); // Toggle content when the button is clicked
            });
        });
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

function toggleHiddenContent(index) {
    const content = document.getElementById(`content-${index}`);
    const readMoreButton = document.querySelector(`#card-${index} .readMore`); // Select the button within the card

    if (content) {
        content.classList.toggle('show');
        readMoreButton.classList.toggle('show');

        if (content.classList.contains('show')) {
            // If content is shown, set button text to "Read Less"
            readMoreButton.innerText = 'Read Less';
        } else {
            // If content is hidden, set button text to "Read More"
            readMoreButton.innerText = 'Read More';
        }
    }
}