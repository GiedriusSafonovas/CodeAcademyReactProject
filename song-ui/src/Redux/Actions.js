export const updateSong = (song) => (
    {
        type: 'update',
        song
    }
)

export const setUserData = (user) => (
    {
        type: 'login',
        user
    }
)

export const setLikedSongsinReducer = (likedSongs) => (
    {
        type: 'setLikedSongs',
        likedSongs
    }
)

export const likeSong = (song) => (
    {
        type: 'likeSong',
        song
    }
)