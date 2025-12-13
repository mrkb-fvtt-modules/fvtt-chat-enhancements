export default class TurnNotice {
    static notice(data) {
        console.log("TurnNotice.notice called");
        const tokenId = data.current.tokenId;
        if (!tokenId) return;

        const token = game.canvas.tokens.get(tokenId);
        const turnTitle = `${token?.actor?.name}의 턴`;

        if (game.users.activeGM?._id === game.user._id) {
            ChatMessage.create({
                type : 0,
                speaker : {
                    actor : token?.actor?.id,
                    alias : turnTitle
                }
            }, {mrkbturn : true});
        }
    }
}