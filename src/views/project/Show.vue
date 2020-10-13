<template>
  <v-card>
    <v-card
      v-if="project.data"
    >
      <v-card-title>
        {{ project.data.name }}
      </v-card-title>
      <v-card-text>
        <v-card
          v-if="keys.data"
          flat
        >
          <v-row
            v-for="(key, keyIndex) in keys.data"
            :key="keyIndex"
            align="center"
            no-gutters
          >
            <v-col
              cols="3"
              class="black--text text-center"
            >
              {{ key.name }}
            </v-col>
            <v-col
              cols="9"
            >
              <v-simple-table>
                <template
                  v-slot:default
                >
                  <tbody>
                    <tr
                      v-for="(language, languageIndex) in project.data.languages"
                      :key="languageIndex"
                    >
                      <td
                        style="width: 200px;"
                      >
                        {{ language.name }}
                      </td>
                      <td
                        class="px-0"
                      >
                        <v-row
                          v-for="(form, formIndex) in language.forms"
                          :key="formIndex"
                          align="center"
                        >
                          <v-col
                            cols="3"
                            class="text-right"
                          >
                            {{ form.name }}
                          </v-col>
                          <v-col
                            cols="9"
                          >
                            {{ getValue(key.values, language, form) || 'N/A' }}
                          </v-col>
                        </v-row>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card>
        <v-pagination
          v-if="pages > 1"
          v-model="page"
          :length="pages"
          :total-visible="7"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          class="pt-4"
        />
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
} from 'vuex';

export default {
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapState('key', [
      'keys',
    ]),
    ...mapState('project', [
      'project',
    ]),
    ...mapGetters('key', [
      'pages',
    ]),
  },
  watch: {
    page() {
      this.getKeys();
    },
  },
  created() {
    this.getProject();
    this.getKeys();
  },
  methods: {
    ...mapActions('key', [
      'fetchKeys',
    ]),
    ...mapActions('project', [
      'fetchProject',
    ]),
    getKeys() {
      this.fetchKeys({
        projectId: this.$route.params.projectId,
        page: this.page,
        relations: [
          'values',
        ],
      });
    },
    getProject() {
      this.fetchProject({
        projectId: this.$route.params.projectId,
        relations: [
          'languages',
          'languages.forms',
        ],
      });
    },
    getValue(values, language, form) {
      return values.find(
        (value) => value.language.id === language.id && value.form.id === form.id,
      )?.text;
    },
  },
};
</script>

<style lang="scss" scoped>
tr {
  &:not(:last-child) {
    td {
      border-bottom-color: transparent !important;
    }
  }
  &:hover {
    background-color: transparent !important;
  }
}
</style>
