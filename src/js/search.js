export const initSearch = (url = 'http://localhost:8080') => {
    const searchForm = document.getElementById('search');
    const searchInput = document.getElementById('search__term');
    const searchResults = document.getElementById('search__results');

    if (!searchForm) return;

    searchInput.value = searchInput.value.replace(`site:${url} `, '');

    const createNoResultsHTML = () =>
        '<p>Sorry, für diese(n) Suchbegriff(e) gibt es leider keine Treffer.</p>';

    const createResultsHTML = (results) => {
        let html = `<p>Found ${results.length} matching articles</p>`;

        html += '<dl>';

        html += results
            .map(function (item) {
                return `<dt><a href="${item.url}">${item.title}</a></dt><dd>${item.summary}</dd>`;
            })
            .join('');

        html += '</dl>';

        return html;
    };

    const searchTerm = function (query, searchIndex) {
        const reg = new RegExp(query, 'gi');
        const priority1 = [];
        const priority2 = [];

        searchIndex.forEach(function (item) {
            if (reg.test(item.title)) return priority1.push(item);
            if (reg.test(item.summary)) priority2.push(item);
        });

        const results = [].concat(priority1, priority2);

        searchResults.innerHTML =
            results.length < 1
                ? createNoResultsHTML()
                : createResultsHTML(results);
    };

    async function getSearchIndex(url) {
        try {
            const response = await fetch(`${url}/searchIndex.json`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSearchSubmit(event) {
        event.preventDefault();
        const idx = await getSearchIndex(url);
        searchTerm(searchInput.value, idx);
    }

    searchForm.addEventListener('submit', handleSearchSubmit, false);
};
