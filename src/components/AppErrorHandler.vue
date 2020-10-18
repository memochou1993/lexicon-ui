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
        <v-btn
          v-bind="attrs"
          color="error"
          icon
          @click="setError(null)"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
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
