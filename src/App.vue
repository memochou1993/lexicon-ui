<template>
  <v-app>
    <TheHeader />
    <v-main>
      <v-container>
        <router-view
          class="my-5"
        />
      </v-container>
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
import TheFooter from '@/components/TheFooter.vue';
import TheHeader from '@/components/TheHeader.vue';

export default {
  name: 'App',
  components: {
    TheFooter,
    TheHeader,
  },
};
</script>
