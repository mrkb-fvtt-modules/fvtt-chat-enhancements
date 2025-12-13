export default class InterfaceToggle {
    static get(tag, module = "mrkb-chat-enhancements") {
        if (!tag) return;
        return (game.settings.get(module, `ui-${tag}`)) ? "active" : "";
    }

    static set(tag, module = "mrkb-chat-enhancements") {
        if (!tag) return;
        const target = document.querySelectorAll(`[data-widget=${tag}]`);
        let isActive = game.settings.get(module, `ui-${tag}`);
        if (isActive) {
            game.settings.set(module, `ui-${tag}`, false);
            target.forEach((e) => {
                e.classList.remove("active");
            });
        } else {
            game.settings.set(module, `ui-${tag}`, true);
            target.forEach((e) => {
                e.classList.add("active");
            });
        }
    }
}