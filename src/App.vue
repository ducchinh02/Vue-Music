<template>
  <transition name="scale">
    <component :is="layout">
      <router-view />
    </component>
  </transition>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { PUBLIC_LAYOUT } from "./constants";
export default {
  setup() {
    const route = useRoute();
    return {
      layout: computed(() => (route.meta.layout || PUBLIC_LAYOUT) + "-layout"),
    };
  },
};
</script>

<style lang="scss" scoped>
.scale-enter-active {
  animation: scale 0.5s ease;
}
.scale-leave-active {
  animation: scale 0.3s reverse;
}
@keyframes scale {
  0% {
    transform: scale(0);
    opacity: 0;
    transform-origin: bottom left;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
