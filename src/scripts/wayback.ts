const requestedUrl = window.location.href;
const waybackUrl = `https://web.archive.org/web/*/${requestedUrl}`;

const requestedUrlElement = document.getElementById("requested-url");
if (requestedUrlElement) {
    requestedUrlElement.textContent = requestedUrl;
}

const waybackLinkElement = document.getElementById("wayback-link");
if (waybackLinkElement) {
    (waybackLinkElement as HTMLAnchorElement).href = waybackUrl;
}
