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
                v-for="(item, index) in teams"
              >
                <v-list-item
                  :key="index"
                  :to="{ name: 'teams.show', params: { teamId: item.id } }"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="item.name"
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
      'teams',
    ]),
  },
  created() {
    this.getUserTeams();
  },
  methods: {
    ...mapActions('team', [
      'fetchUserTeams',
    ]),
    getUserTeams() {
      this.fetchUserTeams();
    },
  },
};
</script>
