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
            flat
          >
            <v-list-item-group
              color="primary"
            >
              <template v-for="(item, index) in projects">
                <v-list-item
                  :key="index"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="item.name"
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
    this.fetchTeam({
      teamId: this.$route.params.teamId,
    });
    this.fetchProjects({
      teamId: this.$route.params.teamId,
    });
  },
  methods: {
    ...mapActions('project', [
      'fetchProjects',
    ]),
    ...mapActions('team', [
      'fetchTeam',
    ]),
  },
};
</script>
