<template>
  <div
    class="music-player h-screen pt-8 flex flex-col relative"
    :class="{
      'bg-primary': song.genre === 'chill',
      'bg-yellow': song.genre === 'classic',
    }"
  >
    <!-- header actions -->
    <header-actions
      @addToWishList="addToWishList"
      routerName="Album"
      :routerParams="{ name: song.genre }"
      :isInWishList="isInWishList"
    >
      <div class="flex-1 text-center text-sm md:text-base px-4">
        Now Playing

        <div class="font-semibold mt-1">
          <ion-icon
            name="musical-note"
            class="inline-flex music-icon items-center mr-1"
          ></ion-icon>
          {{ song.name }}
          <ion-icon
            name="musical-note"
            class="inline-flex music-icon items-center ml-1"
          ></ion-icon>
        </div>
      </div>
    </header-actions>
    <!-- main -->
    <div
      class="music-container overflow-auto pb-20 flex-1 mt-8 rounded-t-3xl bg-white"
    >
      <div
        class="container px-8 mx-auto pt-12 md:flex md:items-center md:justify-around"
      >
        <!-- cd thumb -->
        <div class="px-16 md:px-0 mx-auto md:mx-0 md:w-96">
          <div
            class="cd-thumb w-full rounded-full relative"
            style="padding-top: 100%"
            :style="{
              background: `url(${song.thumb}) center / cover no-repeat`,
            }"
          >
            <div
              class="border-8 absolute inset-0 rounded-full"
              :class="{
                'border-primary': song.genre === 'chill',
                'border-yellow': song.genre === 'classic',
              }"
            ></div>
          </div>
        </div>
        <!-- song actions -->
        <div class="music-actions md:w-2/5">
          <div class="song-info text-center mt-6">
            <div class="song-name font-semibold text-2xl">{{ song.name }}</div>
            <div class="song-artist text-base text-text">
              {{ song.artist }}
            </div>
          </div>
          <!-- song controls -->
          <div
            class="song-controls mt-6 flex items-center justify-center gap-6"
          >
            <!-- previous song -->
            <div
              @click="prevSong"
              class="icon-action cursor-pointer flex items-center text-2xl text-text"
            >
              <ion-icon name="play-skip-back"></ion-icon>
            </div>
            <!-- play/pause song -->
            <div
              class="icon-action text-3xl cursor-pointer text-white flex items-center p-4 rounded-full"
              @click="playSong"
              :class="{
                'bg-primary': song.genre === 'chill',
                'bg-yellow': song.genre === 'classic',
              }"
            >
              <ion-icon v-if="!isPlaying" name="play"></ion-icon>
              <ion-icon v-else name="pause"></ion-icon>
            </div>
            <!-- next song -->
            <div
              @click="nextSong"
              class="icon-action cursor-pointer flex items-center text-2xl text-text"
            >
              <ion-icon name="play-skip-forward"></ion-icon>
            </div>
          </div>
          <!-- song duration -->
          <div class="song-progress mt-10 flex items-center gap-3">
            <!-- current time -->
            <div class="current-time text-text text-xs font-medium"></div>
            <!-- progress -->
            <div class="w-full flex-1 relative progress-bar">
              <input
                type="range"
                value="0"
                step="1"
                min="0"
                max="100"
                class="w-full h-2 block rounded cursor-pointer"
                @input="moveProgressBar"
                @change="seekTime"
              />
              <div
                class="slide absolute pointer-events-none top-0 rounded left-0 h-full bg-black"
              ></div>
            </div>
            <!-- duration -->
            <div class="duration text-text text-xs font-medium"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div
      class="footer-actions overflow-hidden bg-white sticky bottom-0 left-0 w-full"
    >
      <div
        class="container mx-auto px-8 max-w-full rounded-t-3xl pt-8 p-b-safe-7"
        :class="{
          'bg-primary': song.genre === 'chill',
          'bg-yellow': song.genre === 'classic',
        }"
      >
        <div class="flex items-center justify-around text-3xl text-text">
          <a
            class="icon flex items-center cursor-pointer"
            :href="song.src"
            :download="song.name"
          >
            <ion-icon name="download"></ion-icon>
          </a>
          <div
            class="icon flex items-center cursor-pointer"
            :class="{ 'text-white': isLoop }"
            @click="loopSong"
          >
            <ion-icon name="repeat"></ion-icon>
          </div>
          <div
            class="icon flex items-center cursor-pointer"
            :class="{ 'text-white': isShuffle }"
            @click="activeShuffle"
          >
            <ion-icon name="shuffle"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderActions from "../components/HeaderActions.vue";
