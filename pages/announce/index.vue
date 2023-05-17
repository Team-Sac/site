<template>
  <div>
    <ClientOnly fallback="Chargement des annonces..." fallback-tag="span">
      <article
        v-for="{ id, title, content, date_created } in announces"
        :key="id"
        class="announce"
      >
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <p>
          <time :datetime="date_created">{{
            new Date(date_created).toLocaleDateString('FR-fr')
          }}</time>
        </p>
      </article>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { Announce, useAnnouncesStore } from '~/stores/announcesStore';

const { announces, fetchAnnounces }: { announces: Announce[] } =
  useAnnouncesStore();
await fetchAnnounces();
</script>

<style scoped></style>
