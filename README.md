# MRKB Foundry VTT Chat Enhancements

## 포함된 기능 Included features 含まれる機能

이하의 기능을 포함합니다.

It includes the following features.

以下の機能が含まれています。

### 채팅 합치기 Chat merge チャットマージ

동일한 액터로 채팅한 메시지를 병합하여 표시합니다.

You can merge messages chatted by the same actor and display them.

同一のアクターでチャットしたメッセージをマージして表示します。

### 채팅 수정 Chat edit チャット編集

발송한 채팅 메시지를 수정할 수 있습니다. 채팅 폼에서 위 방향키(↑)를 눌러 마지막으로 보낸 메시지를 불러오거나, 로그에서 메시지 우측 상단의 연필 아이콘을 클릭하여 수정할 수 있습니다. 컨텍스트 메뉴에서도 수정 기능을 사용할 수 있습니다.

You can edit sent chat messages. You can press the up arrow key (↑) in the chat form to retrieve the last sent message, or click the pencil icon at the top right of the message in the log to edit it. You can also use the edit function in the context menu.

送信したチャットメッセージを編集できます。チャットフォームで上矢印キー(↑)を押して最後に送信したメッセージを呼び出すか、ログ内のメッセージ右上の鉛筆アイコンをクリックして編集できます。コンテキストメニューでも編集機能を使用できます。

### 액터 셀렉터 Actor selector アクターセレクター

토큰 없이 액터를 선택하고 그 액터로 메시지를 보낼 수 있게 합니다. 액터 즐겨찾키 바의 맨 왼쪽 아이콘을 클릭하여 액터 선택 창을 열 수 있습니다.

You can select an actor without a token and send messages as that actor. You can open the actor selection window by clicking the leftmost icon on the actor favorites bar.

トークンなしでアクターを選択し、そのアクターとしてメッセージを送信できるようにします。アクターフェイバリットバーの一番左のアイコンをクリックしてアクター選択ウィンドウを開くことができます。

### 액터 즐겨찾기 Actor favorites アクターフェイバリット

채팅창 하단에 자주 찾는 액터를 모아두어, tab키 또는 마우스로 전환할 수 있습니다. 액터 선택 창이나 즐겨찾기에서 우클릭을 하여 추가/제거할 수 있습니다. shift + tab으로 역순 전환도 가능합니다.

You can gather frequently used actors at the bottom of the chat window and switch between them using the tab key or mouse. You can add/remove them by right-clicking in the actor selection window or favorites. You can also switch in reverse order with shift + tab.

チャットウィンドウの下部に頻繁に使用するアクターを集め、tabキーまたはマウスで切り替えることができます。アクター選択ウィンドウやお気に入りで右クリックして追加/削除できます。shift + tabで逆順に切り替えることも可能です。

### 채팅 포트레이트 Chat portrait チャットポートレート

로그상에 포트레이트를 출력합니다. 각 시스템과의 호환을 위해 옵션에서 사용하지 않도록 설정할 수도 있습니다.

You can display portraits in the log. To ensure compatibility with each system, you can also disable it in the options.

ログ上にポートレートを表示します。各システムとの互換性のために、オプションで使用しないように設定することもできます。

### 로그 내보내기 Chat log export チャットログエクスポート

HTML 또는 PDF 형식으로 채팅을 내보냅니다. HTML로 내보낼 경우 스타일시트의 포함 여부를 선택할 수 있습니다.

You can export chats in HTML or PDF format. When exporting to HTML, you can choose whether to include the stylesheet.

チャットをHTMLまたはPDF形式でエクスポートできます。HTMLにエクスポートする場合、スタイルシートの含有を選択できます。

### 턴 알림 Turn notification ターン通知

특정 액터의 턴이 시작될 때 알림을 보냅니다.

Sends a notification when a specific actor's turn begins.

特定のアクターのターンが始まるときに通知を送信します。

### 인라인 마크다운 Inline markdown インラインマークダウン

이미지, 링크, 헤딩, 기울임, 굵기, 취소선, 인용구 등의 표현을 지원합니다. 문법은 표준 마크다운 문법과 동일합니다.

Supports expressions such as images, links, headings, italics, bold, strikethroughs, and blockquotes. The syntax is the same as standard markdown syntax.

画像、リンク、見出し、斜体、太字、取り消し線、引用などの表現をサポートします。文法は標準のマークダウン文法と同じです。

### 채팅 명령어 Chat commands チャットコマンド

이하의 명령어를 지원합니다.

- /description(/desc) [내용] : 서술용 메시지를 출력합니다.
- /as [액터 이름] [내용] : 지정한 액터로 메시지를 보냅니다.
- /actor(/act) [액터 이름] : 현재 선택된 액터를 지정한 액터로 변경합니다.

The following commands are supported.

- /description(/desc) [content] : Outputs a descriptive message.
- /as [actor name] [content] : Sends a message as the specified actor.
- /actor(/act) [actor name] : Changes the currently selected actor to the specified actor.

以下のコマンドをサポートしています。

- /description(/desc) [内容] : 描写用メッセージを出力します。
- /as [アクター名] [内容] : 指定したアクターとしてメッセージを送信します。
- /actor(/act) [アクター名] : 現在選択されているアクターを指定したアクターに変更します。

### 다국어 지원 Multilingual support 多言語サポート

한국어, 영어, 일본어를 지원합니다.

Supports Korean, English, and Japanese.

韓国語、英語、日本語をサポートしています。

## 지원 예정 Upcoming features 今後の機能

아래는 추가가 예정된 기능들입니다.

The following features are scheduled to be added.

以下は追加予定の機能です。

### 채팅 모드 Chat mode チャットモード

독백, 통화, 메신저, 댓글, 툴팁, 긴급재난문자, 판정요구, 서술 모드 지원.

Supports monologue, call, messenger, comment, tooltip, emergency disaster text, judgment request, and narration modes.

独白、通話、メッセンジャー、コメント、ツールチップ、緊急災害文字、判定要求、叙述モードをサポートします。

### 메모 Memo メモ

특정 채팅 메시지를 지정하여 메모로 추가.

Select a specific chat message and add it as a memo.

特定のチャットメッセージを指定してメモとして追加します。

### 타임 요청 Pause request タイムリクエスト

발언권, 또는 별도의 이유로 시간을 받아야 할 때 신호 전송.

You can send a signal when you need to take time for speaking rights or other reasons.

発言権、または別の理由で時間を取る必要があるときに信号を送信できます。

## 알려진 문제 Known issues 既知の問題

로그가 길어질 경우 메시지 삭제 과정에서 과거 메시지 역류가 발생할 수 있습니다.

When the log gets long, past message backflow may occur during the message deletion process.

ログが長くなると、メッセージ削除プロセス中に過去のメッセージの逆流が発生する可能性があります。

## 에셋 출처 Asset sources アセットソース



## 라이센스 License ライセンス

The MIT License (MIT)

Copyright (c) 2025 MRKB

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.