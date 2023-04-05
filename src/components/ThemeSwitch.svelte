<script>
    import { onMount } from "svelte";
    import { theme } from "../store/theme";

    const THEME_DARK = "dark";
    const THEME_LIGHT = "light";
    let currTheme = THEME_DARK;

    function toggleTheme() {
        window.document.documentElement.classList.toggle(THEME_DARK);
        currTheme =
            localStorage.getItem("theme") === THEME_DARK
                ? THEME_LIGHT
                : THEME_DARK;
        localStorage.setItem("theme", currTheme);
        theme.set(currTheme);
    }

    onMount(() => {
        if (
            localStorage.getItem("theme") === THEME_DARK ||
            (!("theme" in localStorage) &&
                window.matchMedia(`(prefers-color-scheme: ${THEME_DARK})`)
                    .matches)
        ) {
            window.document.documentElement.classList.add(THEME_DARK);
            currTheme = THEME_DARK;
        } else {
            window.document.documentElement.classList.remove(THEME_DARK);
            currTheme = THEME_LIGHT;
        }
        theme.set(currTheme);
    });

    $: label =
        currTheme === THEME_DARK
            ? "Zum hellen Theme wechseln"
            : "Zum dunklen Theme wechseln";
</script>

<button on:click={toggleTheme} aria-label={label}>
    <slot theme={currTheme} />
</button>

<style lang="scss">
    @use "../scss/mixins/buttons";

    button {
        @include buttons.unstyled-button;

        color: var(--color-text);

        &:hover,
        &:focus {
            color: var(--color-text);
        }
    }
</style>
