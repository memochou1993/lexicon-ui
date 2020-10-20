<template>
  <div>
    <v-overlay
      :value="menu"
      :z-index="1"
    />
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :z-index="1"
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
            v-if="value && value.text"
            class="info--text"
          >
            {{ value.text }}
          </span>
          <span
            v-else
            class="red--text"
          >
            Empty
          </span>
        </div>
      </template>
      <ValueFormEdit
        v-if="value && value.id"
        :menu="menu"
        :injected-value="value"
        @setMenu="setMenu"
        @setValue="setValue"
      />
      <ValueFormCreate
        v-else
        :menu="menu"
        :injected-key="injectedKey"
        :injected-language="injectedLanguage"
        :injected-form="injectedForm"
        @setMenu="setMenu"
        @setValue="setValue"
      />
    </v-menu>
  </div>
</template>

<script>
import ValueFormCreate from '@/views/Project/Value/ValueFormCreate';
import ValueFormEdit from '@/views/Project/Value/ValueFormEdit';

export default {
  components: {
    ValueFormCreate,
    ValueFormEdit,
  },
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
    injectedValues: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      menu: false,
      value: null,
    };
  },
  created() {
    this.setValue(
      this.injectedValues.find(
        (value) => value.language.id === this.injectedLanguage.id && value.form.id === this.injectedForm.id,
      ),
    );
  },
  methods: {
    setMenu(menu) {
      this.menu = menu;
    },
    setValue(value) {
      this.value = value;
    },
  },
};
</script>
