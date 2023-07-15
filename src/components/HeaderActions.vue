<template>
  <div class="container px-8 mx-auto">
    <div class="flex items-center justify-between">
      <div class="icon cursor-pointer">
        <router-link
          class="flex items-center"
          :to="{ name: routerName, params: routerParams }"
        >
          <ion-icon name="chevron-back-outline"></ion-icon>
        </router-link>
      </div>
      <slot />
      <div
        class="icon flex items-center transition-all duration-300 cursor-pointer"
        @click="addToWishList"
        :class="{ 'action-active': isInWishList }"
      >
        <ion-icon
          name="heart"
          :class="{ 'text-white': isInWishList }"
          class="visible"
        ></ion-icon>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
export default {
  props: {
    routerName: {
      type: String,
      required: false,
      default() {
        return "Home";
      },
    },
    routerParams: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    isInWishList: {
      type: Boolean,
      required: false,
    },
  },
  setup(props, { emit }) {
    const addToWishList = () => {
      emit("addToWishList");
    };

    return { addToWishList };
  },
};
</script>

<style lang="scss" scoped>
.action-active {
  @apply text-white;
  animation: bounce 0.5s linear;
}
@keyframes bounce {
  0%,
  100% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.3);
  }
}
</style>
