<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
      <v-toolbar-title>
        Lexicon
      </v-toolbar-title>
      <v-spacer />
      <v-menu>
        <template
          v-slot:activator="{ on, attrs }"
        >
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(link) in links"
            :key="link.title"
            @click="go(link.name)"
          >
            <v-list-item-title>
              {{ link.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: 'My Teams',
          name: 'teams.index',
        },
        {
          title: 'My Projects',
          name: 'projects.index',
        },
      ],
    };
  },
  methods: {
    go(name) {
      if (name !== this.$route.name) {
        this.$router.push({
          name,
        });
      }
    },
  },
};
</script>
