const defaultState = {
    id: -1,
    songName: '',
    albumString: '',
    authorString: '',
    playtime: '',
}

const songReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'update':{
            const songEdit = action.song
            console.log('In redux: ',songEdit)
            return {
                id: songEdit.id,
                songName: songEdit.songName,
                albumString: songEdit.albumString,
                authorString: songEdit.authorString,
                playtime: songEdit.playtime,
            }
        }
        default:
            return state
    }
}

export default songReducer