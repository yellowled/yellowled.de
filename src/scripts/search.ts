import type { PageData } from "../pages/api/search.json";

interface Match {
    score: number;
    page: PageData;
}

const form = document.querySelector("#search") as HTMLFormElement;
const term = document.querySelector("#term") as HTMLInputElement;
const results = document.querySelector("#results") as HTMLUListElement;
const heading = document.querySelector("#status") as HTMLParagraphElement;
const url =
    import.meta.env.MODE === "development"
        ? "http://localhost:4321"
        : "https://www.yellowled.de";

form.addEventListener("submit", submitHandler);

function submitHandler(event: SubmitEvent) {
    event.preventDefault();
    search(term.value);
}

/**
 * Convert a search string into a map of regular expressions, score the
 * results in our searchIndex against them and return matching pages
 * ranked by relevance.
 */
async function search(query: string) {
    const response = await fetch(`${url}/api/search.json`);
    const searchIndex = await response.json();

    const escapeRegExp = (s: string): string =>
        s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regMap = query
        .split(/\s+/)
        .filter((word) => word.length)
        .map((word) => new RegExp(escapeRegExp(word), "i"));

    const matches = searchIndex
        .reduce(function (matches: Match[], page: PageData) {
            let score = 0;

            for (const reg of regMap) {
                if (reg.test(page.title)) {
                    score += 100;
                }
                if (reg.test(page.description ?? "")) {
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
        .sort((a: Match, b: Match) => b.score - a.score);

    showResults(matches);
}

/**
 * Dynamically insert search results into the DOM or give a
 * "no results" message.
 */
function showResults(matches: Match[]) {
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
