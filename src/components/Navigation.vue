<template>
  <nav
    class="w-full h-full overflow-auto bg-white absolute top-0 left-0 px-8 z-10 text-xl"
  >
    <!-- close icon & logo -->
    <div class="flex items-center justify-between pt-10">
      <router-link
        :to="{ name: 'Home', params: {} }"
        class="logo flex items-center gap-1"
      >
        <image-logo
          class="-scale-x-100"
          :src="require('@/assets/images/Logo.svg')"
          alt="Logo"
        />
        <div class="logo-name text-blue text-xl font-semibold">Musical</div>
      </router-link>
      <div
        class="close-icon cursor-pointer flex items-center text-4xl transition-all duration-300"
        @click="$emit('closeMenu')"
      >
        <ion-icon name="close-outline"></ion-icon>
      </div>
    </div>
    <!-- menu -->
    <div class="text-primary pt-10 pb-5 font-bold text-2xl">Wishlist</div>
    <ul class="menu flex flex-col gap-3">
      <li>
        <div
          class="flex items-center justify-between transition-all duration-300 cursor-pointer hover:text-primary"
        >
          <span class="font-medium">Albums</span>
          <div class="icon flex items-center text-2xl">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
        </div>
      </li>
      <li>
        <div
          class="flex items-center justify-between transition-all duration-300 cursor-pointer hover:text-primary"
        >
          <span class="font-medium">Songs</span>
          <div class="icon flex items-center text-2xl">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import ImageLogo from "@/components/ImageLogo.vue";
export default { components: { ImageLogo } };
</script>

<style lang="scss" scoped>
nav {
  &::-webkit-scrollbar {
    width: 0;
  }
  .close-icon:hover {
    transform: rotate(360deg);
    @apply text-primary;
  }
}
</style>
