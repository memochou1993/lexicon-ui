<template>
  <div>
    <v-card
      v-if="userProjectList.data"
    >
      <v-card-title
        class="pa-5"
      >
        My Projects
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <template
              v-for="(project, projectIndex) in userProjectList.data"
            >
              <v-list-item
                :key="project.id"
                :to="{ name: 'projects.show', params: { projectId: project.id } }"
                three-line
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="project.name"
                  />
                </v-list-item-content>
              </v-list-item>
              <v-divider
                v-if="projectIndex < userProjectList.data.length - 1"
                :key="`divider-${project.id}`"
              />
            </template>
          </v-list-item-group>
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

export default {
  components: {
    AppProgress,
  },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapState('project', [
      'userProjectList',
    ]),
    pages() {
      return this.userProjectList.meta?.last_page || 0;
    },
  },
  watch: {
    page() {
      this.getUserProjects();
    },
  },
  created() {
    this.getUserProjects();
  },
  methods: {
    ...mapActions('project', [
      'fetchUserProjects',
    ]),
    getUserProjects() {
      this.fetchUserProjects({
        page: this.page,
      });
    },
  },
};
</script>
