<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="error ? 8000 : 4000"
      :value="true"
      bottom
      outlined
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
import { mapState, mapMutations } from 'vuex';

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
  computed: {
    ...mapState([
      'error',
    ]),
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
