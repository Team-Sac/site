<template>
  <div class="about">
    <div v-for="sac in sacs" :key="sac.id" class="card">
      <div class="image-wrapper">
        <img
          :alt="`image de profil de ${sac.id}`"
          :src="sac.profile_image_url"
          height="300"
          width="300"
        />
        <div class="image-filter"></div>
      </div>
      <div class="title">
        <div class="name">
          <h2>{{ sac.id }}</h2>
        </div>
        <div class="more">
          <NuxtLink
            :to="`https://www.twitch.tv/${sac.id}`"
            class="twitch"
            target="_blank"
          >
            <i class="fab fa-twitch"></i>
          </NuxtLink>
        </div>
      </div>
      <div class="description">
        <div></div>
        <p>{{ sac.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Streamer, useStreamersStore } from '~/stores/streamersStore';

const streamersStore = useStreamersStore();

await streamersStore.fetchDirectusStreamers();
const sacs = await computed<Streamer[]>(() => streamersStore.sacs);
</script>

<style scoped>
.about {
  @apply w-full min-h-screen 2xl:h-[calc(100vh-10.7rem)] grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-[2.5%] xl:gap-[7.5%] justify-items-center justify-center  px-20 md:px-40 2xl:pt-16 pb-16;
}

.card {
  @apply relative max-w-[80%] md:max-w-full px-[12px] md:px-[31px] py-[10px] md:py-[27px] aspect-square rounded-lg overflow-hidden content-center flex flex-col justify-between;
}

.image-wrapper {
  @apply absolute h-full min-w-full aspect-square top-0 left-0;
}

.image-wrapper > img {
  @apply relative object-cover bg-cover w-full;
}

.image-wrapper > div {
  @apply absolute top-0 left-0 w-[calc(100%+1px)] aspect-square bg-gradient-to-bl from-[hsla(231,74%,9%,0.74)] to-[hsla(230,62%,14%,0.71)] opacity-75;
}

.title,
.description {
  @apply relative;
}

.title {
  @apply flex justify-between text-[26px];
}

.description > div {
  @apply absolute top-0 left-0 w-[calc(100%+1px)] h-full bg-gradient-to-bl from-[hsl(231,73%,9%)] to-[hsla(230,84%,10%,0.5)] backdrop-blur-[60px] opacity-70 rounded-lg;
}

.description > p {
  @apply relative text-[11px] md:text-[14px] px-1.5 md:px-3 py-2;
}
</style>
