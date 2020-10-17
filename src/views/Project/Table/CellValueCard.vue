<template>
  <div>
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
            v-model="text"
            autofocus
            auto-grow
            color="info"
            flat
            hide-details
            rows="2"
            solo
          />
        </v-card>
      </v-card-text>
      <v-card-actions
        class="px-3 pt-0 pb-3"
      >
        <v-btn
          color="accent lighten-1"
          dark
          elevation="0"
          small
          @click="updateValue()"
        >
          <v-icon>
            mdi-check
          </v-icon>
        </v-btn>
        <v-btn
          color="accent lighten-1"
          dark
          outlined
          small
          @click="$emit('setMenu', false)"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      text: this.item.text,
    };
  },
  computed: {
    ...mapState('value', [
      'value',
    ]),
  },
  created() {
    this.getValue();
  },
  methods: {
    ...mapActions('value', [
      'fetchValue',
      'patchValue',
    ]),
    getValue() {
      this.fetchValue({
        valueId: this.item.id,
      });
    },
    updateValue() {
      this.patchValue({
        valueId: this.item.id,
        params: {
          text: this.text,
        },
      })
        .then(({ data }) => {
          this.$emit('setMenu', false);
          this.$emit('setValue', data);
        });
    },
  },
};
</script>
