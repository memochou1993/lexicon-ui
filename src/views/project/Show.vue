<template>
  <div>
    <v-card
      v-if="project"
    >
      <v-card-title>
        {{ project.name }}
      </v-card-title>
      <v-card-text>
        <v-card
          flat
        >
          <v-list
            v-if="keys.length > 0"
          >
            <template v-for="(item, index) in keys">
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
                v-if="index < keys.length - 1"
                :key="`divider-${index}`"
              />
            </template>
          </v-list>
        </v-card>
        <div
          v-if="pages > 1"
          class="text-center"
        >
          <v-pagination
            v-model="page"
            :length="pages"
            :total-visible="7"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
          />
        </div>
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
    ...mapState('key', [
      'keys',
      'pages',
    ]),
    ...mapState('project', [
      'project',
    ]),
  },
  watch: {
    page() {
      this.getKeys();
    },
  },
  created() {
    this.getProject();
    this.getKeys();
  },
  methods: {
    ...mapActions('key', [
      'fetchKeys',
    ]),
    ...mapActions('project', [
      'fetchProject',
    ]),
    getKeys() {
      this.fetchKeys({
        projectId: this.$route.params.projectId,
        page: this.page,
      });
    },
    getProject() {
      this.fetchProject({
        projectId: this.$route.params.projectId,
      });
    },
  },
};
</script>
