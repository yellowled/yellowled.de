const setColorMode = (mode) => {
    document.documentElement.setAttribute("data-theme", mode);
    window.localStorage.setItem("theme", mode);
    document.querySelector("#theme").checked = mode === "dark";
};

document.querySelector("#theme").addEventListener("click", (e) => {
    setColorMode(e.target.checked ? "dark" : "light");
});

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

mediaQuery.addEventListener("change", () => {
    if (document.documentElement.getAttribute("data-theme")) {
        return;
    }
    document.querySelector("#theme").checked = mediaQuery.matches;
});
