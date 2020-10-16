<template>
  <div>
    <v-card
      v-if="project.data && keys.data"
    >
      <v-card-title
        class="pa-5"
      >
        {{ project.data.name }}
      </v-card-title>
      <v-card-text>
        <v-list
          outlined
          class="py-0"
        >
          <template
            v-for="(key, keyIndex) in keys.data"
          >
            <v-list-item
              :key="key.id"
              class="px-0"
            >
              <v-list-item-content
                class="py-0"
              >
                <v-row
                  align="center"
                  no-gutters
                  class="grey lighten-5"
                >
                  <v-col
                    cols="3"
                    class="text-center"
                  >
                    <CellKey
                      :item="key"
                    />
                  </v-col>
                  <v-col
                    cols="9"
                  >
                    <v-list
                      class="py-0"
                    >
                      <template
                        v-for="(language, languageIndex) in project.data.languages"
                      >
                        <v-list-item
                          :key="language.id"
                          class="px-0"
                        >
                          <v-list-item-content
                            class="py-0"
                          >
                            <v-simple-table>
                              <template
                                v-slot:default
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style="width: 200px;"
                                      class="grey lighten-4 text-center"
                                    >
                                      {{ language.name }}
                                    </td>
                                    <td
                                      :class="`${Math.abs(keyIndex - languageIndex) % 2 ? 'white' : 'grey lighten-5'}`"
                                    >
                                      <v-row
                                        v-for="form in language.forms"
                                        :key="form.id"
                                        align="center"
                                      >
                                        <v-col
                                          cols="2"
                                          class="text-right"
                                        >
                                          <v-chip
                                            color="accent"
                                            ripple
                                            outlined
                                            small
                                          >
                                            {{ form.name }}
                                          </v-chip>
                                        </v-col>
                                        <v-col
                                          cols="10"
                                        >
                                          <CellValue
                                            :language="language"
                                            :form="form"
                                            :values="key.values"
                                          />
                                        </v-col>
                                      </v-row>
                                    </td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider
                          v-if="languageIndex < project.data.languages.length - 1"
                          :key="`divider-${language.id}`"
                        />
                      </template>
                    </v-list>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              v-if="keyIndex < keys.data.length - 1"
              :key="`divider-${key.id}`"
            />
          </template>
        </v-list>
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
    <v-card
      v-else
    >
      <v-card-text>
        <AppProgress />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
} from 'vuex';
import AppProgress from '@/components/AppProgress';
import CellKey from '@/views/Project/Table/CellKey';
import CellValue from '@/views/Project/Table/CellValue';

export default {
  components: {
    AppProgress,
    CellKey,
    CellValue,
  },
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
  },
};
</script>