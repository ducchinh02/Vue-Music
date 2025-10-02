<template>
  <div class="main md:flex md:h-screen">
    <!-- header -->
    <header-main
      class="md:w-3/5"
      :bgColor="'bg-' + album.route.color"
      :src="album.route.coverImage"
      :alt="album.title"
      :heading="album.title"
      :subtitle="album.desc"
    >
      <header-actions
        :isInWishList="isInWishList"
        routerName="Dashboard"
        @addToWishList="addToWishList"
      />
    </header-main>
    <list-songs :listMusic="listMusic" />
  </div>
</template>

<script>
import HeaderMain from "../components/HeaderMain.vue";
import { useRoute } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";
import { MUSIC_GENRE, LIST_MUSIC, shuffled } from "@/constants/index";
import HeaderActions from "../components/HeaderActions.vue";
import ListSongs from "@/components/ListSongs.vue";
import { useStore } from "vuex";
export default {
  components: { HeaderMain, HeaderActions, ListSongs },
  setup() {
    // define variables
    const route = useRoute();
    const album = MUSIC_GENRE.find((al) => al.genre === route.params.name);
    // use store
    const store = useStore();
    const isInWishList = ref(false);
    // check wishlist
    onBeforeMount(() => {
      const check = store.state.album.find(
        (albumW) => albumW.genre === album.genre
      );
      isInWishList.value = check;
    });
    // add to wishlist
    const addToWishList = () => {
      const action = isInWishList.value
        ? "removeFromWishlist"
        : "addToWishlist";

      store.dispatch(action, { album });
      isInWishList.value = !isInWishList.value;
    };
    // get list music
    const listMusic = computed(() =>
      shuffled(
        shuffled(LIST_MUSIC.filter((song) => song.genre === route.params.name))
      )
    );
    return { album, addToWishList, listMusic, isInWishList };
  },
};
</script>

<style lang="scss" scoped>
.list-music {
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
