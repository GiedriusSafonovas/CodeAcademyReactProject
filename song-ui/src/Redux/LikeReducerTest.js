const defaultState = {
    likedSongs: null
}

const songReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'setLikedSongs': {
            return {
                likedSongs: action.likedSongs
            }
        }
        case 'likeSong': {
            return {
                likedSongs: [...state.likedSongs, action.song]
            }
        }
        case 'unLikeSong': {
            return {
                likedSongs: state.likedSongs.filter((song)=> song.id !== action.song.id)
            }
        }
        default:
            return state
    }
}

export default songReducer