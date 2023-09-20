const setColorMode = (mode) => {
    document.documentElement.setAttribute("data-force-color-mode", mode);
    window.localStorage.setItem("color-mode", mode);
    document.querySelector("#toggle-darkmode").checked = mode === "dark";
};

document.querySelector("#toggle-darkmode").addEventListener("click", (e) => {
    setColorMode(e.target.checked ? "dark" : "light");
});

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

mediaQuery.addEventListener("change", () => {
    if (document.documentElement.getAttribute("data-force-color-mode")) {
        return;
    }
    document.querySelector("#toggle-darkmode").checked = mediaQuery.matches;
});