import { useRoute } from "vue-router";
import { onBeforeMount, ref, onUnmounted, onMounted, reactive } from "vue";
import { LIST_MUSIC } from "@/constants/index";
import { useStore } from "vuex";
export default {
  props: {
    bgSong: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
  },
  components: {
    HeaderActions,
  },
  setup() {
    // console.log(type);
    // define variables
    const route = useRoute();
    const audio = ref(null);
    audio.value = new Audio();
    const currentSongIndex = ref(null);
    const song = ref(null);
    const listMusic = reactive(
      LIST_MUSIC.filter((song) => song.genre === route.query.type)
    );
    const isMoving = ref(false);
    const cdAnimate = ref(null);
    const isLoop = ref(false);
    const isShuffle = ref(false);
    const store = useStore();
    const isInWishList = ref(false);
    // get song on load
    onBeforeMount(() => {
      audio.value.play();
      song.value = listMusic.find((song) => song.id === route.params.name);
      audio.value.src = song.value.src;
      isPlaying.value = true;
      audio.value.autoplay = "true";
      // set currentSongIndex
      const index = listMusic.indexOf(song.value);
      if (index !== -1) {
        currentSongIndex.value = index;
      }
      // check if song is in wishlist
      const check = store.state.songs.find((s) => s.id === song.value.id);
      if (check) {
        isInWishList.value = true;
      } else isInWishList.value = false;
    });
    // add to wishlist
    const addToWishList = () => {
      if (isInWishList.value) {
        store.dispatch("removeSongFromWishlist", {
          song: listMusic[currentSongIndex.value],
        });
        isInWishList.value = false;
      } else {
        store.dispatch("addSongToWishlist", {
          song: listMusic[currentSongIndex.value],
        });
        isInWishList.value = true;
      }
    };
    // dom
    onMounted(() => {
      const currentTime = document.querySelector(
        ".song-progress .current-time"
      );
      currentTime.innerHTML = "0:00";
      const duration = document.querySelector(".song-progress .duration");
      duration.innerHTML = "0:00";
    });
    // check status
    const isPlaying = ref(false);
    // get current song index
    const getSongIndex = (song) => {
      const index = listMusic.indexOf(song.value);
      if (index !== -1) {
        currentSongIndex.value = index;
      }
    };
    // set new song
    const setNewSong = () => {
      song.value = listMusic[currentSongIndex.value];
      audio.value.src = song.value.src;
      if (isPlaying.value) {
        audio.value.play();
      } else {
        audio.value.pause();
      }
    };
    // play song
    const playSong = () => {
      if (isPlaying.value) {
        isPlaying.value = false;
        audio.value.pause();
        cdAnimate.value.pause();
      } else {
        isPlaying.value = true;
        audio.value.play();
      }
    };
    // check in wishlist
    const checkInWishList = () => {
      const check = store.state.songs.find((s) => s.id === song.value.id);
      if (check) {
        isInWishList.value = true;
      } else isInWishList.value = false;
    };
    // next song
    const nextSong = () => {
      if (isShuffle.value) {
        shuffleSong();
      } else {
        getSongIndex(song);
        currentSongIndex.value++;
        if (currentSongIndex.value > listMusic.length - 1)
          currentSongIndex.value = 0;
        setNewSong();
        checkInWishList();
      }
    };
    // previous song
    const prevSong = () => {
      if (isShuffle.value) {
        shuffleSong();
      } else {
        getSongIndex(song);
        currentSongIndex.value--;
        if (currentSongIndex.value < 0)
          currentSongIndex.value = listMusic.length - 1;
        setNewSong();
        checkInWishList();
      }
    };
    // loop song
    const loopSong = () => {
      isLoop.value = !isLoop.value;
      audio.value.loop = isLoop.value;
    };
    // shuffle song
    const shuffleSong = () => {
      if (isShuffle.value) {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * listMusic.length);
        } while (newIndex === currentSongIndex.value);
        currentSongIndex.value = newIndex;
        setNewSong();
        checkInWishList();
      }
    };
    // toggle status shuffle
    const activeShuffle = () => {
      isShuffle.value = !isShuffle.value;
      shuffleSong();
    };
    // remove audio src when leave page
    onUnmounted(() => {
      audio.value.src = "";
    });
    // check on play/pause
    // audio.value.onplay = () => {
    //   cdAnimate.value.play();
    // };
    // update time
    const updateTime = () => {
      // current time
      let currentMin = Math.floor(audio.value.currentTime / 60);
      let currentSec = Math.floor(audio.value.currentTime % 60);
      currentSec < 10
        ? (currentSec = `0${currentSec}`)
        : (currentMin = `0${currentMin}`);
      const currentTime = document.querySelector(
        ".song-progress .current-time"
      );
      currentTime.innerHTML = currentMin + ":" + currentSec;
    };
    // update slide & thumb progress bar
    const updateProgress = () => {
      const slide = document.querySelector(".progress-bar .slide");
      const range = document.querySelector(".progress-bar input");
      let percent = (audio.value.currentTime / audio.value.duration) * 100;
      slide.style.width = Math.round(percent) + "%";
      range.value = Math.round(percent);
    };
    // seek time
    const seekTime = (e) => {
      isMoving.value = true;
      const seekTime = (audio.value.duration / 100) * e.target.value;
      audio.value.currentTime = seekTime;
      updateProgress();
      isMoving.value = false;
    };
    // move progress bar
    const moveProgressBar = (e) => {
      isMoving.value = true;
      const slide = document.querySelector(".progress-bar .slide");
      let x = e.target.value;
      slide.style.width = x + "%";
    };
    // data song loaded
    audio.value.onloadeddata = () => {
      //   const cdThumb = document.querySelector(".cd-thumb");
      //   cdAnimate.value = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      //     duration: 10000,
      //     iterations: Infinity,
      //   });
      //   cdAnimate.value.pause();
      let totalSec = Math.floor(audio.value.duration % 60);
      let totalMin = Math.floor(audio.value.duration / 60);
      totalMin < 10 ? (totalMin = `0${totalMin}`) : totalMin;
      totalSec < 10 ? (totalSec = `0${totalSec}`) : totalSec;
      const duration = document.querySelector(".song-progress .duration");
      duration.innerHTML = totalMin + ":" + totalSec;
    };
    // on time update
    audio.value.ontimeupdate = () => {
      if (!isMoving.value) {
        updateProgress();
        updateTime();
      }
    };
    // on time ended
    audio.value.onended = () => {
      if (isShuffle.value) {
        shuffleSong();
      }
      nextSong();
    };

    return {
      route,
      song,
      playSong,
      isPlaying,
      nextSong,
      getSongIndex,
      prevSong,
      seekTime,
      moveProgressBar,
      loopSong,
      shuffleSong,
      isLoop,
      isShuffle,
      activeShuffle,
      isInWishList,
      addToWishList,
    };
  },
};
</script>

<style lang="scss" scoped>
.music-actions {
  .song-progress {
    .progress-bar {
      .thumb {
        opacity: 0;
      }
      &:hover {
        .thumb {
          opacity: 1;
        }
      }
    }
  }
}
.music-icon {
  animation: rotate 2s linear infinite;
}
.music-container {
  &::-webkit-scrollbar {
    width: 0px;
  }
}
@keyframes rotate {
  0%,
  100% {
    transform: rotate(0);
  }
  40% {
    transform: rotate(-10deg);
  }
  60% {
    transform: rotate(10deg);
  }
}
input[type="range"] {
  & {
    -webkit-appearance: none;
    @apply bg-gray3;
  }
  &::-webkit-slider-thumb {
    width: 16px;
    -webkit-appearance: none;
    height: 16px;
    border-radius: 50%;
    @apply bg-black;
    transition: opacity 0.2s ease-in-out;
    position: relative;
    z-index: 1;
    opacity: 0;
  }
  &:hover {
    &::-webkit-slider-thumb {
      opacity: 1;
    }
  }
}
</style>
