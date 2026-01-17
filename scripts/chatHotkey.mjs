import ChatEditor from "./chatEditor.mjs";
import ActorControl from "./actorControl.mjs";
import Setting from "./setting.mjs";
import TypingAlert from "./typingAlert.mjs";

export default class ChatHotkey {
    static initialize() {
        const chatMessage = document.querySelector("#chat-message");
        chatMessage.addEventListener("keydown", this._chatMessageListener, true, 100);
    }

    static _chatMessageListener(e) {
        TypingAlert.emitTypingAlert("add");
        if (e.key === "Tab") {
            e.preventDefault();
            e.stopImmediatePropagation();

            const favorites = Setting.get("actor-favorites");
            if (favorites?.length === 0 || favorites === undefined) return;

            const list = [];

            favorites.forEach((e) => {
                const chara = game.actors.get(e);
                if (!chara) return;
                list.push({
                    id : e,
                    name : chara.name
                });
            });

            list.sort((a, b) => {
                return a.name > b.name ? 1 : -1;
            });

            const currentChara = game.user.character?.id;

            const index = list.findIndex((e) => e.id === currentChara);
            const next = (index < list.length - 1) ? index + 1 : -1;
            const prev = (index > -1) ? index - 1 : list.length - 1;

            const newIndex = e.shiftKey ? prev : next;
            if (newIndex === -1) ActorControl._reset();
            else ActorControl._select(list[newIndex].id);
        } else if (e.key === "ArrowUp" && e.target.value.length === 0) {
            e.preventDefault();
            e.stopImmediatePropagation();

            const msg = game.messages.contents.filter(i => i.isAuthor);
            if (msg.length === 0) return;
            ChatEditor._edit(msg[msg.length - 1].id);
        }
    }
}