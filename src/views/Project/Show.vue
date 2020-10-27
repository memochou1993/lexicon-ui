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
        <v-card
          flat
        >
          <v-card-actions
            class="px-0 pt-0 pb-4"
          >
            <KeyDialogCreate />
            <v-spacer />
            <DemoDialog />
          </v-card-actions>
        </v-card>
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
                  :class="$vuetify.breakpoint.mdAndUp ? 'grey lighten-5' : 'grey lighten-2'"
                >
                  <v-col
                    cols="12"
                    md="3"
                    class="pa-5 text-md-center"
                  >
                    <KeyDialogEdit
                      :injected-key="key"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="9"
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
                                      :class="
                                        (projectData.data.languages.length % 2 && keyIndex + languageIndex) % 2
                                          ? 'white'
                                          : 'grey lighten-5'
                                      "
                                    >
                                      <v-row
                                        v-for="form in language.forms"
                                        :key="form.id"
                                        align="center"
                                      >
                                        <v-col
                                          cols="12"
                                          md="2"
                                          class="text-md-right"
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
                                          cols="12"
                                          md="10"
                                        >
                                          <ValueMenu
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
import { mapState, mapActions } from 'vuex';
import AppProgress from '@/components/AppProgress';
import DemoDialog from '@/views/Project/Event/DemoDialog';
import KeyDialogCreate from '@/views/Project/Key/KeyDialogCreate';
import KeyDialogEdit from '@/views/Project/Key/KeyDialogEdit';
import ValueMenu from '@/views/Project/Value/ValueMenu';

export default {
  components: {
    AppProgress,
    DemoDialog,
    KeyDialogCreate,
    KeyDialogEdit,
    ValueMenu,
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
    pages() {
      return this.keyList.meta?.last_page || 0;
    },
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
          'hooks',
          'languages',
          'languages.forms',
          'setting',
        ],
      });
    },
  },
};
</script>
