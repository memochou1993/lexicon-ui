<template>
  <div>
    <span
      v-if="value"
    >
      {{ value.text }}
    </span>
    <span
      v-else
    >
      Empty
    </span>
  </div>
</template>

<script>
export default {
  props: {
    language: {
      type: Object,
      required: true,
    },
    form: {
      type: Object,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
  computed: {
    value() {
      return this.values.find(
        (value) => value.language.id === this.language.id && value.form.id === this.form.id,
      );
    },
  },
};
</script>
