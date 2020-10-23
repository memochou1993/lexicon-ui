<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="createKey()"
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
        class="pa-5 pb-0"
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
          :disabled="!dialog || keyData.status.loading"
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
          :disabled="!dialog || keyData.status.loading || !valid"
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
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    dialog: {
      type: Boolean,
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
      name: '',
    };
  },
  computed: {
    ...mapState('project', [
      'projectData',
    ]),
    ...mapState('key', [
      'keyData',
    ]),
    inputs() {
      return {
        name: this.name,
      };
    },
  },
  watch: {
    dialog(value) {
      if (value) {
        this.reset();
      }
    },
    inputs() {
      if (!this.valid) {
        this.setErrors({});
      }
    },
  },
  methods: {
    ...mapActions('key', [
      'storeKey',
    ]),
    setErrors(errors) {
      this.errors = errors;
    },
    setName(name) {
      this.name = name;
    },
    reset() {
      this.$refs.form.resetValidation();
      this.setName('');
    },
    createKey() {
      this.storeKey({
        projectId: this.projectData.data.id,
        ...this.inputs,
      })
        .then(() => {
          this.$emit('setDialog', false);
        })
        .catch((error) => {
          this.setErrors(error?.response?.data?.errors || {});
        });
    },
  },
};
</script>
