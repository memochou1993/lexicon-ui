<template>
  <div>
    <v-card
      v-if="project.data"
    >
      <v-card-title>
        {{ project.data.name }}
      </v-card-title>
      <v-card-text>
        <v-simple-table
          v-if="keys.data"
          class="rounded-0"
        >
          <template
            v-slot:default
          >
            <tbody>
              <tr
                v-for="(key, index) in keys.data"
                :key="index"
              >
                <td
                  style="width: 200px;"
                >
                  {{ key.name }}
                </td>
                <td
                  class="px-0"
                >
                  <LanguageTable
                    :languages="project.data.languages"
                    :values="key.values"
                  />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
} from 'vuex';
import LanguageTable from '@/components/LanguageTable';

export default {
  components: {
    LanguageTable,
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
