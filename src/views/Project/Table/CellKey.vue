<template>
  <div>
    {{ injectedKey.name }}
  </div>
</template>

<script>
export default {
  props: {
    injectedKey: {
      type: Object,
      required: true,
    },
  },
};
</script>
