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
      <ValueCard
        :item="value"
      />
    </v-menu>
  </div>
</template>

<script>
import ValueCard from '@/views/Project/Table/CellValueCard';

export default {
  components: {
    ValueCard,
  },
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
