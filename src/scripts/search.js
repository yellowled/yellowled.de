const form = document.querySelector("#search");
const term = document.querySelector("#term");
const results = document.querySelector("#results");
const heading = document.querySelector("#status");
const url =
    import.meta.env.MODE === "development"
        ? "http://localhost:3000"
        : "https://www.yellowled.de";

form.addEventListener("submit", submitHandler);

function submitHandler(event) {
    event.preventDefault();
    search(term.value);
}

async function search(query) {
    const response = await fetch(`${url}/api/search.json`);
    const searchIndex = await response.json();
    const regMap = query
        .toLowerCase()
        .split(" ")
        .filter((word) => word.length)
        .map((word) => new RegExp(word, "i"));
    let matches = searchIndex
        .reduce(function (matches, page) {
            let score = 0;

            for (let reg of regMap) {
                if (reg.test(page.title)) {
                    score += 100;
                }
                if (reg.test(page.description)) {
                    score += 50;
                }
            }

            if (score > 0) {
                matches.push({
                    score,
                    page,
                });
            }

            return matches;
        }, [])
        .sort((a, b) => b.score - a.score);

    showResults(matches);
}

function showResults(matches) {
    if (matches.length) {
        heading.textContent = `${matches.length} Treffer gefunden:`;
        let resultsHTML = "";
        matches.map((match) => {
            resultsHTML += `<li><a href=${match.page.url}>${match.page.title}</a></li>`;
        });
        results.innerHTML = resultsHTML;
    } else {
        heading.textContent = `Keine Treffer gefunden.`;
        results.innerHTML = "";
    }
}
