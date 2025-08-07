export function registerSW() {
if ("serviceWorker" in navigator) {
window.addEventListener("load", () => {
const swUrl = ${import.meta.env.BASE_URL}sw.js;
navigator.serviceWorker.register(swUrl).catch(() => {});
});
}
}
