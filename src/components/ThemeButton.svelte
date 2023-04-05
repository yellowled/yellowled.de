<script>
    import ThemeSwitch from "./ThemeSwitch.svelte";

    import Sun from "../icons/Sun.svelte";
    import Moon from "../icons/Moon.svelte";
</script>

<ThemeSwitch let:theme>
    {#if theme === "dark"}
        <Sun />
    {:else}
        <Moon />
    {/if}
</ThemeSwitch>
