<template>
  <div class="song-volume">
    <div class="flex items-center">
      <div
        class="volume-icon flex items-center cursor-pointer"
        @click="toggleMuteVolume"
      >
        <ion-icon name="volume-medium-outline" v-if="songVolume > 0"></ion-icon>
        <ion-icon name="volume-mute-outline" v-else></ion-icon>
      </div>
      <div class="relative progress-bar flex-1 ms-3">
        <input
          type="range"
          step="1"
          min="0"
          max="100"
          class="w-full h-2 block rounded cursor-pointer"
          @input="moveProgressBar"
          @change="seekVolumeBar"
          v-model="songVolume"
        />
        <div
          class="slide absolute pointer-events-none top-0 rounded left-0 h-full bg-black"
          ref="slideRef"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeMount,
  /*defineProps*/ defineEmits,
} from "vue";

const emit = defineEmits(["setSongVolume"]);

const slideRef = ref(null);
const songVolume = ref(50);
const tempVolume = ref(50);

const setSongVolume = () => {
  emit("setSongVolume", { volume: songVolume.value / 100 });
};

const updateProcessStyle = () => {
  slideRef.value.style = `width: ${songVolume.value}%`;
};

const moveProgressBar = () => {
  tempVolume.value = songVolume.value;
  updateProcessStyle();
  setSongVolume();
};

const seekVolumeBar = () => {
  updateProcessStyle();
  setSongVolume();
};

onBeforeMount(() => {
  setSongVolume();
  tempVolume.value = songVolume.value;
});
onMounted(() => {
  updateProcessStyle();
});

const toggleMuteVolume = () => {
  songVolume.value
    ? (songVolume.value = 0)
    : (songVolume.value = tempVolume.value);
  setSongVolume();
  updateProcessStyle();
};
</script>

<style lang=""></style>
