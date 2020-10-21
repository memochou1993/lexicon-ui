<template>
  <div>
    <AppSnackbar
      v-if="message && !hidden.includes(status)"
      :color="error ? 'error' : 'success'"
      :message="message"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import AppSnackbar from '@/components/AppSnackbar';

export default {
  components: {
    AppSnackbar,
  },
  data() {
    return {
      hidden: [
        422,
      ],
    };
  },
  computed: {
    ...mapState([
      'error',
      'message',
    ]),
    status() {
      return this.error?.response?.status || 0;
    },
  },
  watch: {
    error() {
      this.setMessage(this.error?.response?.data?.message || this.error?.message || '');
    },
    message(value) {
      if (!value) {
        this.setError(null);
      }
    },
  },
  methods: {
    ...mapMutations([
      'setError',
      'setMessage',
    ]),
  },
};
</script>
