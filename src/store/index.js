import { createStore } from "vuex";
import vuexPersistedState from "vuex-plugin-persistedstate";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      album: [],
      songs: [],
      nowPlaying: null,
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
    setCurrentSongPlaying(state, song) {
      state.nowPlaying = song;
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
  plugins: [vuexPersistedState()],
});

export default store;
