<template>
  <div>
    <v-form
      ref="form"
      @submit.prevent="dispatchEvents()"
    >
      <v-card>
        <v-card-title
          class="pa-3"
        >
          <v-spacer />
          <v-icon
            small
            @click="$emit('setDialog', false)"
          >
            mdi-close
          </v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text
          class="pa-5"
        >
          <v-card
            outlined
            class="mb-5"
          >
            <v-card-title
              class="pa-3"
            >
              API Key
            </v-card-title>
            <v-divider />
            <v-list
              class="py-0"
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="projectData.data.setting.settings.api_key"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card
            outlined
            class="mb-5"
          >
            <v-card-title
              class="pa-3"
            >
              Webhook
            </v-card-title>
            <v-divider />
            <v-list
              class="py-0"
            >
              <template
                v-for="(hook, hookIndex) in projectData.data.hooks"
              >
                <v-list-item
                  :key="hook.id"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="hook.url"
                    />
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon
                      color="secondary"
                      @click="open(hook.url)"
                    >
                      mdi-home
                    </v-icon>
                  </v-list-item-action>
                </v-list-item>
                <v-divider
                  v-if="hookIndex < projectData.data.hooks.length - 1"
                  :key="`divider-${hook.id}`"
                />
              </template>
            </v-list>
          </v-card>
          <v-card
            outlined
          >
            <v-card-title
              class="pa-3"
            >
              Events
            </v-card-title>
            <v-divider />
            <v-list
              class="py-0"
            >
              <v-list-item>
                <v-list-item-content
                  class="py-0"
                >
                  <v-checkbox
                    v-model="events"
                    :ripple="false"
                    dense
                    label="Sync"
                    value="sync"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-card-text>
        <v-divider />
        <v-card-actions
          class="pa-3"
        >
          <v-spacer />
          <v-btn
            :disabled="!dialog || !events.length || loading"
            color="primary"
            elevation="0"
            small
            type="submit"
          >
            Dispatch
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';

export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      events: [
        'sync',
      ],
    };
  },
  computed: {
    ...mapState('project', [
      'projectData',
    ]),
  },
  methods: {
    ...mapMutations([
      'setMessage',
    ]),
    ...mapActions([
      'dispatch',
    ]),
    setLoading(loading) {
      this.loading = loading;
    },
    open(url) {
      const { origin } = new URL(url);
      window.open(origin, '_blank', 'noopener noreferrer');
    },
    dispatchEvents() {
      this.setLoading(true);
      this.setMessage('Contacting the server...');
      this.dispatch({
        apiKey: this.projectData.data.setting.settings.api_key,
        events: this.events,
      })
        .then(() => {
          this.setMessage('Events dispatched!');
        })
        .catch(() => {
          this.setMessage('Oops! Something went wrong!');
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
  },
};
</script>
