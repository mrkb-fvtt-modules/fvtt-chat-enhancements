import ChatExporter from "./chatExporter.mjs";
import ChatHandler from "./chatHandler.mjs";

export default class ControlButtons {
    static initialize() {
        const fixChatFlagButton = this._createButton(
            "fix-chat-flag",
            "wrench",
            game.i18n.localize("MRKB.FixChatFlag"),
            this.fixChatFlag
        );
        const exportToHTMLButton = this._createButton(
            "export-to-html",
            "file-arrow-down",
            game.i18n.localize("MRKB.ExportToHTML"),
            this.exportToHTML
        );
        const exportToPDFButton = this._createButton(
            "export-to-pdf",
            "file-pdf",
            game.i18n.localize("MRKB.ExportToPDF"),
            this.exportToPDF
        );

        const chatControls = document.querySelector("#chat-controls");
        const controlButtons = chatControls.querySelector(".control-buttons");

        if (controlButtons) {
            controlButtons.prepend(fixChatFlagButton, exportToHTMLButton, exportToPDFButton);
        } else {
            const buttonsDiv = document.createElement("div");
            buttonsDiv.className = "control-buttons";
            buttonsDiv.append(exportToHTMLButton, exportToPDFButton);
            chatControls.appendChild(buttonsDiv);
        }
    }

    static _createButton(id, icon, tooltip, callback) {
        const className = "ui-control icon fa-solid fa-" + icon;
        const button = document.createElement("button");
        button.id = id;
        button.type = "button";
        button.className = className;
        button.dataset.tooltip = tooltip;
        button.onclick = callback;

        return button;
    }

    static openTextGenerator() {

    }

    static fixChatFlag() {
        ChatHandler.fixChatFlag(true);
    }

    static exportToHTML() {
        ChatExporter.exporter();
    }

    static exportToPDF() {
        ChatExporter.exportPDF();
    }
}