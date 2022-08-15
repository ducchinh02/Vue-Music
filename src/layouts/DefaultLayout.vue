<template>
  <transition name="appear">
    <slot />
  </transition>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.appear-enter-active,
.appear-leave-active {
  transition: opacity 0.5s ease;
}

.appear-enter-from,
.appear-leave-to {
  opacity: 0;
}
</style>
