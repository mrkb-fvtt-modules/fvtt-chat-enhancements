import Setting from "./setting.mjs";
import ChatExporter from "./chatExporter.mjs";
import ChatEditor from "./chatEditor.mjs";
import getPortrait from "./getPortrait.mjs";
import {parse} from "./markdownParser.mjs";
import ActorControl from "./actorControl.mjs";

export default class ChatHandler {
    static parseSlashCommand(content) {
        const raw = content.trim().slice(1).trim();
        console.log(content, raw);
        if (!raw) return { command: "", args: [], rest: "" };
        const parts = raw.split(/\s+/);
        const command = parts.shift();
        const args = parts;
        const rest = args.join(" ");
        return { command, args, rest };
    }
    static chatProcessor(chatLog, message, sender) {
        const reject = (msg = "권한이 없습니다.") => {
            ui.notifications.error(msg);
        }
        const getTargetActor = (args) => {
            let targetActor, content;
            
            args.reduce((acc, cur, idx) => {
                acc += " " + cur;
                const actor = game.actors.getName(acc.trim());
                if (actor) {
                    targetActor = actor;
                    content = args.slice(idx + 1).join(" ");
                }
                return acc;
            }, "");

            return { targetActor, content };
        }
        if (message.trim().startsWith("/")) {
            const { command, args, rest} = this.parseSlashCommand(message);
            if (command === "desc" || command === "description") {
                ChatMessage.create({
                    type : 0,
                    speaker : sender.speaker,
                    content : rest
                }, {
                    mrkbdesc : true
                });
                return false;
            } else if (command === "turn") {
                if (!game.user.isGM) {
                    reject();
                    return false;
                }
                ChatMessage.create({
                    type : 0,
                    speaker : sender.speaker,
                    content : rest
                }, {
                    mrkbturn : true
                });
                return false;
            } else if (command === "as") {
                const {targetActor, content} = getTargetActor(args);
                if (!targetActor) {
                    ui.notifications.error("해당 이름의 캐릭터를 찾을 수 없습니다.");
                    return false;
                }
                ChatMessage.create({
                    type : 0,
                    speaker : {
                        actor : targetActor.id,
                        alias : targetActor.name
                    },
                    content : content
                });
                return false;
            } else if (command === "act" || command === "actor") {
                const targetActor = getTargetActor(args).targetActor;
                if (!targetActor) {
                    ui.notifications.error("해당 이름의 캐릭터를 찾을 수 없습니다.");
                    return false;
                }
                if (!targetActor.hasPlayerOwner && !game.user.isGM) {
                    ui.notifications.error("해당 캐릭터는 플레이어가 소유하고 있지 않습니다.");
                    return false;
                }
                ActorControl._select(targetActor.id);
                return false;
            }
        }
    }
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

        let con = parse(message.content);

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
            flags : {"mrkb-chat-enhancements" : option}
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
        const header = html.querySelector(".message-header");

        if (Setting.get("use-portrait")) {
            const id = message.speaker.actor;
            const alias = message.alias;
            const actorImage = getPortrait(id, message?.author?.id);

            const portrait = document.createElement("img");
            portrait.src = actorImage;
            portrait.className = "message-portrait";
            portrait.dataset.tooltip = alias;
            portrait.dataset.tooltipDirection = "LEFT";
            portrait.dataset.tooltipHtml = `
                <div class="portrait-tooltip">
                    <img class="portrait-image" src="${actorImage}" alt="${alias}">
                    <h4 class="portrait-name">${alias}</h4>
                </div>
            `;

            header.prepend(portrait);
        }

        const date = ChatExporter.realignTime(message.timestamp);
        const time = `${date.ye}.${date.mo}.${date.da} ${date.ho}:${date.mi}:${date.se}`;

        const absTime = document.createElement("time");
        absTime.className = "message-absolute-timestamp";
        absTime.innerHTML = time;

        const timestamp = header.querySelector(".message-timestamp");

        const times = document.createElement("div");
        times.className = "message-times";
        times.append(absTime, timestamp);

        const metadata = header.querySelector(".message-metadata");
        metadata.prepend(times);

        const sender = header.querySelector("h4");
        sender.innerHTML += `<span class="message-user">${message.author?.name ?? "Deleted User"}</span>`;

        if (message.isAuthor || game.user.isGM) {
            const a = document.createElement("a");
            a.classList.add("message-edit");
            a.onclick = () => ChatEditor._edit(message.id);
            a.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
            times.after(a);
        }
        if (message.isAuthor && !game.user.isGM) {
            const a = document.createElement("a");
            a.classList.add("message-delete");
            a.onclick = () => message.delete();
            a.innerHTML = `<i class="fa-solid fa-trash"></i>`;
            metadata.append(a);
        }
        ChatHandler.checkChatFlag(message, html);
    }
    static checkChatFlag(message, html) {
        html.dataset.order = message.getFlag("mrkb-chat-enhancements", "order");
        html.classList.add(message.getFlag("mrkb-chat-enhancements", "type") ?? "normal");

        if (message.getFlag("mrkb-chat-enhancements", "added")) html.classList.add("added");
        if (message.isAuthor) html.classList.add("self");
    }
    static fixChatFlag() {
        if (game.messages.size === 0) return;
        const msgs = game.messages.contents;
        const getFlag = (msg, flag) => {
            return msg.getFlag("mrkb-chat-enhancements", flag);
        }
        msgs.forEach((e) => {
            const type = getFlag(e, "type");
            const isAdded = getFlag(e, "added");
            const hasParent = !!getFlag(e, "parent");
            const parent = hasParent ? msgs.find(a => a.id === getFlag(e, "parent")) : null;
            const prev = msgs[msgs.indexOf(e) - 1];
            const option = {
                type : type,
                desc : type === "desc",
                kakao : type === "kakao",
                truner : type === "turner"
            }
            if (msgs.indexOf(e) === 0) {
                if (game.user.isGM) {
                    if (isAdded) e.setFlag("mrkb-chat-enhancements", "added", false);
                    if (hasParent) e.setFlag("mrkb-chat-enhancements", "parent", null);
                }
                document.querySelector(`[data-message-id="${e.id}"]`)?.classList?.remove("added");
            }else if (!parent && !this.isFamily(prev, e, e.speaker, option)) {
                if (game.user.isGM) {
                    if (isAdded) e.setFlag("mrkb-chat-enhancements", "added", false);
                    if (hasParent) e.setFlag("mrkb-chat-enhancements", "parent", null);
                }
                document.querySelector(`[data-message-id="${e.id}"]`)?.classList?.remove("added");
            } else {
                if (game.user.isGM) {
                    if (!isAdded) e.setFlag("mrkb-chat-enhancements", "added", true);
                    if (getFlag(e, parent) !== prev.id) e.setFlag("mrkb-chat-enhancements", "parent", prev.id);
                }
                document.querySelector(`[data-message-id="${e.id}"]`)?.classList?.add("added");
            }
        });
    }
}