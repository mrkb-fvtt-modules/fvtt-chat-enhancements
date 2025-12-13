import Setting from "./setting.mjs";
import InterfaceToggle from "./interfaceToggle.mjs";
import {ASSETS_PATH} from "./constants.mjs";

export default class ActorControl {
    static initialize() {
        const favoriteBar = this._createFavoriteBar();
        const selector = this._createSelector();
        const actorControl = document.createElement("div");
        actorControl.id = "actor-control-container";
        actorControl.append(favoriteBar, selector);

        const jumpToBottom = document.querySelector(".jump-to-bottom");
        jumpToBottom.after(actorControl);
    }
    static _createSelector() {
        const title = document.createElement("a");
        title.id = "actor-selector-title";
        title.innerHTML = "Actor Selector<i class=\"fa-solid fa-arrows-rotate\"></i>";
        title.onclick = () => ActorControl._refresh();

        const body = this._createSelectorBody();

        const tooltip = document.createElement("p");
        tooltip.id = "actor-selector-tooltip";
        tooltip.innerHTML = "<i class=\"fa-solid fa-circle-info\"></i>"
        tooltip.dataset.tooltip = "[좌클릭] : 액터 변경<br/>[우클릭] : 즐겨찾기 추가 / 삭제<br/>[Ctrl+좌클릭] : 시트 열기";

        const div = document.createElement("div");
        div.id = "actor-control";
        div.className = InterfaceToggle.get("actor");
        div.dataset.widget = "actor";
        div.append(title, body, tooltip);

        return div;
    }
    static _createSelectorBody() {
        const body = document.createElement("div");
        body.id = "actor-selector-body";

        const folderList = this._collectCharacters();
        folderList.forEach((e) => body.append(this._getList(e)));

        return body;
    }
    static _createFavoriteBar() {
        const favoriteBar = document.createElement("div");
        favoriteBar.id = "actor-favorites";
        favoriteBar.dataset.widget = "favorites";

        const openSelector = document.createElement("a");
        openSelector.id = "open-actor-selector";
        openSelector.className = "actor-icon icon fa-solid fa-folder";
        if (InterfaceToggle.get("actor")) openSelector.classList.add("active");
        openSelector.onclick = () => InterfaceToggle.set("actor");
        openSelector.dataset.tooltip = "액터 선택기 열기";
        openSelector.dataset.widget = "actor";

        favoriteBar.append(openSelector, this._createFavoritesHTML());

        return favoriteBar;
    }
    static _createFavoritesHTML() {
        const img = document.createElement("img");
        img.src = game.user.avatar;

        const reset = document.createElement("a");
        reset.id = "actor-reset"
        reset.className = "actor-icon";
        if (game.user.character === null) reset.classList.add("active");
        reset.onclick = () => this._reset();
        reset.dataset.tooltip = "액터 초기화";
        reset.append(img);

        const colScroll = (e, target) => {
            e.preventDefault();
            target.scrollBy({top : 0, left : e.deltaY, behavior : "smooth"});
        }

        const favorites = document.createElement("div");
        favorites.id = "favorites";
        favorites.onwheel = (e) => colScroll(e, favorites);
        const favor = this._extractFavorites();
        favorites.append(reset, ...favor.map((e) => this._getToken(e)));

        return favorites;
    }
    static _setSelector() {
        const body = document.querySelector("#actor-selector-body");
        const scrollTop = Number(body?.scrollTop ?? 0);
        const data = this._createSelectorBody();
        const children = Array.from(data.children);
        const originChildren = Array.from(body.children);
        children.forEach((e, i) => {
            const origin = originChildren.find(a => a.querySelector("header").innerHTML === e.querySelector("header").innerHTML);
            if (origin?.classList?.contains("active")) e.classList.add("active");
        });
        body.replaceChildren(...children);
        body.scrollTop = scrollTop;
    }
    static _setFavorite() {
        const favor = this._createFavoritesHTML();
        const favorite = document.querySelector("#favorites");
        favorite.replaceChildren(...favor.children);
    }
    static _collectCharacters() {
        const actors = game.actors.filter(e => e.folder === null && e.permission >= 2);
        const folders = game.folders.filter(e => e.type === "Actor");
        folders.push({id: "unclassified", name: game.i18n.localize("MRKB.Unclassified"), contents: actors});

        const folderList = [];

        folders.forEach((f) => {
            const content = [];
            f.contents.filter(e => e.permission >= 2).forEach((c) => {
                content.push({id: c.id, name: c.name, img: c.img});
            });
            if (content.length === 0) return;
            folderList.push({id: f.id, name: f.name, content: content});
        });

        folderList.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
        });

        return folderList;
    }
    static _extractFavorites() {
        const favorites = Setting.get("actor-favorites");
        const actors = game.actors.filter(e => favorites.includes(e.id));
        const actorList = [];
        actors.forEach((a) => {
            actorList.push({id: a.id, name: a.name, img: a.img});
        });

        actorList.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
        });

        return actorList;
    }
    static _getList(e) {
        const header = document.createElement("header");
        header.className = "actor-header";
        header.innerHTML = e.name;

        const body = document.createElement("div");
        body.className = "actor-grid";

        e.content.forEach((i) => body.appendChild(this._getToken(i)));
        
        const div = document.createElement("div");
        div.className = "actor-folder tab";
        div.append(header, body);

        header.onclick = () => {
            div.classList.toggle("active");
        }

        return div;
    }
    static _getToken(i) {
        const favoriteList = this._extractFavorites();
        const isFavorite = !(favoriteList.find(e => e.id === i.id) === undefined);

        let a = document.createElement("a");
        a.className = "actor-icon";
        if (i.id === game.user.character?.id) a.classList.add("active");
        a.onclick = (e) => {
            if (e.ctrlKey) {
                game.actors.get(i.id).sheet.render(true);
            } else {
                this._select(i.id);
            }
        };
        a.oncontextmenu = (e) => this._controlFavorite(i.id);
        a.dataset.tooltip = i.name;

        let input = document.createElement("input");
        input.id = i.id;
        input.type = "checkbox";
        input.disabled = true;
        input.checked = isFavorite;

        let label = document.createElement("label");
        label.htmlFor = i.id;
        label.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;

        let img = document.createElement("img");
        img.src = i.img;

        let h4 = document.createElement("h4");
        h4.innerHTML = i.name;

        a.append(input, label, img, h4);

        return a;
    }
    static _refresh() {
        this._setSelector();
        this._setFavorite();
        const reset = document.querySelector("#actor-reset");
        if (game.user.character === null) reset.classList.add("active");
        else reset.classList.remove("active");
    }
    static _select(id) {
        game.user.update({ character : id }).then(() => {
            canvas.tokens.releaseAll();
            this._refresh();
        });
    }
    static _controlFavorite(id) {
        const fav = Setting.get("actor-favorites");
        let newFav;
        if (fav.includes(id)) {
            newFav = fav.filter(e => e !== id);
        }else {
            newFav = fav;
            newFav.push(id);
        }

        Setting.set("actor-favorites", newFav);
        ActorControl._refresh();
    }
    static _reset() {
        game.user.update({"character": null}).then(() => {
            canvas.tokens.releaseAll();
            this._refresh();
        });
    }
}