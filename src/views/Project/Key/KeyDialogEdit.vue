<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <template
        v-slot:activator="{ on, attrs }"
      >
        <span
          class="info--text text--darken-1 text-h6 text-md-body-2"
          v-bind="attrs"
          v-on="on"
        >
          {{ key.name }}
        </span>
      </template>
      <KeyFormEdit
        :dialog="dialog"
        :injected-key="key"
        @setDialog="setDialog"
        @setKey="setKey"
      />
    </v-dialog>
  </div>
</template>

<script>
import KeyFormEdit from '@/views/Project/Key/KeyFormEdit';

export default {
  components: {
    KeyFormEdit,
  },
  props: {
    injectedKey: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      key: this.injectedKey,
    };
  },
  methods: {
    setDialog(dialog) {
      this.dialog = dialog;
    },
    setKey(key) {
      this.key = key;
    },
  },
};
</script>
