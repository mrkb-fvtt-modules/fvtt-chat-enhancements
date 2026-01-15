import ChatHandler from "./chatHandler.mjs";
import ChatEditor from "./chatEditor.mjs";
import Setting from "./setting.mjs";
import ControlButtons from "./controlButtons.mjs";
import ActorControl from "./actorControl.mjs";
import ChatHotkey from "./chatHotkey.mjs";
import TurnNotice from "./turnNotice.mjs";
import SystemSpecific from "./systemSpecific.js";

Hooks.once("init", () => {
    //CONFIG.debug.hooks = true;
    Setting.register();
    if (game.system.id === "fatex") SystemSpecific.killFateXChatStyles();
});
Hooks.once("ready", () => {
    ui.chat.element.querySelector(".chat-log").classList.remove("themed", "theme-light");
});
Hooks.on("renderAbstractSidebarTab", (tab, html) => {
    if (tab.id === "chat") {
        ActorControl.initialize();
        ChatEditor.initialize();
        ChatHotkey.initialize();
        ControlButtons.initialize();
    }
});
Hooks.on("combatTurnChange", (combatData) => {
    TurnNotice.notice(combatData);
});
Hooks.on("chatMessage", (chatLog, message, sender) => ChatHandler.chatProcessor(chatLog, message, sender));
Hooks.on("preCreateChatMessage", (message, source, options, id) => ChatHandler.preProcesser(message, source, options, id));
Hooks.on("createChatMessage", (message, option, id) => ChatHandler.createProcesser(message, option, id));
Hooks.on("renderChatMessageHTML", (message, html, data) => ChatHandler.renderProcesser(message, html, data));
Hooks.on("deleteChatMessage", (message) => ChatHandler.fixChatFlag(message));
Hooks.on("getChatMessageContextOptions", (chatLog, options) => {
    console.log(options);
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