<template>
  <span>
    <v-progress-circular
      :color="color"
      :size="size"
      :width="width"
      indeterminate
    />
  </span>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: 'primary',
    },
    size: {
      type: Number,
      required: false,
      default: 60,
    },
    width: {
      type: Number,
      required: false,
      default: 3,
    },
  },
};
</script>
