<template>
  <div>
    <v-card
      v-if="project.data"
    >
      <v-card-title>
        {{ project.data.name }}
      </v-card-title>
      <v-card-text>
        <v-data-table
          v-if="keys.data"
          :items="keys.data"
          hide-default-footer
          hide-default-header
        >
          <template
            v-slot:body="{ items }"
          >
            <tbody>
              <tr
                v-for="(item, index) in items"
                :key="index"
              >
                <td>
                  {{ item.name }}
                </td>
                <td>
                  values
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
        <v-pagination
          v-if="pages > 1"
          v-model="page"
          :length="pages"
          :total-visible="7"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          class="mt-4"
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
      });
    },
    getProject() {
      this.fetchProject({
        projectId: this.$route.params.projectId,
        relations: 'languages,languages.forms',
      });
    },
  },
};
</script>
