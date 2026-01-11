# MRKB Foundry VTT Chat Enhancements

---

A small Foundry VTT module that improves chat usability with message editing, actor selection without tokens, chat merging, portrait display options, export features, turn notifications, inline Markdown, and several convenience tools.

Version: 1.1.4
Compatibility: Foundry VTT v13+ (verified: 13.351)
Repository: https://github.com/mrkb-fvtt-modules/fvtt-chat-enhancements
Manifest URL: https://raw.githubusercontent.com/mrkb-fvtt-modules/fvtt-chat-enhancements/refs/heads/master/module.json
Download (zip): https://github.com/mrkb-fvtt-modules/fvtt-chat-enhancements/archive/master.zip

## Features

- Chat edit
  - Edit sent chat messages. Press the Up Arrow in the chat input to recall the last sent message, or click the pencil icon on a chat message to edit it. Editing is also available from the message context menu.

- Chat merge
  - Merge consecutive messages from the same actor for cleaner logs.

- Actor selector (no token required)
  - Select an actor without a token and send messages as that actor. Open the actor selector from the leftmost icon in the actor favorites bar.

- Actor favorites
  - Pin frequently used actors to the bottom of the chat window and switch between them using Tab / Shift+Tab or the mouse. Right-click in the selector to add/remove favorites.

- Chat portrait
  - Optionally display actor portraits in the chat log. Portrait display can be disabled for compatibility with different systems.

- Chat export (HTML / PDF)
  - Export chat logs to HTML or PDF. When exporting to HTML, you can include the CSS inline so the output is self-contained.

- Turn notification
  - Send a notification when a specified actor's turn begins in combat.

- Inline Markdown
  - Support for images, links, headings, italics, bold, strikethroughs, blockquotes and other standard Markdown expressions in chat messages.

- Chat commands
  - /description (or /desc) [content] — Output a descriptive message.
  - /as [actor name] [content] — Send a message as the specified actor.
  - /actor (or /act) [actor name] — Change the currently selected actor to the specified actor.

## Settings

Configure the module from Foundry's Module Settings (Settings → Manage Modules → MRKB Chat Enhancements). Options include portrait display, export ordering (timestamp vs order flag), inclusion of CSS in HTML export, and turn-notice configuration.

## Keyboard shortcuts

- Up Arrow in chat input: recall last sent message for quick editing.
- Tab / Shift+Tab: cycle actor favorites.

## Installation

1. In Foundry, open the Add-on Modules UI → Install Module.
2. Use the Manifest URL above or install from the GitHub release ZIP.
3. Enable the module in Manage Modules and open the Chat tab to access features.

## Roadmap (planned)

- Chat modes (monologue, call, messenger, comment, tooltip, emergency text, judgment request, narration)

## Known issues

- When the chat log becomes very long, message deletion can trigger visual backflow of past messages in the log. This is a rendering edge case observed with long histories.

---

메시지 편집, 토큰 없이 액터 선택, 채팅 병합, 초상화 표시 옵션, 내보내기 기능, 턴 알림, 인라인 마크다운 등 채팅 사용성을 개선하는 작은 Foundry VTT 모듈입니다.

버전: 1.1.4
호환성: Foundry VTT v13 이상 (검증: 13.351)
레포지토리: https://github.com/mrkb-fvtt-modules/fvtt-chat-enhancements
매니페스트 URL: https://raw.githubusercontent.com/mrkb-fvtt-modules/fvtt-chat-enhancements/refs/heads/master/module.json
다운로드 (zip): https://github.com/mrkb-fvtt-modules/fvtt-chat-enhancements/archive/master.zip

## 기능

- 채팅 편집
  - 이미 보낸 채팅 메시지를 편집할 수 있습니다. 채팅 입력에서 ↑(위 화살표)를 눌러 마지막으로 전송한 메시지를 불러오거나, 로그의 연필 아이콘을 클릭하여 메시지를 편집할 수 있습니다. 컨텍스트 메뉴에서도 편집을 사용할 수 있습니다.

- 채팅 병합
  - 같은 액터가 연속으로 보낸 메시지를 병합하여 로그를 깔끔하게 정리합니다.

- 액터 선택기 (토큰 불필요)
  - 토큰 없이 액터를 선택하고 해당 액터로 메시지를 전송할 수 있습니다. 액터 즐겨찾기 바의 가장 왼쪽 아이콘을 클릭해 액터 선택 창을 엽니다.

- 액터 즐겨찾기
  - 자주 사용하는 액터를 채팅 창 하단에 고정하고 Tab / Shift+Tab 또는 마우스로 빠르게 전환할 수 있습니다. 선택기에서 우클릭으로 추가/제거합니다.

- 채팅 초상화
  - 채팅 로그에 초상화를 표시합니다. 시스템 간 호환성을 위해 옵션에서 비활성화할 수 있습니다.

- 채팅 내보내기 (HTML / PDF)
  - 채팅 로그를 HTML 또는 PDF로 내보낼 수 있습니다. HTML 내보내기 시 CSS를 포함(inline)하여 단일 파일로 만들 수 있습니다.

- 턴 알림
  - 전투에서 특정 액터의 턴이 시작될 때 알림을 보냅니다.

