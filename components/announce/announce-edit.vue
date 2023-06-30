<template>
  <div class="announce-edit">
    <button v-if="hasRight && width >= 1024" @click="showDialog">
      Ajouter une annonce
    </button>
    <dialog ref="dialog" class="dialog-announce">
      <form>
        <div class="quitDialog">
          <button type="button" @click="quitDialog">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <label id="announce-edit-title" for="title">
          Title
          <input id="title" v-model="title" name="title" type="text" />
        </label>
        <label id="announce-edit-content" for="content">
          Content
          <textarea
            id="content"
            v-model="content"
            cols="30"
            name="content"
            rows="10"
          ></textarea>
        </label>
        <label id="announce-edit-url" for="url">
          URL to an announce or an image
          <input id="url" v-model="url" name="url" type="text" />
        </label>
        <div>
          <button v-if="isAnnounceToCreate" type="button" @click="newAnnounce">
            Créer une annonce
          </button>
          <button v-else type="button" @click="editAnnounce">
            Mettre à jour
          </button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
import { useAnnouncesStore } from '~/stores/announcesStore';
import { DirectusUser } from 'nuxt-directus/dist/runtime/types';
import { useWindowSize } from '@vueuse/core';
import { useDirectusUser } from 'nuxt-directus/dist/runtime/composables/useDirectusUser';

const props = defineProps({
  announceId: {
    type: String,
  },
  dialogEvent: {
    type: Boolean,
  },
});

const user = computed<DirectusUser>(() => useDirectusUser().value);

const hasRight = computed(() =>
  [
    'e5c8b057-49ff-4781-af76-ab555f5a0465',
    'bdb50fa6-c41d-4b5f-8d23-91d4f3748533',
  ].includes(user.value?.role),
);

const { width } = useWindowSize();

const { getAnnounce, createAnnounce, updateAnnounce } = useAnnouncesStore();

const dialog = ref();

const title = ref();
const content = ref();
const url = ref();

const isAnnounceToCreate = ref(true);

watch(
  () => props.dialogEvent,
  async () => {
    if (props.announceId) {
      isAnnounceToCreate.value = false;

      const announce = getAnnounce(parseInt(props.announceId, 10));

      title.value = announce.title;
      content.value = announce.content;
      url.value = announce.url;

      dialog.value.showModal();
    }
  },
);

const showDialog = () => {
  title.value = '';
  content.value = '';
  url.value = '';

  isAnnounceToCreate.value = true;

  dialog.value.showModal();
};
const quitDialog = () => {
  dialog.value.close();
};

const newAnnounce = async () => {
  await createAnnounce({
    title: title.value,
    content: content.value,
    url: url.value,
  });
  title.value = '';
  content.value = '';
  url.value = '';
};

const editAnnounce = async () => {
  await updateAnnounce({
    id: parseInt(<string>props.announceId, 10),
    title: title.value,
    content: content.value,
    url: url.value,
  });

  dialog.value.close();
};
</script>

<style scoped>
.announce-edit {
  @apply flex justify-center;
}

button {
  @apply px-5 bg-gray-800 rounded-3xl lg:h-full text-center lg:px-5 py-1.5 tracking-[0.45px] text-white hover:bg-opacity-60;
}

.dialog-announce {
  @apply h-4/5 w-3/4 bg-gray-900 text-white rounded-3xl shadow-2xl backdrop:bg-gray-900 backdrop:opacity-60;
}

.dialog-announce > form {
  @apply h-full p-5 flex flex-col gap-20;
}

.dialog-announce > form > label {
  @apply flex;
}

.dialog-announce > form > label > input {
  @apply flex-grow bg-gray-700 py-1 px-2 rounded-lg;
}

#announce-edit-content {
  @apply flex-col gap-2;
}

#announce-edit-content > textarea {
  @apply bg-gray-700 py-1 px-2 rounded-lg;
}

#announce-edit-title,
#announce-edit-url {
  @apply gap-5;
}

.dialog-announce button {
  @apply px-3 rounded-3xl bg-gray-400;
}

.quitDialog {
  @apply !justify-end;
}

.dialog-announce > form > div {
  @apply flex justify-center;
}
</style>
