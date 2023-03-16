<template>
  <button :class="classes" :style="style" type="button" @click="onClick">
    {{ label }}
  </button>
</template>

<script>
import './button.css';
import { computed, reactive } from 'vue';

export default {
  name: 'MyButton',

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator(value) {
        return ['small', 'medium', 'large'].includes(value);
      },
      default: 'medium',
    },
    backgroundColor: {
      type: String,
      default: 'white',
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    const reactiveProps = reactive(props);
    return {
      classes: computed(() => ({
        'storybook-button': true,
        'storybook-button--primary': reactiveProps.primary,
        'storybook-button--secondary': !reactiveProps.primary,
        [`storybook-button--${reactiveProps.size || 'medium'}`]: true,
      })),
      style: computed(() => ({
        backgroundColor: reactiveProps.backgroundColor,
      })),
      onClick() {
        emit('click');
      },
    };
  },
};
</script>
