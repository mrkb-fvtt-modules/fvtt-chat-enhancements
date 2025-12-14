import {MODULE_PATH} from "./constants.mjs";

export default class ChatExporter {
    static exporter() {
        const orderHeader = document.createElement("h4");
        orderHeader.innerHTML = game.i18n.localize("MRKB.OrderFlag");

        const orderMsg = document.createElement("p");
        orderMsg.innerHTML = game.i18n.localize("MRKB.OrderFlagTooltip");

        const order = document.createElement("div");
        order.id = "export-as-order";
        order.append(orderHeader, orderMsg);

        const timestampHeader = document.createElement("h4");
        timestampHeader.innerHTML = game.i18n.localize("MRKB.Timestamp");

        const timestampMsg = document.createElement("p");
        timestampMsg.innerHTML = game.i18n.localize("MRKB.TimestampTooltip");

        const timestamp = document.createElement("div");
        timestamp.id = "export-as-timestamp";
        timestamp.append(timestampHeader, timestampMsg);

        const types = document.createElement("div");
        types.id = "export-types";
        types.append(order, timestamp);

        const includeCSS = document.createElement("input");
        includeCSS.type = "checkbox";
        includeCSS.name = "css";
        includeCSS.id = "include-css";

        const CSSH3 = document.createElement("h3");
        CSSH3.innerHTML = game.i18n.localize("MRKB.IncludeCSS");

        const CSSP = document.createElement("p");
        CSSP.innerHTML = game.i18n.localize("MRKB.IncludeCSSTooltip");

        const CSSDiv = document.createElement("div");
        CSSDiv.append(CSSH3, CSSP);

        const CSS = document.createElement("label");
        CSS.id = "export-css";
        CSS.htmlFor = "include-css";
        CSS.append(includeCSS, CSSDiv);

        const exporterForm = document.createElement("form");
        exporterForm.id = "chat-exporter";
        exporterForm.append(types, CSS);

        const exporter = new Dialog({
            title: `Chat Exporter`,
            content: exporterForm.outerHTML,
            buttons: {
                order: {
                    label: game.i18n.localize("MRKB.OrderFlag"),
                    callback: () => {
                        const css = document.querySelector("#chat-exporter")?.css?.checked;
                        this.exportHTML(true, css)
                    }
                },
                timestamp: {
                    label: game.i18n.localize("MRKB.Timestamp"),
                    callback: () => {
                        const css = document.querySelector("#chat-exporter")?.css?.checked;
                        this.exportHTML(false, css)
                    }
                },
                cancel: {
                    label: "취소"
                }
            },
            default: "cancel",
            close: () => {}
        }, {width: 400});

        exporter.render(true);
    }
    static realignTime(timestamp) {
        const date = new Date(timestamp);
        return {
            ye : String(date.getFullYear()).slice(2, 4),
            mo : String(date.getMonth() + 1).padStart(2, '0'),
            da : String(date.getDate()).padStart(2, '0'),
            ho : String(date.getHours()).padStart(2, '0'),
            mi : String(date.getMinutes()).padStart(2, '0'),
            se : String(date.getSeconds()).padStart(2, '0')
        }
    }
    static createHTML(callback, isOrdered, css) {
        const messagesTemp = game.messages.contents;
        const option = isOrdered ? (a, b) => {
            let prev = a.flags["mrkb-chat-enhancements"]?.order;
            let next = b.flags["mrkb-chat-enhancements"]?.order;
            if (String(prev) && String(next)) return (prev - next);
            else return (a.timestamp - b.timestamp);
        } : (a, b) => {
            let prev = a.timestamp;
            let next = b.timestamp;
            return (prev - next);
        }
        const messages = messagesTemp.sort(option);
        const firstMessageDate = messagesTemp[0].timestamp;
        const list = [];
        let index = 0;

        messages.forEach((e) => {
            e.exporting = true;
            e.renderHTML().then((i) => {
                if (!i) {
                    index++;
                    return;
                }
                const image = i?.querySelectorAll("img");
                image.forEach((img) => img.setAttribute("src", img.src));

                list.push(i);

                if (index === messages.length - 1) {
                    if (isOrdered) list.sort((a, b) => {
                        let prev = a.dataset.order;
                        let next = b.dataset.order;
                        if (String(prev) && String(next)) return (prev - next);
                        else return (a.timestamp - b.timestamp);
                    });
                    callback(list, firstMessageDate, css);
                }else {
                    index++;
                }
            })
        });
    }

    static exportHTML(order = false, css = false) {
        try {
            ChatExporter.createHTML((list, firstMessageDate, css) => {
                const ol = document.createElement("ol");
                ol.id = "chat-log";
                ol.className = "chat-log themed " + (document.querySelector("#interface").classList.contains("theme-dark") ? "theme-dark" : "theme-light");
                ol.append(...list);
                const body = document.createElement("body");
                body.append(ol);

                const head = document.createElement("head");
                const meta = document.createElement("meta");
                meta.setAttribute("charset", "UTF-8");
                const title = document.createElement("title");
                title.innerHTML = `${game.world.id} 로그`;
                head.append(meta, title);

                if (css) {
                    const origin = window.location.origin;

                    const gameStyleLinks = document.createElement("link");
                    gameStyleLinks.rel = "stylesheet";
                    gameStyleLinks.href = `${origin}/css/foundry2.css`;

                    const systemStyleLinks = game.system.styles.map(e => {
                        const link = document.createElement("link");
                        link.rel = "stylesheet";
                        link.href = `${origin}/${e.src}`;
                        return link;
                    });

                    const moduleStyleLink = document.createElement("link");
                    moduleStyleLink.rel = "stylesheet";
                    moduleStyleLink.href = `${origin}/${MODULE_PATH}/styles/chat.css`;

                    const styles = document.createElement("style");
                    styles.innerHTML = `
                        body { padding: 0; }
                        .chat-log { padding: 0; margin: 0; }
                    `;
                    
                    head.append(gameStyleLinks, ...systemStyleLinks, moduleStyleLink, styles);
                }

                const html = document.createElement("html");
                html.append(head, body);

                const plainText = html.outerHTML.replace(/\n/g, "").replace(/\s\s/g, "");

                const date = ChatExporter.realignTime(firstMessageDate);
                const time = `${date.ye}${date.mo}${date.da}-${date.ho}${date.mi}${date.se}`;

                const file = new File([plainText], `${game.world.id}-log-${time}.html`, { type: 'text/html' });
                const fileUrl = window.URL.createObjectURL(file);

                const a = document.createElement('a');
                a.download = `${game.world.id}-log-${time}.html`;
                a.type = "text/html";
                a.href = fileUrl;
                a.target = "_blank";
                a.hidden = true;

                a.click();
                window.URL.revokeObjectURL(fileUrl);
            }, order, css);
        } catch (err) {
            //debug("Exporting Log", err, true);
        }
    }

    static exportPDF() {
        try {
            ChatExporter.createHTML((list, firstMessageDate, _) => {
                const isDark = document.querySelector("#interface").classList.contains("theme-dark");

                const body = document.createElement("ol");
                body.className = "chat-log chat-export-pdf themed " + (isDark ? "theme-dark" : "theme-light");
                body.append(...list);

                document.body.appendChild(body);
                window.print();
                document.body.removeChild(body);
            });
        } catch (err) {
            //debug("Exporting PDF Log", err, true);
        }
    }
}