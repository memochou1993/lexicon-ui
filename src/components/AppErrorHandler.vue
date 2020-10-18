<template>
  <div>
    <v-snackbar
      :timeout="10000"
      :value="error"
      bottom
      color="error"
      text
    >
      {{ message }}
      <template
        v-slot:action="{ attrs }"
      >
        <v-icon
          color="error"
          icon
          v-bind="attrs"
          @click="setError(null)"
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
  computed: {
    ...mapState([
      'error',
    ]),
    message() {
      return this?.error?.response?.data?.message || this?.error?.message || '';
    },
  },
  methods: {
    ...mapMutations([
      'setError',
    ]),
  },
};
</script>
