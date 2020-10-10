<template>
  <div>
    <v-card
      v-if="team"
    >
      <v-card-title>
        {{ team.name }}
      </v-card-title>
      <v-card-text>
        <v-card
          flat
        >
          <v-list
            v-if="projects.length > 0"
          >
            <v-list-item-group>
              <template v-for="(project, index) in projects">
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
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';

export default {
  computed: {
    ...mapState('team', [
      'team',
    ]),
    ...mapState('project', [
      'projects',
    ]),
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
