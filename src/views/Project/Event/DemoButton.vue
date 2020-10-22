<template>
  <div>
    <v-btn
      color="indigo darken-2"
      outlined
      small
      @click="preview()"
    >
      Demo
    </v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('project', [
      'projectData',
    ]),
  },
  methods: {
    preview() {
      this.projectData.data.hooks.forEach((hook) => {
        window.open(`${(new URL(hook.url)).origin}/demo`, '_blank', 'noopener noreferrer');
      });
    },
  },
};
</script>
