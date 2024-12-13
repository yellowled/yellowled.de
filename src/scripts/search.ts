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

async function search(query: string) {
    const response = await fetch(`${url}/api/search.json`);
    const searchIndex = await response.json();
    const regMap = query
        .toLowerCase()
        .split(" ")
        .filter((word) => word.length)
        .map((word) => new RegExp(word, "i"));
    const matches = searchIndex
        .reduce(function (matches: Match[], page: PageData) {
            let score = 0;

            for (const reg of regMap) {
                if (reg.test(page.title)) {
                    score += 100;
                }
                if (reg.test(page.description as string)) {
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
