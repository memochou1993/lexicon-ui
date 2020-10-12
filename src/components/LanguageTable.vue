<template>
  <v-simple-table
    class="rounded-0"
  >
    <template
      v-slot:default
    >
      <tbody>
        <tr
          v-for="(language, index) in languages"
          :key="index"
        >
          <td
            style="width: 200px;"
          >
            {{ language.name }}
          </td>
          <td
            class="px-0"
          >
            <FormTable
              :language="language"
              :values="values"
            />
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import FormTable from '@/components/FormTable';

export default {
  components: {
    FormTable,
  },
  props: {
    languages: {
      type: Array,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
};
</script>
