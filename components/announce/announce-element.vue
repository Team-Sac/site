<template>
  <article class="announce">
    <h2>{{ announce.title }}</h2>
    <p>{{ announce.content }}</p>
    <p>
      <time :datetime="announce.date_created">{{
        new Date(announce.date_created).toLocaleString('FR-fr', {
          dateStyle: 'full',
          timeStyle: 'short',
        })
      }}</time>
    </p>
    <button v-if="hasRight" @click="editAnnounce">
      <i class="fas fa-pen"></i>
    </button>
    <button v-if="hasRight" @click="() => removeAnnounce">
      <i class="fas fa-trash"></i>
    </button>
    <NuxtLink v-if="announce.url" :to="announce.url" target="_blank"
      >Plus de Détails</NuxtLink
    >
  </article>
</template>

<script lang="ts" setup>
import { useAnnouncesStore } from '~/stores/announcesStore';
import { DirectusUser } from 'nuxt-directus/dist/runtime/types';

const props = defineProps({
  announceId: {
    type: Number,
    required: true,
  },
});

const { getAnnounce, deleteAnnounce } = useAnnouncesStore();

const announce = computed(() => getAnnounce(props.announceId));

const emit = defineEmits(['openAnnounceEditor']);

const user = computed<DirectusUser>(() => useDirectusUser().value);

const hasRight = computed(() =>
  [
    'e5c8b057-49ff-4781-af76-ab555f5a0465',
    'bdb50fa6-c41d-4b5f-8d23-91d4f3748533',
  ].includes(user.value?.role),
);

const editAnnounce = () => {
  emit('openAnnounceEditor', announce.value.id);
};

const removeAnnounce = async () => {
  await deleteAnnounce(announce.value.id);
};
</script>

<style scoped></style>