- 인라인 마크다운
  - 이미지, 링크, 제목, 기울임/굵게/취소선, 인용구 등 표준 마크다운 표현을 지원합니다.

- 채팅 명령어
  - /description (또는 /desc) [내용] — 설명형 메시지를 출력합니다.
  - /as [액터 이름] [내용] — 지정한 액터로 메시지를 전송합니다.
  - /actor (또는 /act) [액터 이름] — 현재 선택된 액터를 변경합니다.

## 설정

Foundry의 모듈 설정(Settings → Manage Modules → MRKB Chat Enhancements)에서 모듈 옵션을 구성할 수 있습니다. 초상화 표시, 내보내기 정렬(타임스탬프 vs 순서 플래그), HTML 내 CSS 포함, 턴 알림 설정 등이 포함됩니다.

## 단축키

- 채팅 입력에서 ↑: 마지막 전송 메시지 불러오기(편집)
- Tab / Shift+Tab: 액터 즐겨찾기 순환

## 설치

1. Foundry의 Add-on Modules UI → Install Module을 엽니다.
2. 위 매니페스트 URL을 사용하거나 GitHub ZIP을 설치합니다.
3. Manage Modules에서 모듈을 활성화한 뒤 채팅 탭을 열어 기능을 사용합니다.

## 로드맵 (계획)

- 채팅 모드(독백, 통화, 메신저, 코멘트, 툴팁, 긴급 문자, 판정 요청, 내레이션)

## 알려진 문제

- 채팅 로그가 매우 길어지면 메시지 삭제 시 과거 메시지가 역류하는 시각적 현상이 발생할 수 있습니다. 긴 로그에서 발생하는 렌더링 엣지케이스입니다.

---

メッセージ編集、トークンなしでのアクター選択、チャットのマージ、ポートレート表示オプション、エクスポート機能、ターン通知、インラインMarkdownなど、チャットの使い勝手を向上させる小さなFoundry VTTモジュールです。

バージョン: 1.1.4
互換性: Foundry VTT v13以上 (検証: 13.351)
リポジトリ: https://github.com/mrkb-fvtt-modules/fvtt-chat-enhancements
マニフェストURL: https://raw.githubusercontent.com/mrkb-fvtt-modules/fvtt-chat-enhancements/refs/heads/master/module.json
ダウンロード (zip): https://github.com/mrkb-fvtt-modules/fvtt-chat-enhancements/archive/master.zip

## 機能

- チャット編集
  - 送信済みのチャットメッセージを編集できます。チャット入力で↑キーを押すと最後に送信したメッセージを呼び出せます。ログのメッセージ右上にある鉛筆アイコンをクリックして編集することもできます。コンテキストメニューからの編集も可能です。

- チャットマージ
  - 同じアクターが連続で送信したメッセージをマージしてログを整理します。

- アクターセレクター（トークン不要）
  - トークンなしでアクターを選択し、そのアクターとしてメッセージを送信できます。アクターフェイバリットバーの一番左のアイコンをクリックしてアクター選択ウィンドウを開きます。

- アクターフェイバリット
  - よく使うアクターをチャットウィンドウ下部にピンでき、Tab / Shift+Tab またはマウスで切り替えられます。セレクターで右クリックして追加/削除します。

- チャットポートレート
  - チャットログにポートレートを表示します。システム間の互換性のため、オプションで無効化できます。

- チャットエクスポート（HTML / PDF）
  - チャットログをHTMLまたはPDFでエクスポートできます。HTMLエクスポート時にCSSをインラインで含め、自己完結型のファイルにすることが可能です。

- ターン通知
  - 戦闘で特定のアクターのターンが開始されたときに通知を送信します。

- インラインMarkdown
  - 画像、リンク、見出し、斜体、太字、取り消し線、ブロック引用など、標準的なMarkdown表現をサポートします。

- チャットコマンド
  - /description (または /desc) [内容] — 説明用メッセージを出力します。
  - /as [アクター名] [内容] — 指定したアクターとしてメッセージを送信します。
  - /actor (または /act) [アクター名] — 現在選択されているアクターを変更します。

## 設定

Foundryのモジュール設定(Settings → Manage Modules → MRKB Chat Enhancements)からモジュールを設定できます。ポートレート表示、エクスポート順序（タイムスタンプ vs Order Flag）、HTML内でのCSSの含有、ターン通知設定などを変更できます。

## キーボードショートカット

- チャット入力で↑キー: 最後に送信したメッセージを呼び出して編集
- Tab / Shift+Tab: アクターフェイバリットを循環

## インストール

1. FoundryのAdd-on Modules UI → Install Moduleを開きます。
2. 上のマニフェストURLを使用するか、GitHubのZIPからインストールします。
3. Manage Modulesでモジュールを有効化し、チャットタブを開いて機能を利用します。

## ロードマップ（予定）

- チャットモード（独白、通話、メッセンジャー、コメント、ツールチップ、緊急テキスト、判定要求、ナレーション）

## 既知の問題

- チャットログが非常に長くなると、メッセージ削除時に過去のメッセージが逆流するような視覚的な現象が発生することがあります。長い履歴で観察されるレンダリングのエッジケースです。
