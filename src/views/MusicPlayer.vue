<template>
  <div class="flex h-screen overflow-hidden">
    <div
      class="music-player pt-8 flex flex-col relative w-full md:w-[60%] lg:w-[70%] border-0 md:border-r-[3px]"
      :class="{
        'bg-primary border-primary': song.genre === 'chill',
        'bg-yellow border-yellow': song.genre === 'classic',
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
          class="container px-8 mx-auto pt-12 lg:flex lg:items-center lg:justify-around"
        >
          <!-- cd thumb -->
          <div class="mx-auto lg:mx-0 w-56 sm:w-72 lg:w-80">
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
          <div class="music-actions lg:w-[45%]">
            <div class="song-info text-center mt-6">
              <div class="song-name font-semibold text-2xl">
                {{ song.name }}
              </div>
              <div class="song-artist text-base text-text">
                {{ song.artist }}
              </div>
            </div>
            <!-- song controls -->
            <div
              class="song-play-controls mt-6 flex items-center justify-center gap-6"
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
            <div
              class="flex flex-wrap sm:mx-0 mx-[-18px] mt-10 items-center gap-5"
            >
              <!-- song duration -->
              <div
                class="song-progress w-[60%] sm:w-3/5 flex items-center gap-3"
              >
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
              <!-- song volume -->
              <music-volume
                @setSongVolume="setSongVolume"
                class="flex-1 max-w-[50%]"
              />
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
    <list-songs
      :listMusic="listMusic"
      :isEnableActive="true"
      class="hidden md:block"
    />
  </div>
</template>

<script>
import HeaderActions from "../components/HeaderActions.vue";
import MusicVolume from "@/components/MusicVolume.vue";
import { useRoute } from "vue-router";
import ListSongs from "@/components/ListSongs.vue";
import {
  onBeforeMount,
  ref,
  onUnmounted,
  onBeforeUnmount,
  onMounted,
  reactive,
  watch,
} from "vue";
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
    MusicVolume,
    ListSongs,
  },
  setup() {
    // define variables
    const route = useRoute();

    const audio = ref(null);
    audio.value = new Audio();

    const currentSongIndex = ref(null);
    // const currentSongPlaying = computed(() => store.state.nowPlaying);
    const song = ref(null);
    const listMusic = reactive(
      LIST_MUSIC.filter((song) => song.genre === route.query.type)
    );
    const isMoving = ref(false);
    // const cdAnimate = ref(null);
    const isLoop = ref(false);
    const isShuffle = ref(false);
    const store = useStore();
    const isInWishList = ref(false);

    const setSongState = () => {
      store.commit("setCurrentSongPlaying", {
        id: route.params.name,
        ...song.value,
        currentTime: audio.value.currentTime,
        isPlaying: isPlaying.value,
        volume: audio.value.volume,
        genre: song.value.genre,
      });
    };
    watch(
      () => route.params.name,
      () => {
        getSong();
      }
    );

    const getSong = () => {
      song.value = listMusic.find((song) => song.id === route.params.name);
      audio.value.play();
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
      setSongState();
    };
    // get song on load
    onBeforeMount(() => {
      getSong();
    });
    // add to wishlist
    const addToWishList = () => {
      if (isInWishList.value) {
        store.dispatch("removeSongFromWishlist", {
          song: listMusic[currentSongIndex.value],
        });
      } else {
        store.dispatch("addSongToWishlist", {
          song: listMusic[currentSongIndex.value],
        });
      }
      isInWishList.value = !isInWishList.value;
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
      setSongState();
    };
    // play song
    const playSong = () => {
      isPlaying.value ? audio.value.pause() : audio.value.play();
      isPlaying.value = !isPlaying.value;
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
    onBeforeUnmount(() => {
      setSongState();
    });
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

    const setSongVolume = (data) => {
      audio.value.volume = data.volume;
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
      setSongVolume,
      listMusic,
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
</style>
