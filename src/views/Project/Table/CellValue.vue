<template>
  <div>
    <v-menu
      v-model="menu"
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
            v-if="value && value.text"
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
      <CellValueCardEdit
        v-if="value && value.id"
        :injected-value="value"
        @setMenu="setMenu"
        @setValue="setValue"
      />
      <CellValueCardCreate
        v-else
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
import CellValueCardCreate from '@/views/Project/Table/CellValueCardCreate';
import CellValueCardEdit from '@/views/Project/Table/CellValueCardEdit';

export default {
  components: {
    CellValueCardCreate,
    CellValueCardEdit,
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
