<template>
  <div>
    <v-card>
      <v-card-title>
        My Teams
      </v-card-title>
      <v-card-text>
        <v-card
          flat
        >
          <v-list>
            <v-list-item-group>
              <template
                v-for="(team, index) in teams"
              >
                <v-list-item
                  :key="index"
                  :to="{ name: 'teams.show', params: { teamId: team.id } }"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="team.name"
                    />
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="index < teams.length - 1"
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
      'teams',
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
