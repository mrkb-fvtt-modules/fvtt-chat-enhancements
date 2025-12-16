import {ASSETS_PATH} from "./constants.mjs";

export default class ChatEditor {
    static initialize() {
        const placeholder = document.createElement("div");
        placeholder.id = "chat-editor-placeholder";
        placeholder.innerHTML = "<i class=\"fa-solid fa-pen-to-square\"></i>" + game.i18n.localize("MRKB.ChatEditPlaceholder");

        const editor = document.createElement("textarea");
        editor.id = "chat-editor";
        editor.autocomplete = "off";
        editor.classList.add("disabled");
        editor.onkeydown = (e) => ChatEditor._onKeyDown(e);

        const chatForm = document.querySelector(".chat-form");
        chatForm.append(editor, placeholder);
    }
    static _onKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) ChatEditor._send(e);
        else if (e.key === "Escape") ChatEditor._quit(e);
    }
    static _send(ev) {
        ev.preventDefault();
        const message = document.querySelector("#chat-message");
        const editor = document.querySelector("#chat-editor");

        const id = editor.dataset.mid;
        const msg = game.messages.get(id);

        message.classList.remove("disabled");
        editor.classList.add("disabled");

        let con = editor.value;
        con = con.replace(/\*\*(.*)\*\*/g,"<b>$1</b>");
        con = con.replace(/\*(.*)\*/g,"<i>$1</i>");
        con = con.replace(/( )(?![^<]*>|[^<>]*<)/g,"&nbsp;");

        msg.update({content : con});
        editor.value = "";
        message.focus();
    }
    static _quit() {
        const message = document.querySelector("#chat-message");
        const editor = document.querySelector("#chat-editor");

        message.classList.remove("disabled");
        editor.classList.add("disabled");

        editor.value = "";
        message.focus();
    }
    static _edit(id) {
        const message = game.messages.get(id);
        const chatter = document.querySelector("#chat-message");
        const editor = document.querySelector("#chat-editor");

        chatter.classList.add("disabled");
        editor.classList.remove("disabled");
        editor.dataset.mid = id;
        editor.value = message.content;
        editor.focus();
    }
}