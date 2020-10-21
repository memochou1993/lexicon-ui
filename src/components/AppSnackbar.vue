<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="5000"
      :value="true"
      bottom
      text
    >
      {{ message }}
      <template
        v-slot:action="{ attrs }"
      >
        <v-icon
          :color="color"
          icon
          v-bind="attrs"
          @click="setSnackbar(false)"
        >
          mdi-close
        </v-icon>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    color: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      snackbar: true,
    };
  },
  watch: {
    snackbar(value) {
      if (!value) {
        this.setMessage('');
      }
    },
  },
  methods: {
    ...mapMutations([
      'setMessage',
    ]),
    setSnackbar(snackbar) {
      this.snackbar = snackbar;
    },
  },
};
</script>
