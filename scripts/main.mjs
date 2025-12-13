import ChatHandler from "./chatHandler.mjs";
import ChatEditor from "./chatEditor.mjs";
import Setting from "./setting.mjs";
import ControlButtons from "./controlButtons.mjs";
import ActorControl from "./actorControl.mjs";
import ChatHotkey from "./chatHotkey.mjs";
import TurnNotice from "./turnNotice.mjs";

Hooks.once("init", () => {
    //CONFIG.debug.hooks = true;
    Setting.register();
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
    console.log("combatTurnChange Hook fired");
    TurnNotice.notice(combatData);
});
Hooks.on("preCreateChatMessage", (message, source, options, id) => ChatHandler.preProcesser(message, source, options, id));
Hooks.on("createChatMessage", (message, option, id) => ChatHandler.createProcesser(message, option, id));
Hooks.on("renderChatMessage", (message, html, data) => ChatHandler.renderProcesser(message, html, data));
Hooks.on("deleteChatMessage", (message) => ChatHandler.fixChatFlag(message));
Hooks.on("getChatLogEntryContext", (html, entryOptions) => {
    entryOptions.push(
        {
            name: "메시지 수정",
            icon: '<i class="fa-solid fa-pen-to-square"></i>',
            condition: (li) => {
                const message = game.messages.get(li.data('messageId'));
                return ((game.user.isGM || message.isAuthor) && message.type !== 5);
            },
            callback: (li) => ChatEditor._edit(li.data('messageId'))
        }
    );
});