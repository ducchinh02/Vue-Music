<template>
  <nav
    class="w-full h-full overflow-auto bg-white absolute top-0 left-0 px-8 z-10 text-xl"
  >
    <!-- close icon & logo -->
    <div class="flex items-center justify-between pt-10">
      <router-link
        :to="{ name: 'Home', params: {} }"
        class="logo flex items-center gap-1"
      >
        <image-logo
          class="-scale-x-100"
          :src="require('@/assets/images/Logo.svg')"
          alt="Logo"
        />
        <div class="logo-name text-blue text-xl font-semibold">Musical</div>
      </router-link>
      <div
        class="close-icon cursor-pointer flex items-center text-4xl transition-all duration-300"
        @click="$emit('closeMenu')"
      >
        <ion-icon name="close-outline"></ion-icon>
      </div>
    </div>
    <!-- menu -->
    <div class="text-primary pt-10 pb-5 font-bold text-2xl">Wishlist</div>
    <ul class="menu flex flex-col gap-3">
      <li @click="showAlbumMenu">
        <div
          class="flex items-center justify-between transition-all duration-300 cursor-pointer hover:text-primary"
        >
          <span class="font-medium">Albums</span>
          <div
            class="icon flex items-center text-2xl transition-all duration-300"
            :class="{
              'rotate-90': isShowAlbum,
              'rotate-0': !isShowAlbum,
            }"
          >
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
        </div>
        <!-- sub menu -->
        <ul
          class="sub-menu pl-4 flex flex-col gap-3 transition-all duration-300"
          :class="{
            'max-h-24 h-max mt-3': isShowAlbum,
            'max-h-0 overflow-hidden': !isShowAlbum,
          }"
          v-if="menuAlbum"
        >
          <li
            v-for="album in menuAlbum"
            :key="album.genre"
            class="transition-colors duration-200 flex items-center gap-2 hover:text-primary text-lg"
          >
            <div class="icon text-2xl flex items-center">
              <ion-icon name="albums-outline"></ion-icon>
            </div>
            <router-link :to="{ name: 'Album', params: { name: album.genre } }">
              {{ album.title }}
            </router-link>
          </li>
        </ul>
      </li>
      <li @click="showSongsMenu">
        <div
          class="flex items-center justify-between transition-all duration-300 cursor-pointer hover:text-primary"
        >
          <span class="font-medium">Songs</span>
          <div
            class="icon flex items-center text-2xl transition-all duration-300"
            :class="{
              'rotate-90': isShowSongs,
              'rotate-0': !isShowSongs,
            }"
          >
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
        </div>
        <!-- sub menu -->
        <ul
          class="sub-menu songs-wishlist pl-4 flex flex-col gap-3 transition-all duration-300"
          :class="{
            'max-h-60 overflow-auto mt-3': isShowSongs,
            'max-h-0 overflow-hidden': !isShowSongs,
          }"
          v-if="menuSongs"
        >
          <li
            v-for="song in menuSongs"
            :key="song.id"
            class="transition-colors flex items-center gap-2 duration-200 hover:text-primary text-lg"
          >
            <div class="icon flex items-center text-2xl">
              <ion-icon name="musical-notes-outline"></ion-icon>
            </div>
            <router-link
              :to="{
                name: 'PlaySong',
                params: { name: song.id },
                query: { type: song.genre },
              }"
            >
              {{ song.name }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import ImageLogo from "@/components/ImageLogo.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  components: { ImageLogo },
  setup() {
    const store = useStore();
    const menuAlbum = computed(() => store.state.album);
    const menuSongs = computed(() => store.state.songs);
    const isShowAlbum = ref(false);
    const isShowSongs = ref(false);

    const showAlbumMenu = () => {
      isShowSongs.value = false;
      isShowAlbum.value = !isShowAlbum.value;
    };

    const showSongsMenu = () => {
      isShowAlbum.value = false;
      isShowSongs.value = !isShowSongs.value;
    };

    return {
      menuAlbum,
      isShowAlbum,
      isShowSongs,
      showAlbumMenu,
      showSongsMenu,
      menuSongs,
    };
  },
};
</script>

<style lang="scss" scoped>
nav {
  &::-webkit-scrollbar {
    width: 0;
  }
  .close-icon:hover {
    transform: rotate(360deg);
    @apply text-primary;
  }
}
.songs-wishlist {
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    @apply bg-gray3;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    @apply bg-gray2;
    border-radius: 8px;
  }
}
</style>
