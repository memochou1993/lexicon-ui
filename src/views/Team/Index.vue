<template>
  <div>
    <v-card
      v-if="teamList.data"
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
              v-for="(team, teamIndex) in teamList.data"
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
                v-if="teamIndex < teamList.data.length - 1"
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
    ...mapState('team', [
      'teamList',
    ]),
    pages() {
      return this.teamList.meta?.last_page || 0;
    },
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
