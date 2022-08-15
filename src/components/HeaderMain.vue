<template>
  <div class="header-main">
    <div class="main-image py-10 md:h-full" :class="bgColor">
      <slot />
      <div class="px-4 md:h-4/5">
        <img :src="src" :alt="alt" class="md:h-full md:object-contain" />
      </div>
      <div class="container px-8 mx-auto">
        <div class="font-semibold text-2xl pt-3">{{ heading }}</div>
        <div class="text-sm pt-2">{{ subtitle }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      required: false,
    },
    src: {
      type: String,
      required: false,
    },
    alt: {
      type: String,
      required: false,
    },
    heading: {
      type: String,
      required: false,
    },
    subtitle: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.header-main {
  .main-image {
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
  }
}
</style>
