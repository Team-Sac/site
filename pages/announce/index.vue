<template>
  <div>
    <form v-if="hasRight">
      <label for="title">
        Title
        <input id="title" v-model="titleNew" name="title" type="text" />
      </label>
      <label for="content">
        Content
        <textarea
          id="content"
          v-model="contentNew"
          cols="30"
          name="content"
          rows="10"
        ></textarea>
      </label>
      <button @click="newAnnounce">Créer une annonce</button>
    </form>
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
            new Date(date_created).toLocaleString('FR-fr', {
              dateStyle: 'full',
              timeStyle: 'short',
            })
          }}</time>
        </p>
        <button v-if="hasRight" @click="() => removeAnnounce(id)">
          <i class="fas fa-trash"></i>
        </button>
      </article>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { Announce, useAnnouncesStore } from '~/stores/announcesStore';
import { DirectusUser } from 'nuxt-directus/dist/runtime/types';

const user = computed<DirectusUser>(() => useDirectusUser().value);

const hasRight = computed(() => {
  if (!user.value) return false;
  return [
    'e5c8b057-49ff-4781-af76-ab555f5a0465',
    'bdb50fa6-c41d-4b5f-8d23-91d4f3748533',
  ].includes(user.value?.role);
});

const { fetchAnnounces, createAnnounce, deleteAnnounce } = useAnnouncesStore();

const announces = computed<Announce[]>(() => useAnnouncesStore().announces);

await fetchAnnounces();

const titleNew = ref('');
const contentNew = ref('');

const newAnnounce = async (e) => {
  e.preventDefault();
  await createAnnounce({ title: titleNew.value, content: contentNew.value });
  titleNew.value = '';
  contentNew.value = '';
};
const removeAnnounce = async (id) => {
  await deleteAnnounce(id);
};
</script>

<style scoped></style>
