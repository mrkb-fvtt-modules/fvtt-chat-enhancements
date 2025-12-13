const getPortrait = (id, userId) => {
    const avatar = game.users.get(userId)?.avatar ?? alterImage;
    return game.actors.get(id)?.img ?? avatar;
}

export default getPortrait;