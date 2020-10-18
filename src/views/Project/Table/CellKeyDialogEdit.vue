<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="editKey()"
    >
      <v-card>
        <v-card-title
          class="pa-3"
        >
          <v-spacer />
          <v-icon
            small
            @click="$emit('setDialog', false)"
          >
            mdi-close
          </v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text
          class="pa-5"
        >
          <v-text-field
            v-model="name"
            :error-messages="errors.name"
            :rules="[rules.required]"
            autocomplete="off"
            autofocus
            label="Name"
            outlined
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            :disabled="consistent || keyData.status.loading"
            color="primary"
            outlined
            small
            text
            @click="reset()"
          >
            Reset
          </v-btn>
          <v-spacer />
          <v-btn
            :disabled="consistent || keyData.status.loading || !valid"
            color="primary"
            elevation="0"
            small
            type="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    injectedKey: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      valid: false,
      rules: {
        required: (value) => !!value || 'Required.',
      },
      errors: {},
      name: this.injectedKey.name,
    };
  },
  computed: {
    ...mapState('key', [
      'keyData',
    ]),
    consistent() {
      return (
        this.name === this.injectedKey.name
      );
    },
    inputs() {
      return {
        name: this.name,
      };
    },
  },
  watch: {
    inputs() {
      if (!this.valid) {
        this.setErrors({});
      }
    },
  },
  created() {
    this.getKey();
  },
  methods: {
    ...mapActions('key', [
      'fetchKey',
      'updateKey',
    ]),
    setErrors(errors) {
      this.errors = errors;
    },
    setName(name) {
      this.name = name;
    },
    reset() {
      this.setName(this.injectedKey.name);
    },
    getKey() {
      this.fetchKey({
        keyId: this.injectedKey.id,
      });
    },
    editKey() {
      this.updateKey({
        keyId: this.injectedKey.id,
        ...this.inputs,
      })
        .then(({ data }) => {
          this.$emit('setKey', data);
          this.$emit('setDialog', false);
        })
        .catch((error) => {
          this.setErrors(error?.response?.data?.errors || {});
        });
    },
  },
};
</script>
