<template>
  <transition name="appear">
    <main class="relative">
      <header class="container mx-auto px-9 pt-9">
        <div class="header flex items-center justify-between">
          <div class="logo flex items-center gap-4">
            <image-logo
              :src="require('@/assets/images/LogoSing.svg')"
              alt="Logo"
            />
            <div class="logo-heading text-xl">
              Hi,
              <span class="font-bold inline-flex items-center gap-1"
                >Sweetest
                <ion-icon
                  class="flex items-center"
                  name="musical-notes-outline"
                ></ion-icon>
              </span>
            </div>
          </div>
          <div
            class="menu-bar cursor-pointer flex items-center font-bold text-3xl hover:text-primary transition-all duration-300"
            @click="openMenu"
          >
            <ion-icon name="menu-outline"></ion-icon>
          </div>
        </div>
      </header>
      <transition name="slide">
        <navigation @closeMenu="closeMenu" v-if="isOpenMenu" />
      </transition>
      <slot />
    </main>
  </transition>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import ImageLogo from "@/components/ImageLogo.vue";
import { ref } from "vue";
export default {
  components: { Navigation, ImageLogo },
  setup() {
    const isOpenMenu = ref(false);
    const openMenu = () => {
      isOpenMenu.value = true;
    };
    const closeMenu = () => {
      isOpenMenu.value = false;
    };
    return { isOpenMenu, openMenu, closeMenu };
  },
};
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

.slide-enter-active {
  animation: slide 0.5s ease-out;
}

.slide-leave-active {
  animation: slide 0.5s reverse;
}
@keyframes slide {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
