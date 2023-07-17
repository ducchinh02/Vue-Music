<template>
  <div
    class="list-music container mx-auto py-10 px-5 md:flex-1 md:h-full md:overflow-auto"
  >
    <div class="flex flex-col gap-7">
      <router-link
        v-for="song in listMusic"
        :key="song.id"
        :to="{
          name: 'PlaySong',
          params: { name: song.id },
          query: { type: song.genre },
        }"
      >
        <music-item
          :isActive="isEnableActive && currentSong?.id === song.id"
          :song="song"
        />
      </router-link>
    </div>
  </div>
</template>
<script>
import MusicItem from "@/components/MusicItem.vue";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    listMusic: {
      type: Array,
      required: true,
    },
    isEnableActive: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  components: { MusicItem },
  setup() {
    const store = useStore();
    const currentSong = computed(() => store.state.nowPlaying);

    return {
      currentSong,
    };
  },
};
</script>
<style lang=""></style>
