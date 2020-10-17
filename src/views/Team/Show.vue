<template>
  <div>
    <v-card
      v-if="teamData.data && projectList.data"
    >
      <v-card-title
        class="pa-5"
      >
        {{ teamData.data.name }}
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <template
              v-for="(project, projectIndex) in projectList.data"
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
                v-if="projectIndex < projectList.data.length - 1"
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
import { mapState, mapGetters, mapActions } from 'vuex';
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
    ...mapState('team', [
      'teamData',
    ]),
    ...mapState('project', [
      'projectList',
    ]),
    ...mapGetters('project', [
      'pages',
    ]),
  },
  watch: {
    page() {
      this.getProjects();
    },
  },
  created() {
    this.getTeam();
    this.getProjects();
  },
  methods: {
    ...mapActions('project', [
      'fetchProjects',
    ]),
    ...mapActions('team', [
      'fetchTeam',
    ]),
    getProjects() {
      this.fetchProjects({
        teamId: this.$route.params.teamId,
        page: this.page,
      });
    },
    getTeam() {
      this.fetchTeam({
        teamId: this.$route.params.teamId,
      });
    },
  },
};
</script>
