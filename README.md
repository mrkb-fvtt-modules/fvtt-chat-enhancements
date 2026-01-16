# MRKB Foundry VTT Chat Enhancements

---

A small Foundry VTT module that improves chat usability with message editing, actor selection without tokens, chat merging, portrait display options, export features, turn notifications, inline Markdown, actor favorites, and several convenience tools.

Version: 1.2.0
Compatibility: Foundry VTT v13+ (verified: 13.351)

## Overview

This module enhances Foundry VTT's chat in several practical ways for both GMs and players. It focuses on editable messages, flexible actor control (including selecting actors without tokens and pinning favorites), chat log presentation (merging related messages and optional portraits), export tools (HTML/PDF with ordering and CSS options), turn-start notifications, and inline Markdown parsing.

## Key Features

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
  - Export chat logs to HTML or PDF. When exporting to HTML, you can choose to sort by the module's Order Flag (relative order preserved) or by Timestamp (client time). There's also an option to include the CSS imports so the HTML is self-contained.

- Turn notification
  - Send a notification message when a specified actor's turn begins in combat (created by the active GM).

- Inline Markdown
  - Support for images, links, headings, italics, bold, strikethroughs, blockquotes and other standard Markdown expressions in chat messages.

- Chat commands
  - `/description` (or `/desc`) `[content]` — Output a descriptive message.
  - `/as` `[actor name]` `[content]` — Send a message as the specified actor.
  - `/actor` (or `/act`) `[actor name]` — Change the currently selected actor to the specified actor.

## Settings

Configure the module from Foundry's Module Settings (Settings → Manage Modules → MRKB Chat Enhancements). Options include:
- Portrait display on/off
- Export ordering (Order Flag vs Timestamp)
- Include CSS when exporting HTML
- Turn-notice configuration
- Actor favorites list

## Keyboard shortcuts

- Up Arrow in chat input: recall last sent message for quick editing.
- Tab / Shift+Tab: cycle actor favorites.

## Installation

1. In Foundry, open the Add-on Modules UI → Install Module.
2. Use the Manifest URL above or install from the GitHub release ZIP.
3. Enable the module in Manage Modules and open the Chat tab to access features.

---

메시지 편집, 토큰 없이 액터 선택, 채팅 병합, 초상화 표시 옵션, 내보내기 기능, 턴 알림, 인라인 마크다운, 액터 즐겨찾기 등 채팅 사용성을 개선하는 작은 Foundry VTT 모듈입니다.

버전: 1.2.0
호환성: Foundry VTT v13 이상 (검증: 13.351)

## 개요

이 모듈은 GM과 플레이어 모두를 위해 Foundry VTT의 채팅을 실용적으로 향상시킵니다. 보낸 메시지 편집, 토큰 없이 액터 제어(액터 선택 및 즐겨찾기 고정), 채팅 로그 표시(연속 메시지 병합 및 선택적 초상화), 내보내기 도구(HTML/PDF 및 정렬/ CSS 옵션), 턴 시작 알림, 인라인 마크다운 파싱 등에 중점을 둡니다.

## 주요 기능

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
  - 채팅 로그를 HTML 또는 PDF로 내보낼 수 있습니다. HTML 내보내기 시 Order Flag(모듈 설정으로 상대적 순서 보존) 또는 Timestamp(클라이언트 시간)에 따라 정렬할 수 있습니다. 또한 HTML 파일에 CSS 임포트를 포함하여 단일 파일로 만들 수 있는 옵션이 있습니다.

- 턴 알림
  - 전투에서 특정 액터의 턴이 시작될 때(활성 GM이 생성) 알림 메시지를 보냅니다.

- 인라인 마크다운
  - 이미지, 링크, 제목, 기울임/굵게/취소선, 인용구 등 표준 마크다운 표현을 지원합니다.

- 채팅 명령어
  - `/description` (또는 `/desc`) `[내용]` — 설명형 메시지를 출력합니다.
  - `/as` `[액터 이름]` `[내용]` — 지정한 액터로 메시지를 전송합니다.
  - `/actor` (또는 `/act`) `[액터 이름]` — 현재 선택된 액터를 변경합니다.

## 설정

Foundry의 모듈 설정(Settings → Manage Modules → MRKB Chat Enhancements)에서 모듈 옵션을 구성할 수 있습니다. 옵션에는 다음이 포함됩니다:
- 초상화 표시 켜기/끄기
- 내보내기 정렬(오더 플래그 vs 타임스탬프)
- HTML 내 CSS 포함 여부
- 턴 알림 설정
- 액터 즐겨찾기 목록

## 단축키

- 채팅 입력에서 ↑: 마지막 전송 메시지 불러오기(편집)
- Tab / Shift+Tab: 액터 즐겨찾기 순환

## 설치

1. Foundry의 Add-on Modules UI → Install Module을 엽니다.
2. 위 매니페스트 URL을 사용하거나 GitHub ZIP에서 설치합니다.
3. Manage Modules에서 모듈을 활성화하고 채팅 탭을 열어 기능을 사용합니다.

---

メッセージ編集、トークンなしでのアクター選択、チャットのマージ、ポートレート表示オプション、エクスポート機能、ターン通知、インラインMarkdown、アクターフェイバリットなど、チャットの使い勝手を向上させる小さなFoundry VTTモジュールです。

バージョン: 1.2.0
互換性: Foundry VTT v13以上 (検証: 13.351)

## 概要

このモジュールは、GMとプレイヤーの両方のためにFoundry VTTのチャットを実用的に強化します。送信済みメッセージの編集、トークンなしでのアクター制御（アクター選択とお気に入り固定）、チャットログ表示（連続メッセージのマージとオプションのポートレート）、エクスポートツール（HTML/PDF、並び順とCSSオプション）、ターン開始通知、インラインMarkdownパースなどに焦点を当てています。

## 主な機能

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
  - チャットログをHTMLまたはPDFでエクスポートできます。HTMLエクスポート時にモジュールのOrder Flag（相対順序保持）またはTimestamp（クライアント時刻）でソートすることができます。また、HTMLファイルにCSSインポートを含めて単一ファイルにするオプションがあります。

- ターン通知
  - 戦闘で特定のアクターのターンが開始されたとき（アクティブGMによって作成）に通知メッセージを送信します。

- インラインMarkdown
  - 画像、リンク、見出し、斜体、太字、取り消し線、ブロック引用など、標準的なMarkdown表現をサポートします。

- チャットコマンド
  - `/description` (または `/desc`) `[内容]` — 説明用メッセージを出力します。
  - `/as` `[アクター名]` `[内容]` — 指定したアクターとしてメッセージを送信します。
  - `/actor` (または `/act`) `[アクター名]` — 現在選択されているアクターを変更します。

## 設定

Foundryのモジュール設定(Settings → Manage Modules → MRKB Chat Enhancements)からモジュールを設定できます。オプションには次のものが含まれます:
- ポートレート表示のオン/オフ
- エクスポートの並び順（オーダーフラグ vs タイムスタンプ）
- HTMLエクスポートでのCSS含有
- ターン通知設定
- アクターフェイバリットリスト

## キーボードショートカット

- チャット入力で↑キー: 最後に送信したメッセージを呼び出して編集
- Tab / Shift+Tab: アクターフェイバリットを循環

## インストール

1. FoundryのAdd-on Modules UI → Install Moduleを開きます。
2. 上のマニフェストURLを使用するか、GitHubのZIPからインストールします。
3. Manage Modulesでモジュールを有効化し、チャットタブを開いて機能を利用します。
