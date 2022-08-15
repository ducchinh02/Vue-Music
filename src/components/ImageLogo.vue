<template>
  <div class="logo-img w-8 h-8 rounded-lg overflow-hidden">
    <img :src="src" :alt="alt" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false,
    },
    alt: {
      type: String,
      required: false,
    },
  },
};
</script>

<style></style>
