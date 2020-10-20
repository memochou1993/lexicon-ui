<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <template
        v-slot:activator="{ on, attrs }"
      >
        <v-btn
          color="primary"
          outlined
          small
          v-bind="attrs"
          v-on="on"
        >
          Add Key
        </v-btn>
      </template>
      <KeyFormCreate
        :dialog="dialog"
        @setDialog="setDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
import KeyFormCreate from '@/views/Project/Key/KeyFormCreate';

export default {
  components: {
    KeyFormCreate,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    setDialog(dialog) {
      this.dialog = dialog;
    },
  },
};
</script>
