<template>
  <div class="home flex flex-col gap-6">
    <div class="container mx-auto px-9">
      <!-- form search song -->
      <form @submit.prevent="searchMusic" class="relative mt-8">
        <input
          type="text"
          id="search-music"
          class="py-3 pr-11 bg-gray w-full text-base rounded-xl transition-all duration-300"
          placeholder="Search music"
          :class="{
            'pl-4': isSearching,
            'pl-11': !isSearching,
          }"
          v-model="searchValue"
          @input="onSearch"
        />
        <!-- search icon -->
        <label
          :class="{
            '-translate-x-full opacity-0 pointer-events-none': isSearching,
            'translate-x-0 opacity-100 pointer-events-auto': !isSearching,
          }"
          for="search-music"
          class="icon cursor-pointer transition-all duration-300 flex items-center absolute top-1/2 -translate-y-1/2 left-3 text-xl"
        >
          <ion-icon name="search-outline"></ion-icon>
        </label>
        <!-- close search -->
        <div
          class="close-icon flex items-center cursor-pointer transition-all duration-300 absolute top-1/2 -translate-y-1/2 right-3 text-xl"
          :class="{
            'translate-x-full opacity-0 pointer-events-none': !isSearching,
            'translate-x-0 opacity-100 pointer-events-auto': isSearching,
          }"
          @click="endSearch"
        >
          <ion-icon name="close"></ion-icon>
        </div>
      </form>
      <!-- albums -->
      <div class="popular-music" v-if="!isSearching">
        <div class="py-5 font-semibold text-2xl">Popular</div>
        <!-- slide -->
        <div>
          <slider :array="MusicGenre" />
        </div>
      </div>
      <!-- search result -->
      <div v-else class="flex flex-col gap-7 mt-8">
        <div v-if="searchResult && searchResult.length">
          <router-link
            v-for="song in searchResult"
            :to="{
              name: 'PlaySong',
              params: { name: song.id },
              query: { type: song.genre },
            }"
            :key="song.id"
          >
            <music-item :song="song" />
          </router-link>
        </div>
        <p v-else class="font-bold text-base flex items-center">
          <ion-icon name="search"></ion-icon
          ><span class="ms-2">No result found</span>
        </p>
      </div>
      <!-- <div class="break-words">
        {{ listAlbum }}
      </div> -->
    </div>
  </div>
</template>

<script>
import { MUSIC_GENRE, LIST_MUSIC } from "@/constants/index";
import { ref, reactive, computed } from "vue";
import Slider from "@/components/Slider.vue";
import MusicItem from "@/components/MusicItem.vue";
// import { useStore } from "vuex";
export default {
  components: { Slider, MusicItem },
  setup() {
    // define variables
    const searchValue = ref("");
    const isSearching = ref(false);
    const searchMusic = () => {};
    const MusicGenre = reactive(MUSIC_GENRE);
    const listMusic = reactive(LIST_MUSIC);
    // search result
    const searchResult = computed(() =>
      listMusic.filter(
        (song) =>
          song.name
            .toLocaleLowerCase()
            .includes(searchValue.value.toLocaleLowerCase().trim()) ||
          song.artist
            .toLocaleLowerCase()
            .includes(searchValue.value.toLocaleLowerCase().trim())
      )
    );
    // const store = useStore();
    // const listAlbum = computed(() => store.state.songs);
    // on input search event
    const onSearch = () => {
      isSearching.value = true;
      if (searchValue.value === "") {
        isSearching.value = false;
      }
    };
    // close search event
    const endSearch = () => {
      isSearching.value = false;
      searchValue.value = "";
    };
    return {
      searchMusic,
      searchValue,
      MusicGenre,
      isSearching,
      searchResult,
      onSearch,
      endSearch,
    };
  },
};
</script>

<style></style>
