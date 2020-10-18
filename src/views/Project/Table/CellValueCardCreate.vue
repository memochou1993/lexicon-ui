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
          :disabled="!text"
          color="primary lighten-1"
          elevation="0"
          small
          @click="createValue()"
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
import { mapActions } from 'vuex';

export default {
  props: {
    menu: {
      type: Boolean,
      required: true,
    },
    injectedKey: {
      type: Object,
      required: true,
    },
    injectedLanguage: {
      type: Object,
      required: true,
    },
    injectedForm: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      text: '',
    };
  },
  watch: {
    menu(value) {
      if (value) {
        this.reset();
      }
    },
  },
  methods: {
    ...mapActions('value', [
      'storeValue',
    ]),
    setText(text) {
      this.text = text;
    },
    reset() {
      this.setText('');
    },
    createValue() {
      this.$emit('setMenu', false);
      this.$emit('setValue', { text: this.text });
      this.storeValue({
        keyId: this.injectedKey.id,
        text: this.text,
        languageId: this.injectedLanguage.id,
        formId: this.injectedForm.id,
      })
        .then(({ data }) => {
          this.$emit('setValue', data);
        })
        .catch(() => {
          this.$emit('setValue', null);
        });
    },
  },
};
</script>
