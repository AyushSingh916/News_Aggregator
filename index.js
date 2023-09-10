const apiKey = '14071ce97be7431580610ca6fca27bbd';
const API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
const SEARCH_API = 'https://newsapi.org/v2/everything?';

const cards = document.getElementById('card-container');
const search = document.getElementById('search');
const form = document.getElementById("form");
const submitBtn = document.getElementById('btn');
const Home = document.getElementById("Home");
const Contact = document.getElementById("Contact");

// getTopHeadLines(API_URL);

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
            const imageAddress = (article.urlToImage != null) ? article.urlToImage : 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
            
            const maxDescriptionLength = 150; // Adjust the desired length
            const description = article.description && article.description.length > maxDescriptionLength
                ? article.description.slice(0, maxDescriptionLength) + '...' // Add ellipsis
                : article.description;
            // description = (description === "null") ? "lorem50" : description;
            const author = article.author && article.author.length > 15
            ? article.author.slice(0, 15) + '...' : article.author;

            card.innerHTML = `
            <h3>${article.title}</h3>
            <div id = "thumbnail_desc">
                <div id="thumbnail">
                    <img src="${imageAddress}" alt="">
                    <p id="author_name">${author}</p>
                </div>
                <div id="card-text">
                    <p>${description}</p> 
                    <a href="${article.url}">Read More</a>
                </div>
            <\div>
            `;

            cards.appendChild(card);
        });
    } else {
        throw new Error("Failed to get the articles");
    }
    console.log(data);
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


Home.addEventListener('click', () => {
    getTopHeadLines(API_URL);
})

Contact.addEventListener('click', () => {
    window.location.href = 'mailto:your_email@example.com';
})

// const servicesButton = document.getElementById("services");
// const dropdown = document.getElementById("dropdown");

// servicesButton.addEventListener("click", () => {
//   dropdown.classList.toggle("show");
// });

// // Close the dropdown if the user clicks outside of it
// window.addEventListener("click", (event) => {
//   if (!event.target.matches("#services") && !event.target.matches("#dropdown")) {
//     if (dropdown.classList.contains("show")) {
//       dropdown.classList.remove("show");
//     }
//   }
// });