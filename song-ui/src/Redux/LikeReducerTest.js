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
        case 'likeSong': {
            console.log('song to be liked ', action.song)
            return {
                likedSongs: [...state.likedSongs, action.song]
            }
        }
        default:
            return state
    }
}

export default songReducer