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
          :disabled="!text"
          color="accent lighten-1"
          elevation="0"
          small
          @click="createValue()"
        >
          <v-icon>
            mdi-check
          </v-icon>
        </v-btn>
        <v-btn
          color="accent lighten-1"
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
import { mapActions } from 'vuex';

export default {
  props: {
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
  methods: {
    ...mapActions('value', [
      'storeValue',
    ]),
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
