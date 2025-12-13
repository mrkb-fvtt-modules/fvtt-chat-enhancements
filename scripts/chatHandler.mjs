import Setting from "./setting.mjs";
import ChatExporter from "./chatExporter.mjs";
import ChatEditor from "./chatEditor.mjs";
import getPortrait from "./getPortrait.mjs";

export default class ChatHandler {
    static preProcesser(message, source, options/*, id*/) {
        if (!message.isAuthor) return;

        const chara = game.user.character;
        const speaker = { ...message.speaker };
        const speakerNeeded = !speaker.alias && chara && message.style === 1;
        const style = speakerNeeded ? 2 : message.style;
        if (speakerNeeded) {
            speaker.actor = chara._id;
            speaker.alias = chara.name;
        }

        let chatType = Setting.get("talk-mode");
        if (options.mrkbturn) chatType = "turn";
        if (options.mrkbdesc) chatType = "description";

        let con = message.content;

        con = con.replace(/\*\*(.*)\*\*/g,"<b>$1</b>");
        con = con.replace(/\*(.*)\*/g,"<i>$1</i>");
        con = con.replace(/( )(?![^<]*>|[^<>]*<)/g,"&nbsp;");

        if (chatType === "chatting") con = `<span class="message-content-speaker">${speaker.alias ?? game.user.name}</span>${con}`;

        if (chatType === "eas") speaker.alias = "긴급 재난 문자";

        const getOrder = () => {
            const order = lastMessage.getFlag("mrkb-chat-enhancements", "order");
            if (order) return order + 1;
            else {
                const arr = [];
                messages.forEach((e) => arr.push(e.flags["mrkb-chat-enhancements"]?.order));
                const orders = arr.filter((e) => !isNaN(e));
                return (orders.length === 0) ? 0 : Math.max(...orders) + 2;
            }
        }

        const messages = game.messages.contents;
        const lastMessage = messages[messages.length - 1];
        const option = {
            type : chatType
        }
        const isFamily = this.isFamily(lastMessage, message, speaker, option);
        option.added = isFamily ?? false;
        option.parent = isFamily ? lastMessage.id : null;
        option.order = lastMessage ? getOrder() : 0;

        message.updateSource({
            style : style,
            speaker : speaker,
            content : con,
            flags : options.isRestoring ? source.flags : {"mrkb-chat-enhancements" : option}
        });
    }
    static isFamily(parent, child, speaker, options) {
        if (!parent) return false;
        const type = parent.getFlag("mrkb-chat-enhancements", "type");
        return (
            parent &&
            speaker.alias === parent.speaker.alias &&
            speaker.actor === parent.speaker.actor &&
            child.author._id === parent.author._id &&
            !options.desc &&
            !options.turner &&
            type !== "description" &&
            type !== "turn" &&
            (type === options.type || (type === "normal" && options.type === "thinking") || (type === "thinking" && options.type === "normal"))
        )
    }
    static createProcesser(message/*, option, id*/) {
    }
    static renderProcesser(message, html) {
        if (Setting.get("use-portrait")) {
            const id = message.speaker.actor;
            const actorImage = getPortrait(id, message?.author?.id);

            const portrait = document.createElement("img");
            portrait.src = actorImage;
            portrait.className = "message-portrait";

            const header = html[0].querySelector(".message-header");
            header.prepend(portrait);
        }

        const date = ChatExporter.realignTime(message.timestamp);
        const time = `${date.ye}.${date.mo}.${date.da} ${date.ho}:${date.mi}:${date.se}`;

        const absTime = document.createElement("time");
        absTime.className = "message-absolute-timestamp";
        absTime.innerHTML = time;

        const timestamp = html[0].querySelector(".message-timestamp");

        const times = document.createElement("div");
        times.className = "message-times";
        times.append(absTime, timestamp);

        const metadata = html[0].querySelector(".message-metadata");
        metadata.prepend(times);

        const sender = html[0].querySelector("h4.message-sender");
        sender.innerHTML += `<span class="message-user">${message.author?.name ?? "Deleted User"}</span>`;

        if (message.isAuthor || game.user.isGM) {
            const a = document.createElement("a");
            a.classList.add("message-edit");
            a.onclick = () => ChatEditor._edit(message.id);
            a.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
            times.after(a);
        }
        ChatHandler.checkChatFlag(message, html);
    }
    static expandPortrait(event) {
        const bck = document.createElement("img");
        bck.id = "portrait-view-bck";
        bck.src = event.target.src;
        const img = document.createElement("img");
        img.id = "portrait-view-img";
        img.src = event.target.src;

        const div = document.createElement("div");
        div.id = "portrait-view";
        div.append(bck, img);

        const body = document.querySelector("#mrkb-float");
        body.append(div);
    }
    static cleanupExpanded() {
        const imgs = document.querySelectorAll("#portrait-view");
        imgs.forEach((e) => e.remove());
    }
    static checkChatFlag(message, html) {
        html[0].dataset.order = message.getFlag("mrkb-chat-enhancements", "order");
        html[0].classList.add(message.getFlag("mrkb-chat-enhancements", "type") ?? "");

        if (message.getFlag("mrkb-chat-enhancements", "added")) html[0].classList.add("added");
        if (message.isAuthor) html[0].classList.add("self");
    }
    static fixChatFlag() {
        if (game.messages.size === 0) return;
        const msgs = game.messages.contents;
        msgs.forEach((e) => {
            const parent = msgs.find(a => a.id === e.getFlag("mrkb-chat-enhancements", "parent"));
            const prev = msgs[msgs.indexOf(e) - 1];
            const option = {
                type : e.getFlag("mrkb-chat-enhancements", "type"),
                desc : e.getFlag("mrkb-chat-enhancements", "type") === "desc",
                kakao : e.getFlag("mrkb-chat-enhancements", "type") === "kakao",
                truner : e.getFlag("mrkb-chat-enhancements", "type") === "turner"
            }
            if (msgs.indexOf(e) === 0) {
                if (game.user.isGM) {
                    e.setFlag("mrkb-chat-enhancements", "added", false);
                    e.setFlag("mrkb-chat-enhancements", "parent", null);
                }
                document.querySelector(`[data-message-id="${e.id}"]`)?.classList?.remove("added");
            }else if (!parent && !this.isFamily(prev, e, e.speaker, option)) {
                if (game.user.isGM) {
                    e.setFlag("mrkb-chat-enhancements", "added", false);
                    e.setFlag("mrkb-chat-enhancements", "parent", null);
                }
                document.querySelector(`[data-message-id="${e.id}"]`)?.classList?.remove("added");
            } else {
                if (game.user.isGM) {
                    e.setFlag("mrkb-chat-enhancements", "added", true);
                    e.setFlag("mrkb-chat-enhancements", "parent", prev.id);
                }
                document.querySelector(`[data-message-id="${e.id}"]`)?.classList?.add("added");
            }
        });
    }
}