<template>
  <div
    class="flex items-center gap-4 cursor-pointer rounded-xl transition-all duration-300 hover:bg-gray p-3"
  >
    <!-- thumb -->
    <div class="thumb w-16 h-16 rounded-lg overflow-hidden">
      <img :src="thumb" class="h-full" alt="Song" />
    </div>
    <!-- song info -->
    <div class="song-info flex-1">
      <div class="song-name text-base font-semibold">{{ name }}</div>
      <div class="song-artist text-sm text-gray2">{{ artist }}</div>
    </div>
    <!-- more actions -->
    <div class="more-action flex items-center text-2xl">
      <ion-icon name="ellipsis-horizontal"></ion-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thumb: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    artist: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
