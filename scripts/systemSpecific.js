export default class SystemSpecific {
    static killFateXChatStyles() {
        const head = document.head;
        const styles = head.querySelectorAll("style");
        const fateXStyles = Array.from(styles).find(s => s.innerHTML.includes("fatex"));
        if (fateXStyles) {
            fateXStyles.innerHTML = "@layer system {" + fateXStyles.innerHTML.replaceAll(`!important`, ``) + "}";
        }
    }
}