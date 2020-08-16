/**
 * Replace static (Google) search with dynamic JS search
 *
 * @param {String} siteUrl Preset url for the static search form's `site:` value
 */

export const initSearch = (siteUrl = 'yellowled.de') => {
    const searchForm = document.getElementById('search');
    const searchInput = document.getElementById('search__term');
    const searchResults = document.getElementById('search__results');

    if (!searchForm) return;

    // Clear the static form field's preset value
    searchInput.value = searchInput.value.replace(`site:${siteUrl} `, '');

    /**
     * Create the markup for search results
     *
     * @param {Array} results Matching search results data
     * @return {String} Markup created from data
     */
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

    /**
     * Search for a query in the data of our search index
     *
     * @param {String} query The term(s) to search for
     * @param {Array} searchIndex Searchable data for every page
     */
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
                ? '<p>Für diese(n) Suchbegriff(e) gibt es keine Treffer.</p>'
                : createResultsHTML(results);
    };

    // Fetch search index data
    async function getSearchIndex() {
        try {
            const response = await fetch('../searchIndex.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    // Handle submitting the search form
    async function handleSearchSubmit(event) {
        event.preventDefault();
        const idx = await getSearchIndex();
        searchTerm(searchInput.value, idx);
    }

    searchForm.addEventListener('submit', handleSearchSubmit, false);
};
