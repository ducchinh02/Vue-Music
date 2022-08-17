import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      album: [],
      songs: [],
    };
  },
  mutations: {
    setAlbumWishList(state, album) {
      state.album.push(album);
    },
    removeFromAlbumWishlist(state, album) {
      let index;
      const checkIndex = state.album.indexOf(album);
      if (checkIndex !== -1) {
        index = checkIndex;
        state.album.splice(index, 1);
      }
    },
    setSongWishList(state, album) {
      state.songs.push(album);
    },
    removeFromSongWishlist(state, song) {
      let index;
      const checkIndex = state.songs.indexOf(song);
      if (checkIndex !== -1) {
        index = checkIndex;
        state.songs.splice(index, 1);
      }
    },
  },
  actions: {
    addToWishlist({ commit }, { album }) {
      commit("setAlbumWishList", album);
    },
    removeFromWishlist({ commit }, { album }) {
      commit("removeFromAlbumWishlist", album);
    },
    addSongToWishlist({ commit }, { song }) {
      commit("setSongWishList", song);
    },
    removeSongFromWishlist({ commit }, { song }) {
      commit("removeFromSongWishlist", song);
    },
  },
});

export default store;
