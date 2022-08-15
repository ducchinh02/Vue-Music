<template>
  <swiper
    grab-cursor
    :slides-per-view="1"
    :space-between="16"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :breakpoints="{
      '576': {
        slidesPerView: 1.5,
      },
      '768': {
        slidesPerView: 2,
      },
      '991': {
        slidesPerView: 3,
      },
    }"
  >
    <swiper-slide
      class="slide-item rounded-2xl"
      v-for="item in array"
      :key="item.genre"
    >
      <router-link
        :to="{ name: 'Album', params: { name: item.route.name } }"
        class="flex flex-col overflow-hidden rounded-2xl"
      >
        <div class="slide-thumb h-50">
          <img class="h-full" :src="item.thumb" :alt="item.genre" />
        </div>
        <div class="slide-body flex-1 flex flex-col p-4">
          <div class="slide-desc text-text text-xs">
            {{ item.desc }}
          </div>
          <div class="slide-title font-semibold text-2xl pt-1">
            {{ item.title }}
          </div>
        </div>
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script>
import {} from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/scss";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    array: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  setup() {
    const onSwiper = () => {};
    const onSlideChange = () => {};
    return {
      onSwiper,
      onSlideChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  padding: 0 10px 40px;
  .swiper-slide {
    transform: scale(0.8);
    transition: all 0.3s ease;
    opacity: 0.8;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
    @media screen and (min-width: 768px) {
      & {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
  .swiper-slide-active {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
