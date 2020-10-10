<template>
  <div>
    <v-card>
      <v-list
        flat
      >
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            v-for="(team, i) in teams"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title
                v-text="team.name"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
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
    ...mapState('UserTeam', [
      'teams',
    ]),
  },
  created() {
    this.fetchTeams();
  },
  methods: {
    ...mapActions('UserTeam', [
      'fetchTeams',
    ]),
  },
};
</script>
