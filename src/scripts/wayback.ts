/**
 * Replace generic wayback machine link with a link to the requested page's archive.
 */
const requestedUrl = window.location.href;
const waybackUrl = "https://web.archive.org/web/*/";

const waybackLinkElement = document.getElementById("wayback-link");

if (waybackLinkElement) {
    (waybackLinkElement as HTMLAnchorElement).href =
        `${waybackUrl}${requestedUrl}`;
}
