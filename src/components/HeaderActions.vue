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
        :class="{ 'action-active': action_active }"
      >
        <ion-icon
          name="heart"
          :class="{ 'text-white': action_active }"
          class="visible"
        ></ion-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
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
      type: String,
      required: false,
      default() {
        return "{}";
      },
    },
  },
  setup(props, { emit }) {
    const action_active = ref(false);
    const addToWishList = () => {
      action_active.value = !action_active.value;
      emit("addToWishList", { status: action_active.value });
    };

    return { action_active, addToWishList };
  },
};
</script>

<style lang="scss" scoped>
.action-active {
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
