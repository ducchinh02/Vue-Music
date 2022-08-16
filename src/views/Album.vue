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
      <header-actions routerName="Dashboard" @addToWishList="addToWishList" />
    </header-main>
    <!-- list songs -->
    <div
      class="list-music container mx-auto py-10 px-5 md:flex-1 md:h-full md:overflow-auto"
    >
      <div class="flex flex-col gap-7">
        <router-link
          :to="{
            name: 'PlaySong',
            params: { name: song.id },
            query: { type: song.genre },
          }"
          v-for="song in listMusic"
          :key="song.id"
        >
          <music-item
            :thumb="song.thumb"
            :name="song.name"
            :artist="song.artist"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMain from "../components/HeaderMain.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import {
  MUSIC_GENRE,
  WISH_LIST,
  LIST_MUSIC,
  shuffled,
} from "@/constants/index";
import HeaderActions from "../components/HeaderActions.vue";
import MusicItem from "../components/MusicItem.vue";
export default {
  components: { HeaderMain, HeaderActions, MusicItem },
  setup() {
    // define variables
    const route = useRoute();
    const album = computed(() =>
      MUSIC_GENRE.find((album) => album.genre === route.params.name)
    );

    // add to wishlist
    const addToWishList = (data) => {
      if (data.status) {
        WISH_LIST.album.push(album);
      } else {
        const index = WISH_LIST.album.indexOf(album);
        if (index !== -1) {
          WISH_LIST.album.splice(index, 1);
        }
      }
      console.log(WISH_LIST.album);
    };
    // get list music
    const listMusic = computed(() =>
      shuffled(
        shuffled(LIST_MUSIC.filter((song) => song.genre === route.params.name))
      )
    );
    // play song event (temp)
    // const playSong = (song) => {
    //   audio.value.src = song.src;
    //   audio.value.play();
    //   audio.value.loop = true;
    // };
    // remove audio src when leave page
    // onUnmounted(() => {
    //   audio.value.src = "";
    // });
    return { album, addToWishList, listMusic };
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
