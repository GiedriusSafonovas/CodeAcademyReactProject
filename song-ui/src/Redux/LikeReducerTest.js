const defaultState = {
    likedSongs: null
}

const songReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'setLikedSongs': {
            console.log('liked songs ', action.likedSongs)
            return {
                likedSongs: action.likedSongs
            }
        }
        default:
            return state
    }
}

export default songReducer