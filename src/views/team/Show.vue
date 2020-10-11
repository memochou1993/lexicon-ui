<template>
  <div>
    <v-card
      v-if="team.data"
    >
      <v-card-title>
        {{ team.data.name }}
      </v-card-title>
      <v-card-text>
        <v-card
          flat
        >
          <v-list
            v-if="projects.data"
          >
            <v-list-item-group>
              <template v-for="(project, index) in projects.data">
                <v-list-item
                  :key="index"
                  :to="{ name: 'projects.show', params: { projectId: project.id } }"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="project.name"
                    />
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="index < projects.length - 1"
                  :key="`divider-${index}`"
                />
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
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
    ...mapState('team', [
      'team',
    ]),
    ...mapState('project', [
      'projects',
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
