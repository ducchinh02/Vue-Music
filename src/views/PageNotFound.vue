<template>
  <div class="min-h-screen flex flex-col gap-5 md:h-screen">
    <header-main
      class="md:h-full"
      bgColor="bg-primary"
      :src="require('@/assets/images/TheBandShow.svg')"
      heading="404"
      subtitle="Sorry, the page you are looking for could not be found."
    />
    <div
      class="text-center text-xl font-medium md:text-left md:container md:mx-auto md:px-8"
    >
      <router-link
        class="md:absolute md:text-left md:top-8 transition-all duration-300 inline-flex gap-1 items-center hover:text-primary md:hover:text-white"
        :to="{ name: 'Home', param: {} }"
      >
        <div class="icon transition-transform duration-300 flex items-center">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </div>
        Back to home</router-link
      >
    </div>
  </div>
</template>

<script>
import HeaderMain from "../components/HeaderMain.vue";
export default {
  components: { HeaderMain },
};
</script>

<style lang="scss" scoped>
.page-not-found {
  .main-image {
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
  }
}
a:hover {
  .icon {
    transform: translateX(-5px);
  }
}
</style>
