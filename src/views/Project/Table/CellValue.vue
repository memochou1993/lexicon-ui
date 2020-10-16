<template>
  <div>
    <v-menu
      :close-on-content-click="false"
      content-class="elevation-2"
      offset-y
    >
      <template
        v-slot:activator="{ on, attrs }"
      >
        <div
          v-bind="attrs"
          v-on="on"
        >
          <span
            v-if="value"
            class="info--text"
          >
            {{ value.text }}
          </span>
          <span
            v-else
            class="error--text"
          >
            Empty
          </span>
        </div>
      </template>
      <v-card
        color="orange lighten-5"
      >
        <v-card-text
          class="pa-3"
        >
          <v-card
            outlined
          >
            <v-textarea
              autofocus
              color="info"
              flat
              hide-details
              solo
            />
          </v-card>
        </v-card-text>
        <v-card-actions
          class="px-3 pt-0 pb-3"
        >
          <v-btn
            color="primary"
            outlined
            small
          >
            <v-icon>
              mdi-check
            </v-icon>
          </v-btn>
          <v-btn
            color="primary"
            outlined
            small
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    language: {
      type: Object,
      required: true,
    },
    form: {
      type: Object,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
  computed: {
    value() {
      return this.values.find(
        (value) => value.language.id === this.language.id && value.form.id === this.form.id,
      );
    },
  },
};
</script>
