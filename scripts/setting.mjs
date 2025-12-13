export default class Setting {
	static get(key) {
		return game.settings.get("mrkb-chat-enhancements", key);
	}
	static set(type, url) {
	    game.settings.set("mrkb-chat-enhancements", type, url);
	}
	static _onUpdate(target) {
		const key = target.key.split(".")[1];
		switch (key) {
			//case "overlay" : Gallery.remoteOverlay(); break;
		}
	}
	static register() {
		game.settings.register("mrkb-chat-enhancements", "font-size", {
			name: "채팅 폰트 사이즈",
			hint: "채팅 메시지에 사용되는 폰트 사이즈를 지정합니다. 과도하게 올리거나 내릴 경우 스타일이 붕괴할 수 있습니다. 기본 사이즈는 14입니다.",
			scope: "client",
			config: true,
			type: Number,
			range: {
				min: 8,
				max: 20
			},
			default: 14,
			onChange: (value) => document.querySelector(".chat-log").style.setProperty("--font-size", value + "px")
		});
		game.settings.register("mrkb-chat-enhancements", "use-portrait", {
			name: "포트레이트 사용",
			hint: "자체 포트레이트를 사용합니다. D&D5e 시스템이나 다른 모듈과의 호환성을 위해 사용하지 않도록 설정할 수 있습니다.",
			scope: "world",
			config: true,
			type: Boolean,
			default: true,
			onChange: () => window.location.reload()
		});
		game.settings.register("mrkb-chat-enhancements", "actor-favorites", {
			name: "액터 즐겨찾기",
			scope: "client",
			config: false,
			type: Array,
			default: []
		});
		game.settings.register("mrkb-chat-enhancements", "talk-mode", {
			name: "대화 모드",
			scope: "client",
			config: false,
			type: String,
			default: "normal"
		});
		
		/*UTILITY*/
		
		game.settings.register("mrkb-chat-enhancements", "quickchat", {
			name: "빠른 대화 사용",
			hint: "활성화하면 토큰 선택 즉시 커서가 대화창으로 이동하고, 자동으로 큰따옴표가 입력됩니다.",
			scope: "client",
			config: true,
			type: Boolean,
			default: false
		});
		game.settings.register("mrkb-chat-enhancements", "selection", {
			name: "선택 범위 지정",
			hint: "토큰을 변경했을 때 커서의 상태를 설정합니다. 활성화하면 따옴표를 제외한 모든 문장을 선택하여, 즉시 수정 가능한 상태가 됩니다. 비활성화하면 커서가 따옴표를 제외한 문장 끝으로 가, 계속 작성 가능한 상태가 됩니다.",
			scope: "client",
			config: true,
			type: Boolean,
			default: false
		});
		game.settings.register("mrkb-chat-enhancements", "roll20chat", {
			name: "Roll20형 챗로그",
			hint: "이런 게 그리운 사람을 위하여",
			scope: "client",
			config: true,
			type: Boolean,
			default: false,
			requiresReload: true
		});
		game.settings.register("mrkb-chat-enhancements", "sidebar-width", {
			name: "사이드바 너비",
			scope: "client",
			config: false,
			type: Number,
			default: 300
		});

		/*UI Toggle*/

		game.settings.register("mrkb-chat-enhancements", "ui-actor", {
			name: "액터 셀렉터 토글",
			hint: "",
			scope: "client",
			config: false,
			type: Boolean,
			default: false
		});
		game.settings.register("mrkb-chat-enhancements", "ui-favorites", {
			name: "액터 즐겨찾기 토글",
			hint: "",
			scope: "client",
			config: false,
			type: Boolean,
			default: true
		});
		game.settings.register("mrkb-chat-enhancements", "ui-msgMode", {
			name: "메시지 모드 토글",
			hint: "",
			scope: "client",
			config: false,
			type: Boolean,
			default: false
		});
	}
}