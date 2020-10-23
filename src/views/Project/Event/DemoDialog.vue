<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <template
        v-slot:activator="{ on, attrs }"
      >
        <v-btn
          color="red darken-2"
          outlined
          small
          v-bind="attrs"
          v-on="on"
        >
          Demo
        </v-btn>
      </template>
      <DemoDialogDispatch
        :dialog="dialog"
        @setDialog="setDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
import DemoDialogDispatch from '@/views/Project/Event/DemoDialogDispatch';

export default {
  components: {
    DemoDialogDispatch,
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
