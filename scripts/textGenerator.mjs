import Setting from "./setting.mjs";

export default class TextGenerator {
    static _create() {
        const text = document.createElement("div");
        text.id = "mrkb-texts";
        text.className = InterfaceToggle.get("text");
        text.dataset.widget = "text";
        text.append(...this._data.map((e) => this._createHTML(e)));

        return text;
    }
    static _data = [
        {
            id : "ruby",
            title : "루비",
            icon : "overline",
            tooltip: "'상단/하단' 형식",
            callback: (data) => {
                const top = data.split("/")[0];
                const bot = data.split("/")[1];
                return `<ruby>${bot}<rt>${top}</rt></ruby>`;
            }
        }, {
            id : "blur",
            title : "블러",
            icon : "cloud-fog",
            callback: (data) => {
                return `<span style="filter: blur(3px)">${data}</span>`;
            }
        }, {
            id : "conflict",
            title : "겹침",
            icon : "send-backward",
            tooltip: "여러 번에 걸쳐 입력",
            callback: (data) => {
                return `<span class="confilct-text">${data}</span>`;
            }
        }, {
            id : "glitch",
            title : "글리치",
            icon : "monitor-waveform",
            callback: (data) => {
                return `<span class="glitch-text">${data}</span>`;
            }
        }, {
            id : "strange",
            title : "기괴",
            icon : "circle-exclamation",
            tooltip: "한번에 입력",
            callback: (data) => {
                return [...data].map((e) => {
                    const scale = 70 + Math.floor(Math.random() * 60);
                    const rotate = Math.floor(Math.random() * 360);

                    return `<span style="display: inline-block; transform: scale(${scale}%) rotate(${rotate}deg);">${e}</span>`;
                }).join("");
            }
        }
    ]
    static _createHTML(e = {}) {
        const icon = document.createElement("a");
        icon.className = "text-icon";
        icon.innerHTML = `<i class="fa-solid fa-${e.icon}"></i><span>${e.title}</span>`;
        icon.onclick = () => {
            const order = this._data.findIndex((d) => d.id === e.id) + 1;
            const next = this._data[order] ?? this._data[0];
            Setting.set("text", next.id);

            document.querySelectorAll(".text-div").forEach((a) => a.classList.remove("active"));
            document.querySelector(`#text-${next.id}`).classList.add("active");
        }

        const text = document.createElement("input");
        text.id = `${e.id}-text`;
        text.type = "text";
        text.placeholder = e.tooltip ? `${e.title} (${e.tooltip})` : e.title;
        text.addEventListener("keydown", (ev) => {
            if (ev.key !== "Enter") return;

            ev.preventDefault();

            const chat = document.querySelector("#chat-message");
            chat.value = chat.value + e.callback(text.value);
            chat.focus();
            text.value = "";
        }, false)

        const body = document.createElement("div");
        body.className = "text-body";
        body.append(text);

        const button = this.button(e.callback, text);

        const div = document.createElement("div");
        div.id = `text-${e.id}`;
        div.className = "text-div";
        if (Setting.get("text") === e.id) div.classList.add("active");
        div.append(icon, body, button);

        return div;
    }
    static button(callback, text) {
        const button = document.createElement("button");
        button.type = "button";
        button.onclick = () => {
            const chat = document.querySelector("#chat-message");
            chat.value = chat.value + callback(text.value);
            chat.focus();
            text.value = "";
        }
        button.innerHTML = "<i class=\"fa-solid fa-down-to-bracket\"></i>";

        return button;
    }
}