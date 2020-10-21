<template>
  <div>
    <v-btn
      color="red darken-2"
      outlined
      small
      @click="dispatchEvents()"
    >
      Dispatch Events
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('server', [
      'dispatch',
    ]),
    dispatchEvents() {
      this.dispatch();
    },
  },
};
</script>
