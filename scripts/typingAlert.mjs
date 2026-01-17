import Setting from "./setting.mjs";

export default class TypingAlert {
    static initialize() {
        const container = document.createElement("div");
        container.id = "typing-alert-container";

        const text = document.createElement("span");
        text.id = "typing-alert-text";

        container.append(text);

        const chatForm = document.querySelector(".chat-form");
        chatForm.append(container);

        game.socket.on("module.mrkb-chat-enhancements", this.receiveTypingAlert);
    }
    static emitTypingAlert() {
        game.socket.emit("module.mrkb-chat-enhancements", {
            type: "typingAlert",
            userId: game.user.id,
            userName: game.user.name
        });
    }
    static receiveTypingAlert(data) {
        if (data.type !== "typingAlert") return;

        const {userId, userName} = data;
        const timestamp = Date.now();
        const players = Setting.get("typing-players") || [];
        const existing = players?.find(e => e.userId === userId);

        if (existing) {
            existing.timestamp = timestamp;
        } else {
            players.push({userId, userName, timestamp});
        }

        Setting.set("typing-players", players);
    }
    static handleTypingAlert(players) {
        const typingAlertContainer = document.querySelector("#typing-alert-container");
        const typingAlertText = document.querySelector("#typing-alert-text");

        const playersList = players.map(e => e.userName).filter(name => name !== game.user.name).sort();

        typingAlertText.innerText = `${playersList.join(game.i18n.lang === "ja" ? "、" : ", ")} ${playersList.length === 1 ? game.i18n.localize("MRKB.IsTyping") : game.i18n.localize("MRKB.AreTyping")}`;

        typingAlertContainer.classList.toggle("active", playersList.length > 0);
    }
    static clearOldTypingAlerts() {
        const players = Setting.get("typing-players") || [];
        const currentTime = Date.now();
        const timeout = 2000;

        const updatedPlayers = players.filter(e => (currentTime - e.timestamp) < timeout);
        Setting.set("typing-players", updatedPlayers);
    }
    static startClearingInterval() {
        setInterval(() => {
            this.clearOldTypingAlerts();
        }, 1000);
    }
}