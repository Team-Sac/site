<template>
  <article class="announce">
    <div class="background-announce"></div>
    <div class="content">
      <h2>{{ announce.title }}</h2>
      <div>
        <p>{{ announce.content }}</p>
        <NuxtLink
          v-if="announce.url"
          :title="announce.url"
          :to="announce.url"
          class="more"
          target="_blank"
        >
          <i class="fas fa-link fa-lg"></i>
        </NuxtLink>
      </div>
    </div>
    <time :datetime="announce.date_created">{{
      new Date(announce.date_created).toLocaleString('FR-fr', {
        dateStyle: 'full',
        timeStyle: 'short',
      })
    }}</time>
    <div v-if="hasRight" class="announce-actions">
      <button title="Éditer" @click="editAnnounce">
        <i class="fas fa-pen fa-lg"></i>
      </button>
      <button title="Supprimer" @click="() => removeAnnounce">
        <i class="fas fa-trash fa-lg"></i>
      </button>
    </div>
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

<style scoped>
.announce {
  @apply relative p-5 rounded-3xl shadow-md shadow-[rgba(0,0,0,.25)] overflow-hidden;
}

.content {
  @apply relative flex flex-col gap-[1.5625rem];
}

.content > h2 {
  @apply text-[1.25rem] leading-[1.6875rem] font-medium tracking-[0.02813rem] text-[#A0AEC0];
}

.content > div {
  @apply grid grid-cols-[1fr,40px];
}

.more {
  @apply w-full flex justify-center items-center;
}

i {
  @apply w-full hover:bg-gray-800 px-2 py-3;
}

.announce > time {
  @apply absolute top-0 right-0 p-5;
}

.announce-actions {
  @apply relative flex justify-end gap-1 w-full;
}

.announce-actions > button {
  @apply w-[40px];
}

.background-announce {
  @apply absolute top-0 left-0 w-full h-full bg-white opacity-5;
}
</style>
