<template>
  <div class="home min-h-screen flex flex-col gap-6">
    <div class="container mx-auto px-9 pt-9">
      <div class="logo flex items-center gap-1">
        <image-logo :src="require('@/assets/images/Logo.svg')" alt="Logo" />
        <div class="logo-name text-blue text-xl font-semibold">Musical</div>
      </div>
      <div class="heading pt-4 text-3xl font-semibold tracking-tight">
        Let the music take you away...
      </div>
    </div>
    <div class="bg-image flex-1 flex pt-10">
      <div
        class="container mx-auto px-9 pb-9 flex flex-col justify-between md:flex-row md:items-center"
      >
        <div class="main-image">
          <img src="@/assets/images/TheBandSpeaker2.svg" alt="Main Image" />
        </div>
        <div class="relative text-center">
          <router-link
            :to="{ name: 'Dashboard', params: {} }"
            id="dashboard-link"
            class="inline-flex items-center justify-center p-4 rounded-full bg-black"
          >
            <ion-icon
              class="text-white icon transition-all duration-300"
              name="chevron-forward-outline"
            ></ion-icon>
          </router-link>
          <div class="text-sm font-semibold pt-6 text-text">
            Built By Duc Chinh - XXDCII
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageLogo from "../components/ImageLogo.vue";
// @ is an alias to /src
export default {
  name: "HomeView",
  components: { ImageLogo },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.bg-image {
  background: url("@/assets/images/TheBandSpotandDots.svg") center / cover
    no-repeat;
  @media screen and (min-width: 768px) {
    & {
      background: url("@/assets/images/TheBandSpotandDots.svg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
}
#dashboard-link:hover {
  .icon {
    transform: translateX(5px);
  }
}
</style>
