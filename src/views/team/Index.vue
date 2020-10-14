<template>
  <div>
    <v-card
      v-if="teams.data"
    >
      <v-card-title
        class="pa-5"
      >
        My Teams
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <template
              v-for="(team, teamIndex) in teams.data"
            >
              <v-list-item
                :key="team.id"
                :to="{ name: 'teams.show', params: { teamId: team.id } }"
                three-line
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="team.name"
                  />
                </v-list-item-content>
              </v-list-item>
              <v-divider
                v-if="teamIndex < teams.data.length - 1"
                :key="`divider-${team.id}`"
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
        <AppProgress />
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
      'teams',
    ]),
    ...mapGetters('team', [
      'pages',
    ]),
  },
  watch: {
    page() {
      this.getUserTeams();
    },
  },
  created() {
    this.getUserTeams();
  },
  methods: {
    ...mapActions('team', [
      'fetchUserTeams',
    ]),
    getUserTeams() {
      this.fetchUserTeams({
        page: this.page,
      });
    },
  },
};
</script>
