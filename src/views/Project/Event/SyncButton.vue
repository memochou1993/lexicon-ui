<template>
  <div>
    <v-btn
      color="red darken-2"
      outlined
      small
      @click="dispatchEvents()"
    >
      Sync
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
      this.setMessage('Contacting server...');
      this.dispatch()
        .then(() => {
          this.setMessage('Events Dispatched!');
        })
        .catch(() => {
          this.setMessage('Oops! Something went wrong!');
        });
    },
  },
};
</script>
