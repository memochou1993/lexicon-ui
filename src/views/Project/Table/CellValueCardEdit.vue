<template>
  <div>
    <v-card>
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
            color="primary"
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
          :disabled="injectedValue.text === text"
          color="primary lighten-1"
          elevation="0"
          small
          @click="editValue()"
        >
          <v-icon>
            mdi-check
          </v-icon>
        </v-btn>
        <v-btn
          color="primary lighten-1"
          outlined
          small
          text
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
    injectedValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      text: this.injectedValue.text,
    };
  },
  computed: {
    ...mapState('value', [
      'valueData',
    ]),
  },
  created() {
    this.getValue();
  },
  methods: {
    ...mapActions('value', [
      'storeValue',
      'fetchValue',
      'updateValue',
    ]),
    getValue() {
      this.fetchValue({
        valueId: this.injectedValue.id,
      });
    },
    createValue() {
      this.$emit('setMenu', false);
      this.$emit('setValue', { text: this.text });
      this.storeValue({
        keyId: this.injectedKey.id,
        text: this.text,
        languageId: this.injectedLanguage.id,
        formId: this.injectedForm.id,
      });
    },
    editValue() {
      const { injectedValue } = this;
      this.$emit('setMenu', false);
      this.$emit('setValue', { ...injectedValue, text: this.text });
      this.updateValue({
        valueId: this.injectedValue.id,
        text: this.text,
      })
        .then(({ data }) => {
          this.$emit('setValue', data);
        })
        .catch(() => {
          this.$emit('setValue', injectedValue);
        });
    },
  },
};
</script>
