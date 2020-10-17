<template>
  <div>
    <v-card
      v-if="projectData.data && keyList.data"
    >
      <v-card-title
        class="pa-5"
      >
        {{ projectData.data.name }}
      </v-card-title>
      <v-card-text>
        <v-list
          outlined
          class="py-0"
        >
          <template
            v-for="(key, keyIndex) in keyList.data"
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
                      :injected-key="key"
                    />
                  </v-col>
                  <v-col
                    cols="9"
                  >
                    <v-list
                      class="py-0"
                    >
                      <template
                        v-for="(language, languageIndex) in projectData.data.languages"
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
                                      :class="`${(keyIndex + languageIndex) % 2 ? 'white' : 'grey lighten-5'}`"
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
                                            :injected-key="key"
                                            :injected-language="language"
                                            :injected-form="form"
                                            :injected-values="key.values"
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
                          v-if="languageIndex < projectData.data.languages.length - 1"
                          :key="`divider-${language.id}`"
                        />
                      </template>
                    </v-list>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              v-if="keyIndex < keyList.data.length - 1"
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
        <div
          class="py-5 text-center"
        >
          <AppProgress />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
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
      'keyList',
    ]),
    ...mapState('project', [
      'projectData',
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
