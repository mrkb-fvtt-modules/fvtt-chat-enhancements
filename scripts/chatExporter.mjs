export default class ChatExporter {
    static exporter() {
        const orderHeader = document.createElement("h4");
        orderHeader.innerHTML = "오더 플래그";

        const orderMsg = document.createElement("p");
        orderMsg.innerHTML = "메시지 생성 시에 메시지 목록에 따라 상대적으로 설정되는 Order Flag에 따라 메시지를 정렬하여 내보냅니다. 경우에 따라 사용이 불가능할 수 있습니다.";

        const order = document.createElement("div");
        order.id = "export-as-order";
        order.append(orderHeader, orderMsg);

        const timestampHeader = document.createElement("h4");
        timestampHeader.innerHTML = "타임 스탬프";

        const timestampMsg = document.createElement("p");
        timestampMsg.innerHTML = "메시지 생성 시에 클라이언트 시간에 따라 설정되는 Timestamp에 따라 메시지를 정렬하여 내보냅니다. 개인 컴퓨터의 시간에 오차가 있을 경우 순서가 섞일 수 있습니다.";

        const timestamp = document.createElement("div");
        timestamp.id = "export-as-timestamp";
        timestamp.append(timestampHeader, timestampMsg);

        const types = document.createElement("div");
        types.id = "export-types";
        types.append(order, timestamp);

        const includeCSS = document.createElement("input");
        includeCSS.type = "checkbox";
        includeCSS.name = "css";
        includeCSS.disabled = true;
        includeCSS.id = "include-css";

        const CSSH3 = document.createElement("h3");
        CSSH3.innerHTML = "HTML에 CSS 포함"

        const CSSP = document.createElement("p");
        CSSP.innerHTML = "HTML 파일에 CSS 임포트가 필요할 경우 체크합니다. 단일 파일로도 양식이 유지되도록 합니다. 별도의 환경에서 CSS를 사용하고 있다면 체크하지 마십시오."

        const CSSDiv = document.createElement("div");
        CSSDiv.append(CSSH3, CSSP);

        const CSS = document.createElement("label");
        CSS.id = "export-css";
        CSS.htmlFor = "include-css";
        CSS.append(includeCSS, CSSDiv);

        const urlHeader = document.createElement("h3");
        urlHeader.innerHTML = "URL :"

        const urlInput = document.createElement("input");
        urlInput.type = "text";
        urlInput.name = "url";
        urlInput.placeholder = window.location.origin;
        urlInput.id = "export-url-input";

        const urlBody = document.createElement("div");
        urlBody.append(urlHeader, urlInput);

        const urlP = document.createElement("p");
        urlP.innerHTML = "포트레이트 이미지를 별도의 서버에서 호스팅해야 하는 경우(예 : FVTT 서버를 개인 컴퓨터에서 호스트 중임), 해당 이미지서버의 주소를 입력합니다. api url에 쿼리스트링을 입력했을 때 아래의 \"이미지 다운로드\" 버튼으로 내려받은 이미지가 표시되도록 하십시오."

        const url = document.createElement("div");
        url.id = "export-url";
        url.append(urlBody, urlP);

        const exporterForm = document.createElement("form");
        exporterForm.id = "chat-exporter";
        exporterForm.append(types, CSS, url);

        const exporter = new Dialog({
            title: `Chat Exporter`,
            content: exporterForm.outerHTML,
            buttons: {
                order: {
                    label: "오더 플래그",
                    callback: () => {
                        const css = document.querySelector("#chat-exporter")?.css?.checked;
                        const url = document.querySelector("#chat-exporter")?.url?.value;
                        this.exportHTML(true, css, url)
                    }
                },
                timestamp: {
                    label: "타임 스탬프",
                    callback: () => {
                        const css = document.querySelector("#chat-exporter")?.css?.checked;
                        const url = document.querySelector("#chat-exporter")?.url?.value;
                        this.exportHTML(false, css, url)
                    }
                },
                /*
                image: {
                    label: "이미지 다운로드",
                    callback: () => {
                    }
                },

                 */
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
    static createHTML(callback, isOrdered, css, url) {
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
        const imgIsPortrait = (img) => {
            return img.classList.contains("message-portrait")
                || img.classList.contains("chat-portrait")
                || img.parentElement.classList.contains("avatar")
                || img.classList.contains("chat-portrait-message-portrait-" + game.system.id);
        }
        messages.forEach((e) => {
            e.exporting = true;
            e.getHTML().then((i) => {
                if (!i[0]) {
                    index++;
                    return;
                }
                const image = i[0]?.querySelectorAll("img");
                image.forEach((img) => {
                    if (url && imgIsPortrait(img)) {
                        const src = img.src.split("/");
                        const image = src[src.length - 1];
                        const address = (url[url.length - 1] === "/") ? url.substring(0, url.length - 1) : url;
                        img.setAttribute("src", address + "/" + image);
                    }
                    else img.setAttribute("src", img.src);
                });

                list.push(i[0]);

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

    static exportHTML(order = false, css = false, url = "") {
        try {
            ChatExporter.createHTML((list, firstMessageDate, css) => {
                const body = document.createElement("ol");
                body.id = "chat-log";
                body.append(...list);

                if (css) {
                    const link = document.createElement("link");
                    link.type = "text/css";
                    link.rel = "stylesheet";
                    link.href="https://file.mrkb.kr/logs/00_logs.css";

                    const font = document.createElement("link");
                    font.type = "text/css";
                    font.rel = "stylesheet";
                    font.href="https://mrkb.kr/font";

                    body.prepend(font, link);
                }

                const plainText = body.outerHTML.replace(/\n/g, "").replace(/\s\s/g, "");

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
            }, order, css, url);
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