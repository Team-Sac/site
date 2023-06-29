<template>
  <div id="about-page">
    <announce-edit
      :announce-id="announceId"
      :dialog-event="dialogEvent"
      class="announce-edit"
    ></announce-edit>
    <div id="announce-list">
      <ClientOnly fallback="Chargement des annonces..." fallback-tag="span">
        <announce-element
          v-for="announce in announces"
          :key="announce.id"
          :announce-id="announce.id"
          @open-announce-editor="editAnnounce"
        ></announce-element>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Announce, useAnnouncesStore } from '~/stores/announcesStore';

const announces = computed<Announce[]>(() => useAnnouncesStore().announces);

const { fetchAnnounces } = useAnnouncesStore();

await fetchAnnounces();

const announceId = ref<string>();
const dialogEvent = ref<boolean>(false);

const editAnnounce = (idAnnounce: number) => {
  announceId.value = idAnnounce.toString();
  dialogEvent.value = !dialogEvent.value;
};
</script>

<style scoped>
#about-page {
  @apply min-h-[calc(100vh-9rem)] w-full px-20 pb-16 flex flex-col gap-5;
}

#announce-list {
  @apply flex flex-col gap-5;
}
</style>
