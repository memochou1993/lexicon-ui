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
          class="info--text"
          v-bind="attrs"
          v-on="on"
        >
          {{ injectedKey.name }}
        </span>
      </template>
      <v-card>
        <v-card-title
          class="pa-3"
        >
          <v-spacer />
          <v-icon
            small
            @click="setDialog(false)"
          >
            mdi-close
          </v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text
          class="pa-5"
        >
          {{ injectedKey.name }}
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            color="primary"
            outlined
            small
            @click="setDialog(false)"
          >
            Reset
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            elevation="0"
            small
            @click="setDialog(false)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    injectedKey: {
      type: Object,
      required: true,
    },
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
