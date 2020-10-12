<template>
  <v-simple-table
    class="rounded-0"
  >
    <template
      v-slot:default
    >
      <tbody>
        <tr
          v-for="(form, index) in language.forms"
          :key="index"
        >
          <td
            style="width: 200px;"
          >
            <v-row>
              <v-col
                cols="3"
                class="text-right"
              >
                {{ form.name }}
              </v-col>
              <v-col
                cols="9"
              >
                {{ find(form) ? find(form).text : 'N/A' }}
              </v-col>
            </v-row>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    language: {
      type: Object,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
  methods: {
    find(form) {
      return this.values.find(
        (value) => value.language.id === this.language.id && value.form.id === form.id,
      );
    },
  },
};
</script>
