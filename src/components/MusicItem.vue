<template>
  <div
    ref="songRefElement"
    :class="{
      'bg-primary  hover:bg-primary ': isActive && song.genre === 'chill',
      'bg-yellow  hover:bg-yellow ': isActive && song.genre === 'classic',
    }"
    class="flex items-center gap-4 cursor-pointer rounded-xl transition-all duration-300 hover:bg-gray p-3"
  >
    <!-- thumb -->
    <div class="thumb">
      <img
        :src="song.thumb"
        class="w-16 h-16 rounded-lg overflow-hidden"
        :alt="`${song.name} - ${song.artist}`"
        :class="{ 'border-white border-2': isActive }"
      />
    </div>
    <!-- song info -->
    <div class="song-info flex-1">
      <div class="song-name text-base font-semibold">{{ song.name }}</div>
      <div
        class="song-artist text-sm"
        :class="isActive ? 'text-black' : 'text-gray2'"
      >
        {{ song.artist }}
      </div>
    </div>
    <!-- more actions -->
    <!-- <div class="more-action flex items-center text-2xl">
      <ion-icon name="ellipsis-horizontal"></ion-icon>
    </div> -->
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
export default {
  props: {
    song: {
      type: Object,
      required: true,
      default: () => {},
    },
    isActive: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  setup(props) {
    const songRefElement = ref(null);
    const scrollElIntoView = () => {
      songRefElement.value.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    };
    watch(
      () => props.isActive,
      (oldState, newState) => {
        if (songRefElement.value && newState) {
          scrollElIntoView();
        }
      }
    );
    onMounted(() => {
      if (props.isActive) {
        scrollElIntoView();
      }
    });

    return { songRefElement };
  },
};
</script>

<style lang="scss" scoped></style>
