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
            <v-list-item-group>
              <template v-for="(item, index) in keys">
                <v-list-item
                  :key="index"
                  :to="{ name: 'projects.show', params: { projectId: item.id } }"
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
    ...mapState('key', [
      'keys',
    ]),
    ...mapState('project', [
      'project',
    ]),
  },
  created() {
    this.fetchProject({
      projectId: this.$route.params.projectId,
    });
    this.fetchKeys({
      projectId: this.$route.params.projectId,
    });
  },
  methods: {
    ...mapActions('key', [
      'fetchKeys',
    ]),
    ...mapActions('project', [
      'fetchProject',
    ]),
  },
};
</script>
