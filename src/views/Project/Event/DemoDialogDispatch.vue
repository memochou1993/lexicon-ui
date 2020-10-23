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
            <v-card-title>
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
          >
            <v-card-title>
              Webhooks
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
                </v-list-item>
                <v-divider
                  v-if="hookIndex < projectData.data.hooks.length - 1"
                  :key="`divider-${hook.id}`"
                />
              </template>
            </v-list>
          </v-card>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="!dialog"
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
  computed: {
    ...mapState('project', [
      'projectData',
    ]),
  },
  methods: {
    ...mapMutations([
      'setMessage',
    ]),
    ...mapActions('server', [
      'dispatch',
    ]),
    dispatchEvents() {
      this.setMessage('Contacting server...');
      this.dispatch()
        .then(() => {
          this.setMessage('Events Dispatched!');
        })
        .catch(() => {
          this.setMessage('Oops! Something went wrong!');
        });
    },
  },
};
</script>
