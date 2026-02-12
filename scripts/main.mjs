import ChatHandler from "./chatHandler.mjs";
import ChatEditor from "./chatEditor.mjs";
import Setting from "./setting.mjs";
import ControlButtons from "./controlButtons.mjs";
import ActorControl from "./actorControl.mjs";
import ChatHotkey from "./chatHotkey.mjs";
import TurnNotice from "./turnNotice.mjs";
import SystemSpecific from "./systemSpecific.js";
import TypingAlert from "./typingAlert.mjs";

Hooks.once("init", () => {
    //CONFIG.debug.hooks = true;
    Setting.register();
    if (game.system.id === "fatex") SystemSpecific.killFateXChatStyles();
});
Hooks.once("ready", () => {
    const chatLog = ui.chat.element.querySelector(".chat-log");
    const isColoredChat = game.settings.get("mrkb-chat-enhancements", "colored-chat");
    if (isColoredChat) chatLog.classList.remove("themed", "theme-light");
});
Hooks.on("renderAbstractSidebarTab", (tab) => {
    if (tab.id === "chat") {
        ActorControl.initialize();
        ChatEditor.initialize();
        ChatHotkey.initialize();
        ControlButtons.initialize();
        TypingAlert.initialize();
        TypingAlert.clearOldTypingAlerts();
        TypingAlert.startClearingInterval();

        const isColoredChat = game.settings.get("mrkb-chat-enhancements", "colored-chat");
        const isNewFont = game.settings.get("mrkb-chat-enhancements", "new-font");

        const chatLog = tab.element.querySelector(".chat-log");
        if (!chatLog) return;
        if (isColoredChat) chatLog.classList.add("color-applied");
        if (isNewFont) chatLog.classList.add("font-applied");
    }
});
Hooks.on("combatTurnChange", (combatData) => {
    TurnNotice.notice(combatData);
});
Hooks.on("chatMessage", (chatLog, message, sender) => ChatHandler.chatProcessor(chatLog, message, sender));
Hooks.on("preCreateChatMessage", (message, source, options, id) => ChatHandler.preProcesser(message, source, options, id));
Hooks.on("createChatMessage", (message, option, id) => ChatHandler.createProcesser(message, option, id));
Hooks.on("renderChatMessageHTML", (message, html, data) => ChatHandler.renderProcesser(message, html, data));
Hooks.on("deleteChatMessage", ChatHandler.fixChatFlag.bind(ChatHandler, false));
Hooks.on("getChatMessageContextOptions", (chatLog, options) => {
    const editOption = {
        name: game.i18n.localize("MRKB.Edit"),
        icon: '<i class="fa-solid fa-pen-to-square"></i>',
        condition: li => {
            const message = game.messages.get(li.dataset.messageId);
            return ((game.user.isGM || message.isAuthor) && message.type !== 5);
        },
        callback: li => ChatEditor._edit(li.dataset.messageId)
    }
    options.splice(3, 0, editOption);
});