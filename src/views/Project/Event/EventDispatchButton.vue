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
import { mapMutations, mapActions } from 'vuex';

export default {
  methods: {
    ...mapMutations([
      'setMessage',
    ]),
    ...mapActions('server', [
      'dispatch',
    ]),
    dispatchEvents() {
      this.setMessage('Events dispatched!');
      this.dispatch()
        .catch(() => {
          this.setMessage('Events dispatched failed!');
        });
    },
  },
};
</script>
