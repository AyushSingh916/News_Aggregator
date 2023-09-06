document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '14071ce97be7431580610ca6fca27bbd';
    const newsList = document.getElementById('news-list');

    // Function to fetch news articles
    async function fetchNews() {
        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
            const data = await response.json();

            // console.log(data);

            if (data.status === 'ok') {
                const articles = data.articles;
                articles.forEach(article => {
                    const articleElement = document.createElement('article');
                    articleElement.innerHTML = `
                        <h2>${article.title}</h2>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                    `;
                    newsList.appendChild(articleElement);
                });
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Call the fetchNews function to load news articles when the page loads
    fetchNews();
});
