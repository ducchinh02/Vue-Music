<template>
  <transition name="scale">
    <slot />
  </transition>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.scale-enter-active {
  animation: scale 0.5s;
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
